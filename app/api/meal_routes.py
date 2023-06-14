from flask import Blueprint, jsonify, request
from app.models.meal_log import Meal_Log
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
    meal_logs = Meal_Log.query.filter(Meal_Log.profile_id==current_user.id).all()
    meal_logs_dict = [meal.to_dict() for meal in meal_logs]
    print("cuuureent user info", current_user)
    return jsonify(meal_logs_dict)

@meal_routes.route('/details/<int:id>')
@login_required
def get_one_meal_details(id):
    """
    Gets one meal log of current user
    """
    meal_log = Meal_Log.query.get(id)
    return meal_log.to_dict()

@meal_routes.route('/new',methods=["POST"])
@login_required
def post_one_meal():
    """
    Post one meal log for current user
    """
    form=MealForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    # if form.validate_on_submit():
    profile_id=current_user.id
    # print("printing current user info",current_user.id)
    new_meal_log=Meal_Log(
        profile_id=profile_id,
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

    if not meal_log:
        return jsonify({'error': 'Meal log not found'}), 404
    
    form=MealForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    meal_log.portion_size=form.portion_size.data
    meal_log.meal_calories=form.meal_calories.data
    meal_log.category=form.category.data

    db.session.commit()
    return jsonify(meal_log.to_dict())

@meal_routes.route('/delete/<int:id>',methods=["DELETE"])
@login_required
def delete_log(id):

    meal_log=Meal_Log.query.get(id)
    
    if not meal_log:
        return jsonify({'error': 'Meal log not found'}), 404
    if meal_log.profile_id ==current_user.id:
        db.session.delete(meal_log)
        db.session.commit()
        return jsonify({'message': 'Meal log deleted'}), 200
    return jsonify({'error': 'You do not own this meal log'}), 401
