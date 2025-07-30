from django.db import models
from django.contrib.auth.models import User

class Enquiry(models.Model):
    enquiry_id = models.CharField(max_length=10, unique=True)  # e.g., ENQ001
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)  # Link to core User
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    street_address = models.CharField(max_length=200, blank=True)
    apartment = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postal = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
    enquiry_type = models.CharField(max_length=50, choices=[('Product', 'Product'), ('Service', 'Service')])
    enquiry_description = models.TextField(blank=True)
    enquiry_channels = models.CharField(max_length=50, blank=True, choices=[
        ('Phone', 'Phone'), ('Email', 'Email'), ('Web Form', 'Web Form'),
        ('Facebook', 'Facebook'), ('Twitter', 'Twitter'), ('Instagram', 'Instagram'), ('LinkedIn', 'LinkedIn')
    ])
    source = models.CharField(max_length=50, choices=[
        ('WebSite', 'WebSite'), ('Referral', 'Referral'), ('Online Advertising', 'Online Advertising'),
        ('Offline Advertising', 'Offline Advertising'), ('Facebook', 'Facebook'), ('Twitter', 'Twitter'),
        ('Instagram', 'Instagram'), ('LinkedIn', 'LinkedIn')
    ])
    how_heard_this = models.CharField(max_length=50, blank=True, choices=[
        ('WebSite', 'WebSite'), ('Referral', 'Referral'), ('Social Media', 'Social Media'),
        ('Event', 'Event'), ('Search Engine', 'Search Engine'), ('Other', 'Other')
    ])
    urgency_level = models.CharField(max_length=50, blank=True, choices=[
        ('Immediately', 'Immediately'), ('Within 1-3 Months', 'Within 1-3 Months'),
        ('Within 6 Months', 'Within 6 Months'), ('Just Researching', 'Just Researching')
    ])
    enquiry_status = models.CharField(max_length=20, choices=[
        ('New', 'New'), ('In Process', 'In Process'), ('Closed', 'Closed')
    ])
    priority = models.CharField(max_length=20, blank=True, choices=[
        ('High', 'High'), ('Medium', 'Medium'), ('Low', 'Low')
    ])
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.enquiry_id} - {self.first_name} {self.last_name}"

class EnquiryItem(models.Model):
    enquiry = models.ForeignKey(Enquiry, on_delete=models.CASCADE, related_name='items')
    item_code = models.CharField(max_length=10)
    product_description = models.CharField(max_length=200)
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.item_code} - {self.product_description}"