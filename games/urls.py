from django.urls import include, path
from . import views
app_name='games'
urlpatterns = [
    path('', views.listfun, name='list'),
    path('<slug:slug>/',views.game_detail,name='detail')
]