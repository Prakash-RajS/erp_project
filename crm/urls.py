from django.urls import path
from . import views

urlpatterns = [
    path('enquiries/', views.EnquiryListView.as_view(), name='enquiry-list'),
    path('enquiries/<int:pk>/', views.NewEnquiryView.as_view(), name='enquiry-detail'),
]