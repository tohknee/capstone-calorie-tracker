from flask_wtf import FlaskForm
from wtforms import StringField, RadioField,SelectField, TextAreaField, IntegerField,BooleanField,RadioField
from wtforms.validators import DataRequired, Email, ValidationError,Length

class CalorieForm(FlaskForm):
    calorie_goal=StringField("Your dog's daily caloric goal.",validators=[DataRequired()])
    date=StringField("Today's date.", validators=[DataRequired()])
    # daily_calories=StringField('Daily calories', validators=[DataRequired()])
  