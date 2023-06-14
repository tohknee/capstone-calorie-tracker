from ..models.meal_log import db, Meal_Log, environment, SCHEMA
from sqlalchemy.sql import text

def seed_meals():
    meal1=Meal_Log(
        profile_id=1,
        portion_size="1 cup",
        meal_calories="400",
        category="breakfast"
    )
    meal2=Meal_Log(
        profile_id=1,
        portion_size="1 cup",
        meal_calories="400",
        category="breakfast"
    )
    meal3=Meal_Log(
        profile_id=2,
        portion_size="1 cup",
        meal_calories="400",
        category="breakfast"
    )
    meal4=Meal_Log(
        profile_id=2,
        portion_size="1 cup",
        meal_calories="400",
        category="breakfast"
    )
    meal_list=[meal1,meal2,meal3,meal4]

    for meal in meal_list:
        db.session.add(meal)
    db.session.commit()

def undo_meals():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM meal"))

    db.session.commit()