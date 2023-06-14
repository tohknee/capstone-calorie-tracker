from flask import Blueprint, jsonify, request
from app.models.pet_profile import Profile
from flask_login import login_required, current_user
from app.models.db import db


profile_routes=Blueprint("profile", __name__)

def validation_errors_message(validation_errors):
    """
    returns wtf validation errors
    """
    errorMessages=[]
    for field in validation_errors:
        for error in validation_errors(field):
            errorMessages.append(f'{field}: {error}')

    return errorMessages

@profile_routes.route("/")
@login_required
def get_current_profiles():
    all_profiles=Profile.query.filter(Profile.user_id==current_user.id).all()
    profile_array=[profile.to_dict() for profile in all_profiles] 
    print("current profiles-----------",profile_array)
    return jsonify(profile_array)