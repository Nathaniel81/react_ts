from django.urls import path
from . import views
    
urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('register', views.RegistrationView.as_view(), name='register'),
    path('username/', views.UpdateUsernameView.as_view()),

]