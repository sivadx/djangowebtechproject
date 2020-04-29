from django import forms
from . import models

class payment_portal(forms.ModelForm):
    class Meta:
        model=models.download
        fields=['pin','credit_card_no']