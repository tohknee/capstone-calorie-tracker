from flask import Blueprint, jsonify, request
from app.models.meal_log import Meal_Log
from app.models.pet_profile import Profile
from flask_login import login_required, current_user
from app.models.db import db
from app.forms.meal_form import MealForm

meal_routes=Blueprint("meal", __name__)

# def validation_errors_message(validation_errors):
#     """
#     returns wtf validation errors
#     """
#     errorMessages=[]
#     for field in validation_errors:
#         for error in validation_errors(field):
#             errorMessages.append(f'{field}: {error}')

#     return errorMessages

@meal_routes.route('/all')
@login_required
def get_current_meals_details():
    """
    Gets meal logs of current user
    """
    dogs_owned_by_current_user=Profile.query.filter(Profile.user_id==current_user.id).all()

    meal_logs_for_each_dog = []
    for dog in dogs_owned_by_current_user:
        meal_log=Meal_Log.query.filter(Meal_Log.profile_id==dog.id)
        # meal_log=Meal_Log.query.all()
        meal_logs_for_each_dog.extend(meal_log)

    meal_logs_list = [meal.to_dict() for meal in meal_logs_for_each_dog]
    return jsonify(meal_logs_list)

@meal_routes.route('/details/<int:id>')
@login_required
def get_one_meal_details(id):
    """
    Gets one meal log of current user
    """
    meal_log = Meal_Log.query.get(id)
    if not meal_log:
        return jsonify({'error': 'Meal log not found'}), 404
    return meal_log.to_dict()

@meal_routes.route('/dogs/<int:id>/new',methods=["POST"])
@login_required
def post_one_meal(id):
  
    """
    Post one meal log for current pet
    """
    form=MealForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    

    new_meal_log=Meal_Log(
        profile_id=id,
        # user_id=current_user.id,
        portion_size=form.portion_size.data,
        meal_calories=form.meal_calories.data,
        category=form.category.data
    )
    db.session.add(new_meal_log)
    db.session.commit()
    return new_meal_log.to_dict()

 
@meal_routes.route('/edit/<int:id>',methods=["PUT"])
@login_required
def edit_meal_log(id):
    """
    Update a meal log for the current user 
    """ 
    meal_log=Meal_Log.query.get(id)
    dogs_owned_by_current_user=Profile.query.filter(Profile.user_id==current_user.id).all()

    if not meal_log:
        return jsonify({'error': 'Meal log not found'}), 404
    
    form=MealForm()
    form['csrf_token'].data = request.cookies['csrf_token']

# fix thism. find meal.log profile id to match dog profile, then search dog profile for user id
    matching_dog=None
    for dog in dogs_owned_by_current_user:
        if dog.id==meal_log.profile_id:
            matching_dog=dog
            break
    if matching_dog:

        meal_log.portion_size=form.portion_size.data
        meal_log.meal_calories=form.meal_calories.data
        meal_log.category=form.category.data

        db.session.commit()
        return jsonify(meal_log.to_dict())
    return jsonify({'error': 'You do not own this meal log'}), 401


@meal_routes.route('/delete/<int:id>',methods=["DELETE"])
@login_required
def delete_log(id):
    """
    Delete a meal log for the current user 
    """ 
    meal_log=Meal_Log.query.get(id)
    dogs_owned_by_current_user=Profile.query.filter(Profile.user_id==current_user.id).all()

    if not meal_log:
        return jsonify({'error': 'Meal log not found'}), 404
    
    matching_dog=None
    for dog in dogs_owned_by_current_user:
        if dog.id==meal_log.profile_id:
            matching_dog=dog
            break
    if matching_dog:
        db.session.delete(meal_log)
        db.session.commit()
        return jsonify({'message': 'Meal log deleted successfully!'}), 200
    return jsonify({'error': 'You do not own this meal log'}), 401
