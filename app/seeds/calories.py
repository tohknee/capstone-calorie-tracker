from ..models.calorie_goal import db, Calorie_Goal, environment, SCHEMA
from sqlalchemy.sql import text

def seed_calories():
    goal1=Calorie_Goal(
        profile_id=1,
        calorie_goal="500",
        date="12/21/23"
    )
    goal2=Calorie_Goal(
        profile_id=2,
        calorie_goal="400",
        date="3/21/24"
    )

    goal_list=[goal1,goal2]

    for goal in goal_list:
        db.session.add(goal)
    db.session.commit()

def undo_calories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM calorie goals"))

    db.session.commit()
