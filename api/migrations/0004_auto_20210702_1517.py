# Generated by Django 3.1.4 on 2021-07-02 09:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210702_1344'),
    ]

    operations = [
        migrations.AlterField(
            model_name='activity',
            name='founder',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user',
            name='category',
            field=models.CharField(choices=[('S', 'Senior'), ('A', 'Adult'), ('J', 'Junior')], default='Junior', max_length=20),
        ),
    ]
