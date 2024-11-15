from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, validators
from wtforms.validators import DataRequired

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    text = TextAreaField('Text', validators=[validators.InputRequired(), validators.Length(min=2, max=500)])
