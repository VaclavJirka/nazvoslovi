from django.db.models import Q
from .models import Group, Element


def find_requested_groups_elements(requested_groups, requested_elements):
    # Get model objects of requested groups and elements for requested data
    groups = Group.objects.filter(Q(name__in=requested_groups))
    elements = Element.objects.filter(Q(name__in=requested_elements)).distinct()

    return groups, elements
