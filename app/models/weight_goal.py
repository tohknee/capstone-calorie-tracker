from .db import db, environment, SCHEMA, add_prefix_for_prod

class Weight_Goal(db.Model):
    __tablename__="weight_goal"

    if environment=="production":
        __table_args__={'schema':SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    profile_id=db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("profile.id")))
    weight_goal=db.Column(db.String(50),nullable=False)
    date=db.Column(db.String(50),nullable=False)
    current_weight=db.Column(db.String(50),nullable=False)

    profile =db.relationship("Profile",back_populates="weight_goal")

    def to_dict(self):
        return{
            "id":self.id,
            "dog_id":self.profile_id,
            "weight_goal":self.weight_goal,
            "date":self.date,
            "current_weight":self.current_weight
        }