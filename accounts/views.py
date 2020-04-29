from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm,AuthenticationForm
from django.contrib.auth import login,logout
from . import forms
from .models import Game
from .models import profile
# Create your views here.
def testfun(request):
 return render(request,'accounts/test.html')
def reg(request):
 if request.method=='POST':  
  form=UserCreationForm(request.POST)
  if form.is_valid():
     user=form.save()
     login(request,user)
     return redirect('games:list')
 else:    
  form=UserCreationForm()    
 return render(request,'accounts/accountreg.html',{'form':form}) 
def log(request):
  if request.method=='POST':
   form=AuthenticationForm(data=request.POST)
   if form.is_valid():
     user=form.get_user()
     login(request,user)
     return redirect('games:list')
  else:
    form=AuthenticationForm()
  return render(request,'accounts/login.html',{'form':form})
  
def lout(request):
    if(request.method=='POST'):
        logout(request)
        return redirect('home')
        
def dgame(request,slug):
    game=Game.objects.get(slug=slug)
    if request.method=='POST':
        form=forms.payment_portal(request.POST)
        if(form.is_valid()):
            inst=form.save(commit=False)
            p1=profile.objects.get(user=request.user)
            inst.owner=p1
            inst.game=game
            inst.save()
            
            p1.pgames.add(game)
            p1.save()
            return redirect('games:list')
    else:
        form=forms.payment_portal()
    return render(request,'accounts/downloadg.html',{'form':form,'game':game})
    
    
    
def puser(request):
    p=profile.objects.get(user=request.user)
    return render(request,'accounts/dispprofile.html',{'p':p})