from rest_framework import views, status
from rest_framework.response import Response
from .models import Compound
from .serializers import (
    RequestCompoundsSerializer,
    SendCompoundsSerializer,
)
from django.db.models import Q
from .utils import find_requested_groups_elements


class RequestCompoundsView(views.APIView):
    serializer_class = RequestCompoundsSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # Get the request data from serializer
            requested_count = serializer.validated_data.get("count", 10)
            used_ids = serializer.validated_data.get("used_ids", [])
            requested_groups = serializer.validated_data.get("groups", [])
            requested_elements = serializer.validated_data.get("elements", [])

            # Find the elements and groups objects
            groups, elements = find_requested_groups_elements(
                requested_groups, requested_elements
            )

            # Check if the group and element names are correct
            if groups.count() == 0:
                context = {"error": "Invalid group name"}
                return Response(context, status=status.HTTP_400_BAD_REQUEST)

            if elements.count() == 0:
                context = {"error": "Invalid element name"}
                return Response(context, status=status.HTTP_400_BAD_REQUEST)

            # Make a query and filter it out the database
            query = ~Q(id__in=used_ids) & Q(group__in=groups) & Q(elements__in=elements)
            samples = (
                Compound.objects.filter(query)
                .order_by("?")[:requested_count]
                .select_related("group")
            )

            count = Compound.objects.filter(query).count() - requested_count

            # Check if the wanted conditions are correct
            if count == 0:
                context = {"error": "Query returned no results"}
                return Response(context, status=status.HTTP_204_NO_CONTENT)

            # Return the results
            serializer = SendCompoundsSerializer(samples, many=True)
            context = {"data": serializer.data, "count": count}
            return Response(context, status=status.HTTP_200_OK)

        # If there is a problem, return bad request
        else:
            print(serializer.errors)
            context = {"error": "Invalid request data"}
            return Response(context, status=status.HTTP_400_BAD_REQUEST)
