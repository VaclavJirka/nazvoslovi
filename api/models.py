from django.db import models


class Element(models.Model):
    id = models.IntegerField(blank=False, primary_key=True, unique=True)
    formula = models.CharField(blank=False, max_length=2)
    name = name = models.TextField(blank=False)

    def __str__(self):
        return self.name


class Group(models.Model):
    id = models.IntegerField(blank=False, primary_key=True, unique=True)
    name = models.TextField(blank=False)

    def __str__(self):
        return self.name


class Compound(models.Model):
    id = models.IntegerField(blank=False, primary_key=True, unique=True)
    formula = models.CharField(blank=False, max_length=255)
    name = models.TextField(blank=False)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    elements = models.ManyToManyField(Element)

    def __str__(self):
        return self.name