from flask import Blueprint, jsonify, request
from app.models.calorie_goal import Calorie_Goal
from app.models.pet_profile import Profile
from flask_login import login_required, current_user
from app.models.db import db
from app.forms.calorie_form import CalorieForm

calorie_routes=Blueprint("calorie", __name__)

# def validation_errors_message(validation_errors):
#     """
#     returns wtf validation errors
#     """
#     errorMessages=[]
#     for field in validation_errors:
#         for error in validation_errors(field):
#             errorMessages.append(f'{field}: {error}')

#     return errorMessages

@calorie_routes.route('/all')
@login_required
def get_current_calorie_details():
    """
    Gets calorie goal and calorie logs of current user's pets
    """
    dogs_owned_by_current_user=Profile.query.filter(Profile.user_id==current_user.id).all()
    calorie_details_for_each_dog=[]
    for profile in dogs_owned_by_current_user:
        caloric_goal=Calorie_Goal.query.filter(Calorie_Goal.profile_id==profile.id).all()
        calorie_details_for_each_dog.extend(caloric_goal)
    calorie_details_dict = [calorie.to_dict() for calorie in calorie_details_for_each_dog]
    return jsonify(calorie_details_dict)




@calorie_routes.route('/details/<int:id>')
@login_required
def get_one_calorie_goal(id):
    """
    Gets a single calorie goal by id
    you can view other goals as well
    """
    calorie_goal=Calorie_Goal.query.get(id)
    if not calorie_goal:
        return jsonify({'error': 'Caloric goal not found'}), 404
    return calorie_goal.to_dict()

@calorie_routes.route('/pets/<int:id>/calorie/new',methods=["POST"])
@login_required
def post_one_calorie_goal():
    """
    Post one caloric goal for current user
    """
    form=CalorieForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    profile_id=current_user.id
    print("calories route print pet id", profile_id)
    new_calorie_goal=Calorie_Goal(
        profile_id=profile_id,
        calorie_goal=form.calorie_goal.data,
        date=form.date.data
    )
    db.session.add(new_calorie_goal)
    db.session.commit()
    return new_calorie_goal.to_dict()

@calorie_routes.route('/delete/<int:id>', methods=["DELETE"])
@login_required
def delete_calorie_goal(id):
    """
    Delete a calorie for the current pet
    """ 
    calorie_goal=Calorie_Goal.query.get(id)
    pet_profiles=Profile.query.filter(Profile.user_id==current_user.id).all()

    # print("thiiisis its calorie goal ----------------",all_profiles)
    if not calorie_goal:
        return jsonify({'error': 'Calorie goal not found'}), 404
    
    # if calorie_goal.profile_id==current_user.id :
    if any(profile.id == calorie_goal.profile.id for profile in pet_profiles):
        db.session.delete(calorie_goal)
        db.session.commit()
        return jsonify({'message': 'Calorie goal deleted successfully!'}), 200
    return jsonify({'error': 'You do not own this meal log'}), 401
