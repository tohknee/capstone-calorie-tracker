from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,SelectField, TextAreaField, IntegerField,BooleanField,RadioField
from wtforms.validators import DataRequired, Email, ValidationError,Length

class PetForm(FlaskForm):
    weight_goal=StringField("Your dog's goal weight.",validators=[DataRequired()])
    date=StringField("Today's date", validators=[DataRequired()])
    current_weight=StringField("Your dog's current weight.", validators=[DataRequired()])
  