from django.db import models    
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin, BaseUserManager
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password 
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.conf import settings
import datetime
from datetime import date


# Category choices
AGE_GROUP ={
    ("J", "Junior") ,
    ("A", "Adult"),
    ("S","Senior"),
}

EARN_OR_BURN ={
    ("R", "Request"),
    ("O" , "Offer ")
}

CATEGORIES = {

    ('E', 'Earth Creds'),
    ('S','Regular Creds'),
    

}

ACTIVITY ={

}

YES_OR_NO ={
    ("Y",'YES'),
    ('N','NO')
}


# <-------------------------------------------------------- MODELS -------------------------------------------------------------------> 
# Create your models here.

#1 USER MODEL

class CustomAccountManager(BaseUserManager):
    def create_superuser(self,email_id, password, **other_fields):
        
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email_id,  password, **other_fields)

    def create_user(self, email , password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email_id=email,  **other_fields)
        user.set_password(password)
        user.save()
        return user


# User Model
class User(AbstractBaseUser,PermissionsMixin):
    
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=100) 
    dob = models.DateField(default='2000-10-10')
    age= models.CharField(max_length=2)
    category = models.CharField(max_length= 20,
                                choices=AGE_GROUP,
                                default= "Junior" )
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default= True)
    mobile_number = models.CharField(max_length=12)
    email_id      = models.EmailField(max_length=100,unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    about = models.CharField(max_length=1000)
    account_balance = models.DecimalField(max_digits=2, decimal_places=1 , default=1)
    profile_pic = models.ImageField(upload_to='images/',null=True, blank=True)
    above_age = models.BooleanField(default = False)
   
    objects = CustomAccountManager()

    USERNAME_FIELD ='email_id'
    REQUIRED_FIELDS = ['mobile_number', 'dob']

    def __str__(self):
        return self.first_name

    def setAge(self,dob):
        today = date.today()
        self.age = today.year - int(dob[0:4]) - ((today.month, today.day) < (int(dob[5:7]), int(dob[8:])))
        return

    def setAgeGroup(self):
        if self.age <18:
            self.category = "J"
        elif self.age < 65: 
            self.category = "A"
        else :
            self.category = "S"
        return

#Create Auth Token
@receiver(post_save, sender= settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)

#2 ACTIVITY MODEL
class Activity(models.Model):   
    user = models.ManyToManyField('User', related_name='activities')       
    service_type = models.CharField(max_length= 20,
                                    choices=EARN_OR_BURN, 
                                    default= 'Offer' )
    title=models.CharField(max_length=50)
    description=models.CharField(max_length= 200)
    act_status = models.BooleanField(default= True)
    start_date = models.DateField()
    end_date = models.DateField()
    vol_req = models.IntegerField(default=5)
    est_hours = models.IntegerField()
    category = models.CharField(max_length= 30,
                                choices=CATEGORIES,
                                default='Earth Creds')
    


#3 FRIEND REQUEST MODEL
class FriendRequest(models.Model):
    to_user = models.ForeignKey(User,related_name='to_user',on_delete=models.CASCADE)
    from_user = models.ForeignKey(User,related_name='from_user',on_delete=models.CASCADE)

