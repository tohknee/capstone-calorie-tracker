from flask import Blueprint, jsonify, request
from app.models.calorie_goal import Calorie_Goal
from flask_login import login_required, current_user
from app.models.db import db


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
    Gets calorie goal and calorie logs of current user
    """
    calorie_details = Calorie_Goal.query.filter(Calorie_Goal.profile_id==current_user.id).all()
    calorie_details_dict = [calorie.to_dict() for calorie in calorie_details]
    print("cuuureent user info", current_user)
    return jsonify(calorie_details_dict)