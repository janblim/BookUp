from flask_wtf import FlaskForm
from wtforms import TextAreaField, validators
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
    text = TextAreaField('Text', validators=[validators.InputRequired(), validators.Length(min=2, max=500)])
