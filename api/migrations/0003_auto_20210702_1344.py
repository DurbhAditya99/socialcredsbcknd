# Generated by Django 3.1.4 on 2021-07-02 08:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210702_1329'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='founder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='activity',
            name='service_type',
            field=models.CharField(choices=[('R', 'Request'), ('O', 'Offer ')], default='Offer', max_length=20),
        ),
    ]
