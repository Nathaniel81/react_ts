from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    active = models.booleanField(efault=False)
    def __str__(self):
        return self.name
