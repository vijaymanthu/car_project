from django.urls import path
from .views import *
urlpatterns=[
    path('adduser/',AddUser.as_view(),name="add_user"),
    path('adduser/<int:pk>',EditUser.as_view,name="edit_user"),
    path('carplan/', AddCarPlan.as_view()),
    path('carplan/<int:id>',EditCarPlans.as_view()),
    path('car/', AddCar.as_view()),
    path('car/<int:id>',EditCarDetails.as_view()),
    path('assign_car/',CarAssignedDetails.as_view()),
    path('assign_car/<int:id>',EditAssignedCarDetails.as_view()),
    path('user/carinfo',CarInfo.as_view()),
    ]   