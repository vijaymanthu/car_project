from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import RegSerializer
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.

class CustomerUser(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegSerializer(data=request.data)
        if serializer.is_valid():
            newuser = serializer.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlocklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
