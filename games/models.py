from django.db import models
# Create your models here.
class Game(models.Model):
    game_name=models.CharField(max_length=30)
    game_publisher=models.CharField(max_length=30)
    game_description=models.TextField()
    slug=models.SlugField()
    price=models.IntegerField()
    date=models.DateTimeField(auto_now_add=True)
    thumb=models.ImageField(blank=True)
    
    def __str__(self):
        return self.game_name
        
        
        
        

    