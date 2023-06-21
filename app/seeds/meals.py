from ..models.meal_log import db, Meal_Log, environment, SCHEMA
from sqlalchemy.sql import text

def seed_meals():
    meal1=Meal_Log(
        profile_id=1,
        portion_size="1.5",
        meal_calories="1000",
        category="breakfast"
    )
    meal2=Meal_Log(
        profile_id=1,
        portion_size="10",
        meal_calories="4000",
        category="lunch"
    )
    meal3=Meal_Log(
        profile_id=2,
        portion_size="4.5",
        meal_calories="1800",
        category="dinner"
    )
    meal4=Meal_Log(
        profile_id=2,
        portion_size="1",
        meal_calories="400",
        category="dinner"
    )
    meal_list=[meal1,meal2,meal3,meal4]

    for meal in meal_list:
        db.session.add(meal)
    db.session.commit()

def undo_meals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.meal_log RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meal_log"))

    db.session.commit()