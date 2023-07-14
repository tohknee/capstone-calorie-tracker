from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField, RadioField,RadioField,SubmitField
from wtforms.validators import DataRequired
from app.api.AWS_helper import ALLOWED_EXTENSIONS

class PetForm(FlaskForm):

    dog_name=StringField("Your dog's name",validators=[DataRequired()])
    breed=StringField("Your dog breed", validators=[DataRequired()])
    weight=StringField("Your dog's", validators=[DataRequired()])
    age=StringField("Your dog's age(Years)", validators=[DataRequired()])
    # gender= RadioField("Dog's preferred gender", choices=[("male", "Male"), ("female", "Female"),("none","Prefer not to answer.")])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")