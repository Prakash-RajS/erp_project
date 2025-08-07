from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Department, Branch, Role , Candidate

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name']

# class RoleSerializer(serializers.ModelSerializer):
#     department_id = serializers.IntegerField(source='department.id', read_only=True)
#     department_name = serializers.CharField(source='department.department_name', read_only=True)
#     branch_id = serializers.IntegerField(source='branch.id', read_only=True)  # <-- fixed
#     branch_name = serializers.CharField(source='branch.name', read_only=True)  # <-- fixed

#     class Meta:
#         model = Role
#         fields = [
#             'id', 'role', 'description', 'permissions',
#             'department', 'department_id', 'department_name',
#             'branch', 'branch_id', 'branch_name',  # <-- include 'branch'
#         ]
        
class RoleSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all(), allow_null=True)

    department_id = serializers.IntegerField(source='department.id', read_only=True)
    department_name = serializers.CharField(source='department.department_name', read_only=True)
    branch_id = serializers.IntegerField(source='branch.id', read_only=True)
    branch_name = serializers.CharField(source='branch.name', read_only=True)

    class Meta:
        model = Role
        fields = [
            'id', 'role', 'description', 'permissions',
            'department', 'department_id', 'department_name',
            'branch', 'branch_id', 'branch_name',
        ]
        
class DepartmentSerializer(serializers.ModelSerializer):
    branch = BranchSerializer(read_only=True)
    roles = RoleSerializer(many=True, read_only=True)

    class Meta:
        model = Department
        fields = ['id', 'code', 'department_name', 'branch', 'description', 'roles']

class DepartmentCreateSerializer(serializers.ModelSerializer):
    branch = serializers.PrimaryKeyRelatedField(
        queryset=Branch.objects.all(),
        allow_null=True
    )

    class Meta:
        model = Department
        fields = ['code', 'department_name', 'branch', 'description']


# serializers.py
class ProfileDetailSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(read_only=True)
    branch = BranchSerializer(read_only=True)
    available_branches = serializers.ListField(child=serializers.CharField(), read_only=True)
    reporting_to = serializers.CharField(allow_null=True, read_only=True)
    role = RoleSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = [
            'phone', 'role', 'profilePic', 'contact_number', 'department',
            'branch', 'available_branches', 'reporting_to', 'employee_id'
        ]

class ProfileUpdateSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), allow_null=True)
    branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all(), allow_null=True)
    available_branches = serializers.ListField(child=serializers.CharField(), required=False)
    reporting_to = serializers.CharField(allow_null=True, read_only=True)
    role = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), allow_null=True)
    profilePic = serializers.ImageField(allow_empty_file=True, required=False)

    class Meta:
        model = Profile
        fields = [
            'phone', 'role', 'profilePic', 'contact_number', 'department',
            'branch', 'available_branches', 'reporting_to', 'employee_id'
        ]

    def validate_employee_id(self, value):
        if value and self.instance:  # Only validate for updates if value is provided
            if self.instance.employee_id == value:
                return value  # Skip uniqueness check for same value
            if Profile.objects.exclude(pk=self.instance.pk).filter(employee_id=value).exists():
                raise serializers.ValidationError("Employee ID must be unique.")
        elif value:  # For creates
            if Profile.objects.filter(employee_id=value).exists():
                raise serializers.ValidationError("Employee ID must be unique.")
        return value

    
class UserSerializer(serializers.ModelSerializer):
    profile = ProfileDetailSerializer()

    class Meta:
        model = User
        fields = ['first_name', 'email', 'password', 'profile']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data.get('password'),  # Default to empty if not provided
            first_name=validated_data['first_name']
        )
        Profile.objects.create(user=user, **profile_data)
        return user

# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    remember_me = serializers.BooleanField(default=True)  # Checkbox defaults to checked

class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

class ResetPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(min_length=8, write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        if not any(c.isdigit() for c in data['new_password']) or not any(c.isalpha() for c in data['new_password']):
            raise serializers.ValidationError("Password must contain at least one number and one alphabet")
        return data

class ManageUserSerializer(serializers.ModelSerializer):
    profile = ProfileDetailSerializer()
    code = serializers.CharField(source='id', read_only=True)
    last_name = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = User
        fields = ['code', 'email', 'first_name', 'last_name', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        profile = instance.profile
        profile.contact_number = profile_data.get('contact_number', profile.contact_number)
        profile.branch = profile_data.get('branch', profile.branch)
        profile.department = profile_data.get('department', profile.department)
        profile.role = profile_data.get('role', profile.role)
        profile.reporting_to = profile_data.get('reporting_to', profile.reporting_to)
        profile.available_branches = profile_data.get('available_branches', profile.available_branches)
        profile.profilePic = profile_data.get('profilePic', profile.profilePic)
        profile.save()

        return instance

class CreateUserSerializer(serializers.ModelSerializer):
    profile = ProfileUpdateSerializer()
    last_name = serializers.CharField(allow_blank=True, required=False)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'password', 'profile']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }

    def validate_email(self, value):
        if self.instance:  # Update mode
            if self.instance.email == value:
                return value  # Skip uniqueness check for same value
            if User.objects.exclude(pk=self.instance.pk).filter(username=value).exists():
                raise serializers.ValidationError("A user with this email already exists.")
        else:  # Create mode
            if User.objects.filter(username=value).exists():
                raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password', None)

        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=password if password else '',
            first_name=validated_data['first_name'],
            last_name=validated_data.get('last_name', '')
        )

        available_branches = profile_data.pop('available_branches', [])
        profile = Profile.objects.create(user=user, **profile_data)
        profile.available_branches = available_branches
        profile.save()

        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        profile = instance.profile
        profile.contact_number = profile_data.get('contact_number', profile.contact_number)
        profile.branch = profile_data.get('branch', profile.branch)
        profile.department = profile_data.get('department', profile.department)
        profile.role = profile_data.get('role', profile.role)
        profile.reporting_to = profile_data.get('reporting_to', profile.reporting_to)
        profile.available_branches = profile_data.get('available_branches', profile.available_branches)
        profile.profilePic = profile_data.get('profilePic', profile.profilePic)
        profile.save()

        return instance



class ProfileChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance

from rest_framework import serializers
from .models import Product, Category, TaxCode, UOM, Warehouse, Size, Color, Supplier

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class TaxCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaxCode
        fields = ['id', 'name', 'percentage', 'description']

class UOMSerializer(serializers.ModelSerializer):
    class Meta:
        model = UOM
        fields = ['id', 'name', 'items', 'description']

class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = ['id', 'name', 'location', 'manager_name', 'contact_info', 'notes']

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ['id', 'name']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ['id', 'name']

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ['id', 'name', 'contact_person', 'phone_number', 'email', 'address']

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), allow_null=True, required=False)
    tax_code = serializers.PrimaryKeyRelatedField(queryset=TaxCode.objects.all(), allow_null=True, required=False)
    uom = serializers.PrimaryKeyRelatedField(queryset=UOM.objects.all(), allow_null=True, required=False)
    warehouse = serializers.PrimaryKeyRelatedField(queryset=Warehouse.objects.all(), allow_null=True, required=False)
    size = serializers.PrimaryKeyRelatedField(queryset=Size.objects.all(), allow_null=True, required=False)
    color = serializers.PrimaryKeyRelatedField(queryset=Color.objects.all(), allow_null=True, required=False)
    supplier = serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all(), allow_null=True, required=False)
    related_products = serializers.PrimaryKeyRelatedField(many=True, queryset=Product.objects.all(), required=False)
    

    class Meta:
        model = Product
        fields = [
            'id', 'product_id', 'name', 'product_type', 'description', 'category', 'tax_code', 'unit_price',
            'discount', 'uom', 'quantity', 'stock_level', 'reorder_level', 'warehouse', 'size', 'color', 'weight',
            'specifications', 'supplier', 'status', 'product_usage', 'related_products', 'image', 'sub_category',
        ]

    def validate(self, data):
        if data.get('is_custom') and not data.get('custom_value'):
            raise serializers.ValidationError({'custom_value': 'Custom value is required when is_custom is true'})
        return data

    def create(self, validated_data):
        related_products_data = validated_data.pop('related_products', [])
        if not validated_data.get('is_custom'):
            validated_data.pop('custom_value', None)  # Remove if not custom
        product = Product.objects.create(**validated_data)
        if related_products_data:
            product.related_products.set(related_products_data)
        return product

    def update(self, instance, validated_data):
        related_products_data = validated_data.pop('related_products', None)
        if not validated_data.get('is_custom'):
            validated_data.pop('custom_value', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if related_products_data is not None:
            instance.related_products.set(related_products_data)
        instance.save()
        return instance
    
from rest_framework import serializers
from .models import Candidate, Department, Role, Branch

import logging
logger = logging.getLogger(__name__)

class CandidateSerializer(serializers.ModelSerializer):
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), required=False)
    branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all(), required=False)
    designation = serializers.PrimaryKeyRelatedField(queryset=Role.objects.all(), required=False)
    upload_documents = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = Candidate
        fields = '__all__'
        depth = 1

    def validate_upload_documents(self, value):
        # Ensure the field is a string or empty
        if value is None:
            return ''
        return str(value)

    def validate(self, data):
        # Log the validated data for debugging
        logger.info("Validated serializer data: %s", data)
        return data

from rest_framework import serializers
from .models import Attendance, GovernmentHoliday

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = ['id', 'date', 'check_in_times', 'total_hours']

class CheckInOutSerializer(serializers.Serializer):
    date = serializers.DateField()
    is_check_in = serializers.BooleanField()

class GovernmentHolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = GovernmentHoliday
        fields = ['date', 'description']

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'email']

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Task
        fields = ['id', 'name', 'status', 'start_date', 'due_date', 'assigned_to', 'priority']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['assigned_to'] = {
            'id': instance.assigned_to.id,
            'name': instance.assigned_to.first_name
        }
        return data
    

# serializers.py
from rest_framework import serializers
from .models import Task, Attendance
from .serializers import TaskSerializer, AttendanceSerializer  # Import your existing serializers

class TaskSummarySerializer(serializers.Serializer):
    not_started = serializers.IntegerField()
    in_progress = serializers.IntegerField()
    completed = serializers.IntegerField()
    awaiting_feedback = serializers.IntegerField()

class TaskDataSerializer(serializers.Serializer):
    taskData = TaskSerializer(many=True)
    taskSummary = TaskSummarySerializer()

class DashboardAttendanceSerializer(serializers.Serializer):
    dateData = serializers.ListField(child=serializers.DictField())