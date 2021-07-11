from django.shortcuts import render,redirect
from .utils import generate_token 
from django.views.generic.base import View
from rest_framework import generics,status
from django.views.generic import ListView
from .serializers import UserSerializer,CreateUserSerializer,CreateActivitySerializer,ActivitySerializer,UpdateUserSerializer
from .models import User,Activity
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import TokenAuthentication
from datetime import date
from rest_framework import serializers
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password 
from rest_framework.decorators import api_view,permission_classes   
from rest_framework.authtoken.views import ObtainAuthToken
import datetime
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from .utils import generate_token 
from django.conf import settings
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponse

# Create your views and endpoints here.

#REGISTERING A USER
@api_view(['POST',])
@permission_classes(())
def registration_view(request):
    if request.method == 'POST':
        serializer = CreateUserSerializer(data=request.data)
        data = {}   
        if serializer.is_valid(): 
            user = serializer.save()
            data = serializer.data
            user.is_active = False
            user.save()
            data['status'] = user.is_active
            current_site = get_current_site(request)
            message= render_to_string('mail_template.html',{
                'user' : user,
                'domain' : current_site.domain,
                'uid' : urlsafe_base64_encode(force_bytes(user.pk)),
                'token' : generate_token.make_token(user)
                })
            email_message  = EmailMessage(
                'Social Cred$ Account',
                message,
                settings.EMAIL_HOST_USER,
                ['me180003018@iiti.ac.in']
                )
            email_message.send()
        else:
            data = { 'errors' : serializer.errors,
                     'status' : 400 }
        return Response(data)



#GET USER PROFILE
@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def user_view(request,id):
    try: 
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)


#LIST ALL USERS
@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def user_view_all(request):
    user= User.objects.all()
    if request.method == "GET":
        serializer = UserSerializer(user)
        return Response(serializer.data)


#UPDATE USER PROFILE
@api_view(['PUT','DELETE',])
@permission_classes((IsAuthenticated,))
def user_update(request,id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = UpdateUserSerializer(user,data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['success'] = "Updated Successfully"
            return Response(data=data)    
        return Response(serializer.errors,status = status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        operation = user.delete()
        data = {}
        if operation:
            data['success'] = 'deletion successful'
        else:
            data['failure'] = 'deletion failed'
        return Response(data=data)           


#LOGIN 
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        user = User.objects.get(id= token.user_id)
        serializer = UserSerializer(user)
        data = serializer.data
        return Response({'token': token.key, 'id' : data['id'], 'first_name': data['first_name']})


#USER LOG OUT
class LogoutView(APIView):
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        data = {
            'success' : 'logout success!'
        }
        return Response(data,status=status.HTTP_200_OK)


# Creating an Activity
@api_view(['POST',])
@permission_classes((IsAuthenticated,))
def ActivityPostView(request):
    if request.method == 'POST':
        serializer = CreateActivitySerializer(data=request.data)
        print('hello')
        data = {}
        if serializer.is_valid():
            act = serializer.save()
            act.founder = request.user
            act.user.add(request.user)
            act.save()
            data = serializer.data
        else:
            data = serializer.errors
        return Response(data)


#VIEW ALL ACTIVITY
class AllActivityView(APIView):
    http_method_names = ['get',]

    def get(self, request, format=None):
        acts = Activity.objects.filter().exclude(user= request.user.id)
        serializer = ActivitySerializer(acts, many=True)
        return Response(serializer.data)



#GET user activities
class UserActivityList(APIView):
    http_method_names = ['get']
   
    def get(self,request, format =None):
        acts = Activity.objects.filter(user = request.user.id )
        serializer = ActivitySerializer(acts , many =True)
        return Response(serializer.data)



#GET ACTIVITY DETAIL
@api_view(['GET','PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def act_view(request,id):
    try: 
        act = Activity.objects.get(id=id)
    except Activity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ActivitySerializer(act)
        return Response(serializer.data)

    if request.method == 'PUT':
        data = {}
        act.user.add(request.user)
        data['user'] = request.user.first_name
        data['success'] = "Updated Successfully"
        return Response(data=data)    
    
    if request.method == 'DELETE':
        print('dele')
        operation = act.delete()
        data = {}
        if operation:
            data['success'] = 'deletion successful'
        else:
            data['failure'] = 'deletion failed'
        return Response(data=data)        



#ACCOUNT ACTIVATION

class ActivateAccountView(APIView):
    http_method_names = ['get']
    permission_classes = []
   
    def get(self,request, uidb64, token):
        try: 
            print("trying")
            uid = force_text(urlsafe_base64_decode(uidb64).decode())
            user = User.objects.get(pk = uid)

        except Exception as identifier:
            user = None

        if user is not None and generate_token.check_token(user,token):
            data ={}
            user.is_active = True
            user.save()
            data['status'] = 'Success'
            return Response(data)
        return Response({'status': 'failed'})