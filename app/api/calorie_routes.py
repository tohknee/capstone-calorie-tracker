from flask import Blueprint, jsonify, request
from app.models.calorie_goal import Calorie_Goal
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
    Gets calorie goal and calorie logs of current user
    """
    calorie_details = Calorie_Goal.query.filter(Calorie_Goal.profile_id==current_user.id).all()
    calorie_details_dict = [calorie.to_dict() for calorie in calorie_details]
    print("cuuureent user info", current_user)
    return jsonify(calorie_details_dict)

@calorie_routes.route('/details/<int:id>')
@login_required
def get_one_calorie_goal(id):
    """
    Gets a single calorie goal and calorie logs of current pet 
    """
    calorie_goal=Calorie_Goal.query.get(id)
    if not calorie_goal:
        return jsonify({'error': 'Caloric goal not found'}), 404
    return calorie_goal.to_dict()

@calorie_routes.route('/new',methods=["POST"])
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

