from django.urls import path
from . import views


urlpatterns = [
	path('', views.apiOverview, name='overview'),
	path('task-list', views.taskList, name='lists'),
	path('task-detail/<str:pk>', views.taskDetail, name='detail')
]
