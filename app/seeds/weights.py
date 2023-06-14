from ..models.weight_goal  import db, Weight_Goal, environment, SCHEMA
from sqlalchemy.sql import text

def seed_weights():
    goal1=Weight_Goal(
        profile_id=1,
        weight_goal ="50",
        date="12/21/23",
        current_weight="100"
    )
    goal2=Weight_Goal(
        profile_id=2,
        weight_goal ="10",
        date="3/21/24",
        current_weight="4"
    )

    goal_list=[goal1,goal2]

    for goal in goal_list:
        db.session.add(goal)
    db.session.commit()

def undo_weights():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.weight_goal RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM weight_goal"))

    db.session.commit()
