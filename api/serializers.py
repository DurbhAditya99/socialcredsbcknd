from rest_framework import serializers
from .models import User,Activity,Budget


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ( 'id','first_name' , 'last_name', 'mobile_number', 'about')
        
class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model= User
        fields = ( 'id','first_name' , 'last_name', 'dob', 'mobile_number', 'email_id', 'password' , 'above_age')
        extra_kwargs = {   'password': {'write_only': True, 'style': {'input_type': 'password'}} }

    def create(self,validated_data):

        account = User(
        first_name = self.validated_data['first_name'] , 
        last_name = self.validated_data['last_name'], 
        dob = self.validated_data['dob'], 
        mobile_number = self.validated_data['mobile_number'], 
        email_id = self.validated_data['email_id'], 
        above_age = self.validated_data['above_age']
            )

        password = self.validated_data['password']
        account.set_password(password) 
        account.save()
        return account
    
class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ( 
                'title',
                'description',
                'amount' )


class CreateActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Activity   
        fields = (
            'title',
            'vol_req',
            'mother_vol',
            'what_donating',
            'where_donating',
            'service_type',
            'description',  
            'start_date' , 
            'est_hours', 
            'act_status',
            'category',
            'color',
            'founder_name' ) 



class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = '__all__'   

