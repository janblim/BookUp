from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, validators
from wtforms.validators import DataRequired


class CreateBookForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    author = StringField('Author', validators=[DataRequired()])
    description = TextAreaField('Description', validators=[validators.InputRequired(), validators.Length(min=4, max=500)])
    amazon = StringField('Amazon', validators=[DataRequired()])
    genre_id = SelectField('Genre', choices=[
        ('1', 'Fiction'),
        ('2', 'Science Fiction'),
        ('3', 'History'),
        ('4', 'Philosophy'),
        ('5', 'Self Help'),
        ('6', 'Psychology'),
        ('7', 'Feminism'),
        ('8', 'Science')
    ], validators=[DataRequired()])
    cover = StringField('Cover Image URL', validators=[DataRequired(), validators.URL()])
