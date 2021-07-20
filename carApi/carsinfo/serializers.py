from rest_framework import serializers
from .models import carDetails,CarPlan,carAssigned
from django.contrib.auth import get_user_model
User = get_user_model()


class CarDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = carDetails
        fields = ['id','car_plan','car_brand','car_model','production_year','car_body','engine_type']
        depth = 1


class CarPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarPlan
        fields = ['id','plan_name','year_of_warranty','finance_plan']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'user_name', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class CarAssignedSerializer(serializers.ModelSerializer):
    class Meta:
        model = carAssigned
        fields = ['id','car','user_id']
