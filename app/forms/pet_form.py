from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,SelectField, TextAreaField, IntegerField,BooleanField,RadioField
from wtforms.validators import DataRequired, Email, ValidationError,Length
from app.models import User

class PetForm(FlaskForm):

    dog_name=StringField("Your dog's name",validators=[DataRequired()])
    breed=StringField("Your dog breed", validators=[DataRequired()])
    weight=StringField("Your dog's", validators=[DataRequired()])
    age=StringField("Your dog's age(Years)", validators=[DataRequired()])
    gender= RadioField("Dog's preferred gender", choices=[("male", "Male"), ("female", "Female"),("none","Prefer not to answer.")], validators=[DataRequired()])
