# Generated by Django 5.0.2 on 2024-02-29 11:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_user_username'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='bio',
        ),
        migrations.RemoveField(
            model_name='user',
            name='dob',
        ),
        migrations.RemoveField(
            model_name='user',
            name='facebook',
        ),
        migrations.RemoveField(
            model_name='user',
            name='instagram',
        ),
        migrations.RemoveField(
            model_name='user',
            name='karma',
        ),
        migrations.RemoveField(
            model_name='user',
            name='name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='twitter',
        ),
        migrations.RemoveField(
            model_name='user',
            name='website',
        ),
    ]
