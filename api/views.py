from django.shortcuts import render
from rest_framework import generics,status
from django.views.generic import ListView
from .serializers import UserSerializer,CreateUserSerializer,CreateActivitySerializer,ActivitySerializer,UpdateUserSerializer
from .models import User,Activity,FriendRequest 
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
from django.template.loader import render_to_string
from django.core.mail import send_mail






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
            print(user)
            token = Token.objects.get(user=user).key
            data = serializer.data
            data['token'] = token

            send_mail(
             'Subject here',
             'Here is the message.',
            'adityadurbha@gmail.com',
            ['me180003018@iiti.ac.in'],
            fail_silently=False,
            html_message = render_to_string('mail_template.html')
                )

            print(data)
        else:
            data = serializer.errors
        return Response(data)

#ACTIVATE USER
@api_view(['PUT',])
def activate_user(request):
    if request.method == 'PUT':
        request.user.is_active = True
        Response({'status': 'account activated'})

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
        data = {}
        if serializer.is_valid():
            act = serializer.save()
            act.user.add(request.user)
            data = serializer.data
        else:
            data = serializer.errors
        return Response(data)


#VIEW ALL ACTIVITY
class AllActivityView(APIView):
    http_method_names = ['get',]

    def get(self, request, format=None):
        acts = Activity.objects.all()
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
        operation = act.delete()
        data = {}
        if operation:
            data['success'] = 'deletion successful'
        else:
            data['failure'] = 'deletion failed'
        return Response(data=data)        


# Sending a friend request
@login_required
def send_friend_request(request, userID):
    from_user = request.user
    to_user = User.objects.filter(id=userID)
    friend_request,created = FriendRequest.objects.get_or_create(
        from_user=from_user,
        to_user=to_user
    )
    if created:
        return Response('friend request sent')
    else:
        return Response('friend request was already sent')