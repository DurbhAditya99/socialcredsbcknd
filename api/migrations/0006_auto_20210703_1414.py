# Generated by Django 3.1.4 on 2021-07-03 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210703_1408'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='category',
            field=models.CharField(choices=[('E', 'Earth Creds'), ('S', 'Regular Creds')], default='Earth Creds', max_length=30),
        ),
        migrations.AlterField(
            model_name='activity',
            name='color',
            field=models.CharField(default='#ffdddd', max_length=7),
        ),
        migrations.AlterField(
            model_name='activity',
            name='service_type',
            field=models.CharField(choices=[('O', 'Offer '), ('R', 'Request')], default='Offer', max_length=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='category',
            field=models.CharField(choices=[('S', 'Senior'), ('A', 'Adult'), ('J', 'Junior')], default='Junior', max_length=20),
        ),
    ]