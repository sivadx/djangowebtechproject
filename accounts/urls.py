
from django.urls import include, path
from . import views
app_name='accounts'
urlpatterns = [
    path('', views.testfun, name='index'),
    path('register/',views.reg,name='reg'),
    path('login/',views.log,name='log'),
    path('logout/',views.lout,name='lout'),
    path('buy/<slug:slug>/',views.dgame,name='dgame'),
    path('profile/',views.puser,name='profile')
]