# Generated by Django 3.1.4 on 2021-07-02 07:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(max_length=50)),
                ('last_name', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=100)),
                ('dob', models.DateField(default='2000-10-10')),
                ('age', models.CharField(max_length=2)),
                ('category', models.CharField(choices=[('J', 'Junior'), ('A', 'Adult'), ('S', 'Senior')], default='Junior', max_length=20)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('mobile_number', models.CharField(max_length=12)),
                ('email_id', models.EmailField(max_length=100, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('about', models.CharField(default='None', max_length=1000)),
                ('account_balance', models.DecimalField(decimal_places=1, default=1, max_digits=2)),
                ('profile_pic', models.ImageField(blank=True, null=True, upload_to='images/')),
                ('above_age', models.BooleanField(default=False)),
                ('clocked_hours', models.IntegerField(default=0)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Activity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service_type', models.CharField(choices=[('O', 'Offer '), ('R', 'Request')], default='Offer', max_length=20)),
                ('title', models.CharField(max_length=50)),
                ('description', models.CharField(max_length=200)),
                ('what_donating', models.CharField(default='Nil', max_length=300)),
                ('where_donating', models.CharField(default='Nil', max_length=300)),
                ('act_status', models.BooleanField(default=True)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('vol_req', models.IntegerField(default=5)),
                ('mother_vol', models.IntegerField(default=2)),
                ('est_hours', models.IntegerField()),
                ('category', models.CharField(choices=[('E', 'Earth Creds'), ('S', 'Regular Creds')], default='Earth Creds', max_length=30)),
                ('founder', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='founder', to=settings.AUTH_USER_MODEL)),
                ('user', models.ManyToManyField(related_name='activities', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
