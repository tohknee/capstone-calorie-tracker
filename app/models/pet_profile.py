from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Profile(db.Model):
    __tablename__="profile"

    if environment=="production":
        __table_args__={'schema':SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("users.id")))
    dog_name=db.Column(db.String(50),nullable=False)
    breed=db.Column(db.String())
    weight=db.Column(db.String(),nullable=False)
    age=db.Column(db.String())
    gender=db.Column(db.String())
    created_at= db.Column(db.DateTime(),default=datetime.now)

    user =db.relationship("User",back_populates="profile")
    calorie_goal=db.relationship("Calorie_Goal", back_populates="profile")
    weight_goal=db.relationship("Weight_Goal",back_populates="profile")
    meal_log = db.relationship("Meal_Log", back_populates="profile")

    def to_dict(self):
        return{
            "id":self.id,
            "user_id":self.user_id,
            "dog_name":self.dog_name,
            "breed":self.breed,
            "weight":self.weight,
            "age":self.age,
            "created_at":self.created_at
        }