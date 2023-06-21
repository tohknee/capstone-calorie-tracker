from flask import Blueprint, jsonify, request
from app.models.weight_goal import Weight_Goal
from app.models.pet_profile import Profile
from flask_login import login_required, current_user
from app.models.db import db


weight_routes=Blueprint("weight", __name__)

# def validation_errors_message(validation_errors):
#     """
#     returns wtf validation errors
#     """
#     errorMessages=[]
#     for field in validation_errors:
#         for error in validation_errors(field):
#             errorMessages.append(f'{field}: {error}')

#     return errorMessages

@weight_routes.route('/all')
@login_required
def get_current_weight_details():
    """
    Gets weight goal and weight logs of current user's pets
    """
    dogs_owned_by_current_user=Profile.query.filter(Profile.user_id==current_user.id).all()

    weight_details_for_each_dog =[]
    for profile in dogs_owned_by_current_user:
        weight_goal=Weight_Goal.query.filter(Weight_Goal.profile_id==profile.id)
        weight_details_for_each_dog.extend(weight_goal)
    weight_details_dict = [weight.to_dict() for weight in weight_details_for_each_dog]
    return jsonify(weight_details_dict)

@weight_routes.route('/details/<int:id>')
@login_required
def get_one_calorie_goal(id):
    """
    Gets a single weight goal by id
    you can view other goals as well
    """
    weight_goal=Weight_Goal.query.get(id)
    if not weight_goal:
        return jsonify({'error': 'Caloric goal not found'}), 404
    return weight_goal.to_dict()

@weight_routes.route('/delete/<int:id>',methods=["DELETE"])
@login_required
def delete_weight_goal(id):
    """
    Delete a calorie for the current pet
    """ 
    weight_goal=Weight_Goal.query.get(id)
    pet_profiles=Profile.query.filter(Profile.user_id==current_user.id).all()

    if not weight_goal:
        return jsonify({'error': 'Calorie goal not found'}), 404
    
    if any(profile.id == weight_goal.profile.id for profile in pet_profiles):
        db.session.delete(weight_goal)
        db.session.commit()
        return jsonify({'message': 'Weight goal deleted successfully!'}), 200
    return jsonify({'error': 'You do not own this meal log'}), 401

