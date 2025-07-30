from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Enquiry, EnquiryItem
from .serializers import EnquirySerializer, EnquiryCreateSerializer
from django.core.exceptions import ObjectDoesNotExist

class EnquiryListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        enquiries = Enquiry.objects.filter(user=request.user).order_by('-created_at')
        serializer = EnquirySerializer(enquiries, many=True)
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            enquiry = Enquiry.objects.get(id=pk, user=request.user)
            enquiry.delete()
            return Response({'message': 'Enquiry deleted successfully'}, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({'error': 'Enquiry not found'}, status=status.HTTP_404_NOT_FOUND)

class NewEnquiryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk=None):
        if pk:
            try:
                enquiry = Enquiry.objects.get(id=pk, user=request.user)
                serializer = EnquirySerializer(enquiry)
                return Response(serializer.data)
            except ObjectDoesNotExist:
                return Response({'error': 'Enquiry not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'message': 'Use POST to create a new enquiry'})

    def post(self, request):
        serializer = EnquiryCreateSerializer(data=request.data)
        if serializer.is_valid():
            enquiry = serializer.save(user=request.user)
            return Response(EnquirySerializer(enquiry).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            enquiry = Enquiry.objects.get(id=pk, user=request.user)
            serializer = EnquiryCreateSerializer(enquiry, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(EnquirySerializer(enquiry).data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'error': 'Enquiry not found'}, status=status.HTTP_404_NOT_FOUND)