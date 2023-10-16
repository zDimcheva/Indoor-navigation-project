from django.db import models

# Create your models here.

# Specifying the choices
TYPE_OF_THE_EVENT = (
           ("Lecture", "Lecture"),
           ("Lab", "Lab"),
           ("Language Class", "Language Class"),
           ("Drop In", "Drop In"),
           ("Example Class", "Example Class"),
)

TYPE_OF_THE_ROOM = (
           ("Lecture Theatre", "Lecture Theatre"),
           ("Collab Space", "Collab Space"),
           ("Research Lab", "Research Lab"),
           ("Computer Lab", "Computer Lab"),
           ("Office", "Office"),
           ("Help Desk", "Help Desk"),
           ("Meeting Room", "Meeting Room"),
           ("Teaching", "Teaching"),
           ("PGR Home", "PGR Home"),
           ("PGR Lab", "PGR Lab"),
)

# Create Room table
class Room(models.Model):
    title = models.CharField(max_length=100, unique=True, primary_key=True)
    floor = models.PositiveIntegerField(default='0')
    description = models.CharField(max_length=250, blank=True)
    capacity = models.PositiveIntegerField()
    room_type = models.CharField(max_length = 40,choices = TYPE_OF_THE_ROOM,default = 'Office')

    def __str__(self):
        return self.title

#Create Event table
class Event(models.Model):
    name = models.CharField(max_length=100, default='')
    description = models.CharField(max_length=250, blank=True)
    start_date = models.DateField()
    time = models.TimeField()
    end_time = models.TimeField(default='')
    type_of_event = models.CharField(max_length = 20,choices = TYPE_OF_THE_EVENT,default = 'Lecture')
    presenter = models.CharField(max_length=250, default='')

    room = models.ForeignKey(Room, on_delete=models.RESTRICT)

    def __str__(self):
        return self.name

#Create Event table
class Office(models.Model):
    lecturer = models.CharField(max_length=250, blank=True, default='')

    room = models.ForeignKey(Room, on_delete=models.RESTRICT)

    def __str__(self):
        return self.room.title