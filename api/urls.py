"""GOT URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import activate_user,registration_view,user_view, user_update, LogoutView,user_view_all,ActivityPostView,CustomObtainAuthToken,AllActivityView,act_view,UserActivityList

from .auth import CustomAuthToken

urlpatterns = [
    path('user/all',user_view_all),
    path('user/profile/<int:id>', user_view , name='profile'),
    path('user/act',UserActivityList.as_view()),
    path('user/update/<int:id>', user_update , name = 'update'),
    path('user/register/', registration_view, name='register'),
    path('user/login/', CustomObtainAuthToken.as_view(), name='login' ),
    path('user/logout/', LogoutView.as_view(), name='logout' ),
    path('display/all',AllActivityView.as_view()),
    path('detail/<int:id>', act_view , name='detail'),
    path('create/', ActivityPostView, name='activity'),  
  #  path('send_friend_request/<int:id>',send_friend_request, name='send_friend_request'),
    path('act_user',activate_user )
]
