from rest_framework import serializers
from .models import Enquiry, EnquiryItem

class EnquiryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnquiryItem
        fields = ['id', 'item_code', 'product_description', 'cost_price', 'selling_price', 'quantity', 'total_amount']

class EnquirySerializer(serializers.ModelSerializer):
    items = EnquiryItemSerializer(many=True, read_only=True)
    grand_total = serializers.SerializerMethodField()

    class Meta:
        model = Enquiry
        fields = [
            'id', 'enquiry_id', 'first_name', 'last_name', 'email', 'phone_number',
            'street_address', 'apartment', 'city', 'state', 'postal', 'country',
            'enquiry_type', 'enquiry_description', 'enquiry_channels', 'source',
            'how_heard_this', 'urgency_level', 'enquiry_status', 'priority',
            'created_at', 'items', 'grand_total'
        ]

    def get_grand_total(self, obj):
        return sum(item.total_amount for item in obj.items.all()) if obj.items.exists() else 0

class EnquiryCreateSerializer(serializers.ModelSerializer):
    items = EnquiryItemSerializer(many=True, required=False)

    class Meta:
        model = Enquiry
        fields = [
            'first_name', 'last_name', 'email', 'phone_number', 'street_address',
            'apartment', 'city', 'state', 'postal', 'country', 'enquiry_type',
            'enquiry_description', 'enquiry_channels', 'source', 'how_heard_this',
            'urgency_level', 'enquiry_status', 'priority', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items', [])
        enquiry = Enquiry.objects.create(enquiry_id=self._generate_enquiry_id(), **validated_data)
        for item_data in items_data:
            EnquiryItem.objects.create(enquiry=enquiry, **item_data)
        return enquiry

    def _generate_enquiry_id(self):
        last_enquiry = Enquiry.objects.order_by('-id').first()
        if last_enquiry:
            last_id = int(last_enquiry.enquiry_id.replace('ENQ', '')) + 1
        else:
            last_id = 1
        return f'ENQ{last_id:03d}'  # e.g., ENQ001, ENQ002