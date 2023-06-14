from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField,SelectField
from wtforms.validators import DataRequired, Email, ValidationError, NumberRange, Length


class MealForm(FlaskForm):
    portion_size= TextAreaField("Review", validators=[DataRequired(), Length(min=2, max=500)])
    meal_calories= IntegerField("Star rating", validators=[DataRequired(), NumberRange(min=1, max=5)])
    category = SelectField("When did you feed your dog?", choices=[('breakfast', 'Breakfast'), ('lunch', 'Lunch'), ('dinner', 'Dinner')])
