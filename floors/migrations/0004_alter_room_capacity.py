# Generated by Django 4.1.6 on 2023-03-23 15:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('floors', '0003_room_room_type_alter_event_type_of_event'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='capacity',
            field=models.PositiveIntegerField(),
        ),
    ]
