# Generated by Django 3.1.4 on 2021-07-03 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20210703_1426'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activity',
            name='end_date',
        ),
        migrations.AlterField(
            model_name='activity',
            name='category',
            field=models.CharField(choices=[('S', 'Regular Creds'), ('E', 'Earth Creds')], default='Earth Creds', max_length=30),
        ),
        migrations.AlterField(
            model_name='user',
            name='category',
            field=models.CharField(choices=[('A', 'Adult'), ('J', 'Junior'), ('S', 'Senior')], default='Junior', max_length=20),
        ),
    ]
