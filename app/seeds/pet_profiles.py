from ..models.pet_profile import db, Profile, environment, SCHEMA
from sqlalchemy.sql import text


def seed_profiles():
    demo=Profile(
        user_id=1,
        dog_name="Leo",
        breed="Mixed",
        weight="18",
        age="age",
        gender="gender",
    )
    profile1=Profile(
        user_id=2,
        dog_name="Leo2",
        breed="Mixed",
        weight="20",
        age="3",
        gender="male",
    )

    profile_list=[demo,profile1]

    for profile in profile_list:
        db.session.add(profile)
    db.session.commit()

def undo_profiles():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.profile RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profile"))

    db.session.commit()
