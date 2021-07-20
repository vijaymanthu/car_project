from .views import CustomerUser,BlocklistTokenView
from django.urls import path
urlpatterns = [
    path('register/',CustomerUser.as_view(),name="create_user"),
    path('logout/',BlocklistTokenView.as_view(),name="logout_user")
]