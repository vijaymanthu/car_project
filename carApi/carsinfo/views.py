from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import response
from rest_framework.response import Response
from rest_framework import authentication, status
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import CarPlan, carDetails, carAssigned
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.permissions import AllowAny, IsAuthenticated,IsAdminUser
from .serializers import CarDetailSerializer,CarPlanSerializer,CarAssignedSerializer,UserSerializer
from rest_framework.views import APIView

# Create your views here.

class ApiUrls(APIView):
    def get(self,request):
        urls ={
            'Usertype':'--------ADMINUSER---------',

            'login                              ':'auth/login/',
            'Add and get user by adminUser      ':'cars/adduser/',
            'Edit user                          ':'cars/adduser/<int:pk>',
            'add Carplan Details                ':'cars/carplan/',
            'update,delete carplan plan          ': 'cars/carplan/<int:id>',
            'view,Add car details by            ':'cars/car/',
            'Edit,DELETE Car Details            ':'cars/car/<int:id>',
            'Assign Car to users                ':'cars/assign_car/',
            'Edit and Delete assigned car       ':'cars/assign_car/<int:id>',

            '--------':'------------------------------------',
            '--------':'------------------------------------',
            '--------':'---------------USER-----------------',
            '--------':'------------------------------------',
            'user login View of Assigned car'   :'cars/user/carinfo',

        }
        return Response(urls)



class AddUser(APIView):

    Serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    def get(self,request):
        users = User.objects.filter(is_staff = False,is_superuser=False )
        serializer = UserSerializer(users,many=True)
        return Response(serializer.data)

    def post(self,request):
        post_data = request.data
        serializer = UserSerializer(data=post_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)




class EditUser(APIView):
    permission_classes = [IsAdminUser]

    def get(self,request,pk):
        try:
            user_details = User.objects.get(id=pk)
            serializer = UserSerializer(user_details)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @csrf_exempt
    def delete(self,request,pk):
        try:
            User.objects.get(id=pk).delete()
            return Response(status=status.HTTP_200_OK)

        except:
            return Response(status=status.HTTP_404_NOT_FOUND)




class AddCarPlan(APIView):
   
    permission_classes = [IsAdminUser]

    def get(self,request):
        car_plans = CarPlan.objects.all()
        serializer = CarPlanSerializer(car_plans,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = CarPlanSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)





class EditCarPlans(APIView):

    permission_classes = [IsAdminUser]

    def get(self,request,id):
        try:
            car_details = CarPlan.objects.get(id=id)
            serializer = CarPlanSerializer(car_details)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self,request,id):
        try:
            CarPlan.objects.get(id=id).delete()
            return Response('Record Deleted')
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self,request,id):
        try:
            car_plan_details = request.data
            serializer = CarPlanSerializer(CarPlan.objects.get(id=id), data = car_plan_details)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_204_NO_CONTENT)



class AddCar(APIView):
    permission_classes = [IsAdminUser]

    def get(self,request):
        try:
            cars = carDetails.objects.all()
            serializer = CarDetailSerializer(cars,many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self,request):
        post = request.data
        id = post.pop('car_plan')
        cp = CarPlan.objects.get(id=int(id))
        try:
            new_car = carDetails.objects.create(car_plan=cp,
                                        car_brand = post['car_brand'],car_model=post['car_model'],
                                        production_year = post['production_year'],engine_type=post['engine_type'],
                                        car_body = post['car_body']
                                        )
        except Exception as e:
            print(e)
        new_car.save()
        return new_car

    def post(self,request):
        print(request.data)
        
        new_data = self.create(request)
        serializer = CarDetailSerializer(data = new_data)       
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_201_CREATED)



# EditCarDetails
class EditCarDetails(APIView):
   
    permission_classes = [IsAdminUser]

    def get(self,request,id):
        try:
            car_details = carDetails.objects.get(id=id)
            serializer = CarDetailSerializer(car_details)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def delete(self,request,id):
        try:
            carDetails.objects.get(id=id).delete()
            return Response('Record Deleted')
        except carDetails.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


    def put(self,request,id):
     
        try:
            car_details = request.data
            serializer = CarDetailSerializer(carDetails.objects.get(id=id), data = car_details)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
        except:
            return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)


# Car Assigned Details

class CarAssignedDetails(APIView):
   
    permission_classes = [IsAdminUser]

    def get(self,request):
        assign_car = carAssigned.objects.all()
        serializer = CarAssignedSerializer(assign_car,many=True)
        return Response(serializer.data)

    def post(self,request):
        serializer = CarAssignedSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)


# Edit Assigned Car Details
class EditAssignedCarDetails(APIView):
    
    permission_classes = [IsAdminUser]

    def delete(self,request,id):
        try:
            carAssigned.objects.get(id=id).delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self,request,id):
        serializer = CarAssignedSerializer(carAssigned.objects.get(id=id),data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors,status=status.HTTP_204_NO_CONTENT)


# Assigned Car Details for user
class CarInfo(APIView):
   
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user_id = request.user.id
        print(user_id)
        carass_data = {}
        assigned_details = carAssigned.objects.filter(user_id=int(user_id))
        i=0
        for ass_det in assigned_details:
            cd = carDetails.objects.get(id=ass_det.car_id)
            data = {'car_model':cd.car_model,'car_brand':cd.car_brand,'production_year':cd.production_year,
                'car_body':cd.car_body,'engine_type':cd.engine_type,'car_plan':cd.car_plan}
            serializer = CarDetailSerializer(data)
            carass_data[i]=serializer.data
            i +=1
        return Response(carass_data)
        # except:
        #     return Response(serializer.errors,status=status.HTTP_404_NOT_FOUND)
