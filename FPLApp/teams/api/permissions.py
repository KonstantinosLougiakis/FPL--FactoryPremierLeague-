from rest_framework import permissions

class IsAdminOrReadOnly(permissions.IsAdminUser):
    def has_permission(self, request, view):
        is_admin = super().has_permission(request, view)
        return request.method in permissions.SAFE_METHODS or is_admin

class IsAdminOrReadOnlyForCreate(permissions.BasePermission):
    """
    Custom permission to only allow admin users to create resources.
    """

    def has_permission(self, request, view):

        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Allow only admin users to create (POST)
        if request.method == 'POST':
            return request.user and request.user.is_staff
        
        return False