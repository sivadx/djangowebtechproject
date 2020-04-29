from django.db import models
from django.contrib.auth.models import User
from games.models import Game

# Create your models here.
class profile(models.Model):
    user=models.OneToOneField(User,null=True,on_delete=models.CASCADE)
    pgames=models.ManyToManyField(Game,blank=True)
    
    def __str__(self):
        return self.user.username
        
class download(models.Model):
    game=models.ForeignKey(Game,on_delete=models.SET_NULL,null=True)
    owner=models.ForeignKey(profile,on_delete=models.SET_NULL,null=True)
    credit_card_no=models.CharField(max_length=10)
    pin=models.IntegerField()
    date=models.DateTimeField(auto_now_add=True)