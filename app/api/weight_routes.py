from flask import Blueprint, jsonify, request
from app.models.weight_goal import Weight_Goal
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
    Gets weight goal and weight logs of current user
    """
    weight_details = Weight_Goal.query.filter(Weight_Goal.profile_id==current_user.id).all()
    weight_details_dict = [weight.to_dict() for weight in weight_details]
    print("cuuureent user info", current_user)
    return jsonify(weight_details_dict)