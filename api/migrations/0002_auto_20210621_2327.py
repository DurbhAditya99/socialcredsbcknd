# Generated by Django 3.1.4 on 2021-06-21 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='category',
            field=models.CharField(choices=[('S', 'Regular Creds'), ('E', 'Earth Creds')], default='Earth Creds', max_length=30),
        ),
        migrations.AlterField(
            model_name='activity',
            name='service_type',
            field=models.CharField(choices=[('O', 'Offer '), ('R', 'Request')], default='Offer', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='category',
            field=models.CharField(choices=[('A', 'Adult'), ('S', 'Senior'), ('J', 'Junior')], default='Junior', max_length=20),
        ),
    ]
