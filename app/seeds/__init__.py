from flask.cli import AppGroup
from .users import seed_users, undo_users
from .calories import seed_calories,undo_calories
from .meals import seed_meals,undo_meals
from .pet_profiles import seed_profiles, undo_profiles
from .weights import seed_weights,undo_weights

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_weights()
        undo_calories()
        undo_meals()
        undo_profiles()
        undo_users()
    seed_users()
    seed_profiles()
    seed_meals()
    seed_calories()
    seed_weights()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_weights
    undo_calories()
    undo_meals()
    undo_profiles()
    undo_users()
    # Add other undo functions here