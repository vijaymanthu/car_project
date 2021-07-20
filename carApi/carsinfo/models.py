from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class CarPlan(models.Model):
    plan_name = models.CharField(max_length=50)
    year_of_warranty = models.PositiveIntegerField(default=1)
    finance_plan = models.CharField(max_length=50,default="unavailable")

    def __str__(self):
        return self.plan_name

class carDetails(models.Model):
    car_model = models.CharField(max_length=30)
    car_brand = models.CharField(max_length=30)
    production_year = models.PositiveIntegerField()
    car_body = models.CharField(max_length=60)
    engine_type = models.CharField(max_length=40)
    car_plan =  models.ForeignKey(CarPlan,on_delete=models.SET_NULL,null=True)

    # def __str__(self):
    #     return self.car_model

class carAssigned(models.Model):
    car = models.ForeignKey(carDetails,on_delete=models.SET_NULL,null=True)
    user_id = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)


