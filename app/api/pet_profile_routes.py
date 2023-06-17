from flask import Blueprint, jsonify, request
from app.models.pet_profile import Profile
from app.models.calorie_goal import Calorie_Goal
from app.models.weight_goal import Weight_Goal
from app.models.meal_log import Meal_Log
from flask_login import login_required, current_user
from app.models.db import db
from app.forms.pet_form import PetForm
from app.forms.calorie_form import CalorieForm
from app.forms.weight_form import WeightForm
from app.forms.meal_form import MealForm

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

@profile_routes.route("/edit/<int:id>",methods=["PUT"])
@login_required
def edit_pet(id):
    """
    Update a pet profile for the current user 
    """ 
    pet_profile=Profile.query.get(id)

    if not pet_profile:
        return jsonify({'error': 'Meal log not found'}), 404
    
    form=PetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if pet_profile.user_id==current_user.id:
        pet_profile.dog_name=form.dog_name.data
        pet_profile.breed=form.breed.data
        pet_profile.weight=form.weight.data
        pet_profile.age=form.age.data
        pet_profile.gender=form.gender.data

        db.session.commit()
        return jsonify(pet_profile.to_dict())
    return jsonify({'error': 'You do not own this pet'}), 401

@profile_routes.route("/delete/<int:id>",methods=["DELETE"])
@login_required
def delete_pet(id):
    """
    Delete a pet profile for the current user 
    """ 
    pet_profile=Profile.query.get(id)

    if not pet_profile:
        return jsonify({'error': 'Pet profile not found'}), 404
    if pet_profile.user_id==current_user.id:
        db.session.delete(pet_profile)
        db.session.commit()
        return jsonify({'message': 'Pet profile log deleted successfully!'}), 200
    return jsonify({'error': 'You do not own this pet profile.'}), 401
#PET MEAL ROUTES TO MAKE A NEW MEAL LOG
@profile_routes.route('/<int:id>/meals/new', methods=["POST"])
@login_required
def post_one_meal(id):
    """
    Post one meal log for one pet by id
    make s
    """
    pet_profile=Profile.query.get(id)
    pet_profiles=Profile.query.filter(Profile.user_id==current_user.id).all()

    form = MealForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print("printing the profffille object=====-=-=------------",pet_profile.to_dict())
    if not pet_profile:
        return jsonify({'error': 'Pet profile not found'}), 404
    if any(current_user.id == pet_profile.user_id for profile in pet_profiles):
        new_pet_meal=Meal_Log(
            profile_id=pet_profile.id,
            portion_size=form.portion_size.data,
            meal_calories=form.meal_calories.data,
            category=form.category.data
        )
        db.session.add(new_pet_meal)
        db.session.commit()
        return new_pet_meal.to_dict()
    return jsonify({'error': 'Pet you are trying to make a meal log for does not belong to you.'}), 401

  

# CALORIE GOAL ROUTES IF I WANT TO CONNECT CALORIE INFORMATION TO PET PROFILE. get current and get one and delete are in the calorie routes

@profile_routes.route('/<int:id>/calories/new',methods=["POST"])
@login_required
def post_one_calorie_goal(id):
    """
    Post one caloric goal for current user
    """

    form=CalorieForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    profile_id=Profile.query.get(id)
    print("calories route print pet id======================================", profile_id.id)
    new_calorie_goal=Calorie_Goal(
        profile_id=profile_id.id,
        calorie_goal=form.calorie_goal.data,
        date=form.date.data
    )
    db.session.add(new_calorie_goal)
    db.session.commit()
    return new_calorie_goal.to_dict()


# WEIGHT GOAL ROUTES IF I WANT TO CONNECT WEIGHT INFORMATION TO PET PROFILE

@profile_routes.route('/<int:id>/weight/new', methods=["POST"])
@login_required
def post_one_weight_goal(id):
    """
    Post one caloric goal for current user
    """
    form=WeightForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    profile_id=Profile.query.get(id)
    new_weight_goal=Weight_Goal(
        profile_id=profile_id.id,
        weight_goal=form.weight_goal.data,
        current_weight=form.current_weight.data,
        date=form.date.data
    )
    db.session.add(new_weight_goal)
    db.session.commit()
    return new_weight_goal.to_dict()