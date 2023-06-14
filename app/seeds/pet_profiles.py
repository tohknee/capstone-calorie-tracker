from ..models.pet_profile import db, Profile, environment, SCHEMA
from sqlalchemy.sql import text


def seed_profiles():
    demo=Profile(
        user_id=1,
        dog_name="demo name",
        breed="breed",
        weight="weight",
        age="age",
        gender="gender",
    )
    profile1=Profile(
        user_id=2,
        dog_name="Leo",
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.pet_profiles RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM profiles"))

    db.session.commit()
