from django.shortcuts import render,redirect
from django.http import HttpResponse
def homeserve(request):
    return render(request,'homelayout.html')
    
    
def free_game(request):
    return render(request,'freegame.html')