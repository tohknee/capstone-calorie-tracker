from .db import db, environment, SCHEMA, add_prefix_for_prod

class Calorie_Goal(db.Model):
    __tablename__="calorie_goal"

    if environment=="production":
        __table_args__={'schema':SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    profile_id=db.Column(db.Integer(), db.ForeignKey(add_prefix_for_prod("profile.id")))
    calorie_goal=db.Column(db.String(50),nullable=False)
    date=db.Column(db.String(50),nullable=False)
   

    profile =db.relationship("Profile",back_populates="calorie_goal")

    def to_dict(self):
        return{
            "id":self.id,
            "dog_id":self.profile_id,
            "calorie_goal":self.calorie_goal,
            "date":self.date,
            
        }