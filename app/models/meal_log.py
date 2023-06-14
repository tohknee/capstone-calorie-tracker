from .db import db, environment, SCHEMA, add_prefix_for_prod

class Meal_Log(db.Model):
    __tablename__="meal_log"

    if environment=="production":
        __table_args__={'schema':SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    profile_id=db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("profile.id")))
    portion_size=db.Column(db.String(50),nullable=False)
    meal_calories=db.Column(db.String(50),nullable=False)
    category=db.Column(db.String(50),nullable=False)

    profile =db.relationship("Profile",back_populates="meal_log")

    def to_dict(self):
        return{
            "id":self.id,
            "dog_id":self.profile_id,
            "portion_size":self.portion_size,
            "meal_calories":self.meal_calories,
            "category":self.category
        }