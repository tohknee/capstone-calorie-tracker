from flask import Blueprint, jsonify, request
from app.models.pet_profile import Profile
from flask_login import login_required, current_user
from app.models.db import db
from app.forms.pet_form import PetForm

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
    """
    Gets all pet profiles of current user
    """
    all_profiles=Profile.query.filter(Profile.user_id==current_user.id).all()
    profile_array=[profile.to_dict() for profile in all_profiles] 
    # print("current profiles-----------",profile_array)
    return jsonify(profile_array)

@profile_routes.route("/<int:id>")
@login_required
def get_one_profile(id):
    """
    Gets one pet profile of current user
    """
    single_profile=Profile.query.get(id)
    if not single_profile:
        return jsonify({'error': 'Pet profile not found'}), 404
    return single_profile.to_dict()

@profile_routes.route("/new",methods=["POST"])
@login_required
def post_new_pet():
    """
    Post new pet profile for current user
    """
    form=PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    new_pet=Profile(
        user_id=current_user.id,
        dog_name=form.dog_name.data,
        breed=form.breed.data,
        weight=form.weight.data,
        age=form.age.data,
        gender=form.gender.data

    )
    db.session.add(new_pet)
    db.session.commit()
    return new_pet.to_dict()