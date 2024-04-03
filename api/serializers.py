from rest_framework import serializers
from .models import Compound


# Serializer for the incomming requests
class RequestCompoundsSerializer(serializers.Serializer):
    used_ids = serializers.ListField(child=serializers.IntegerField())
    groups = serializers.ListField(child=serializers.CharField())
    elements = serializers.ListField(child=serializers.CharField())
    count = serializers.IntegerField(max_value=100, min_value=1)

    class Meta:
        fields = ("used_ids", "groups", "elements", "count")


# Response of the server for the frontend
class SendCompoundsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Compound
        fields = ("id", "formula", "name")


# class TestCompoundsSerializer(serializers.Serializer):
#     groups = serializers.ListField(child=serializers.CharField())
#     elements = serializers.ListField(child=serializers.CharField())
#     count = serializers.IntegerField(max_value=100, min_value=1)

#     class Meta:
#         fields = ('groups', 'elements', 'count')
