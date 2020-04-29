
from django.shortcuts import render,redirect
from django.http import HttpResponse
from .models import Game
# Create your views here.
def listfun(request):
    games=Game.objects.all()
    return render(request,'games/gamel.html',{'games':games})
    
def game_detail(request,slug):
    game=Game.objects.get(slug=slug)
    return render(request,'games/gamed.html',{'game':game})
    