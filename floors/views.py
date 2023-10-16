from django.forms import ValidationError
from django.http import HttpResponse,JsonResponse
from .models import Event, Office
from .models import Room
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.db import IntegrityError
from django.contrib.auth import login, logout, authenticate
from .forms import SignUpForm
from django.utils import timezone
from django.contrib.auth.decorators import login_required
import django.contrib.auth.password_validation as validation

from floors import forms
import datetime
from django.core import serializers
from django.views.decorators.cache import cache_control

from django.db.models import Q

def timetable(request):
    csticket = request.GET.get('csticket')
    csticket2 = request.session.get('csticket')

    all_rooms = []
    all_events = []

    if (csticket is not None and csticket != ''):
        all_rooms = Room.objects.filter(floor=0)
        all_events = Event.objects.all()
        request.session['csticket'] = csticket

    if (csticket2 is not None and csticket2 != ''):
        all_rooms = Room.objects.filter(floor=0)
        all_events = Event.objects.all()

    all_rooms = serializers.serialize("json", all_rooms)
    all_events = serializers.serialize("json", all_events)
    return JsonResponse({'all_rooms': all_rooms, 'all_events': all_events})


# Create your views here.
def index(request):
    sign_up_form = forms.SignUpForm()
    log_in_form = forms.AuthenticationForm()

    if request.method == 'POST':
        if 'sign_up_on' in request.POST:
            if request.POST['password1'] == request.POST['password2']:
                try:
                    validation.validate_password(request.POST['password1'])
                    user = User.objects.create_user(request.POST['username'], password=request.POST['password1'])
                    user.save()
                    login(request, user)
                    return redirect('ground_floor')
                except IntegrityError:
                    return render(request, 'floors/index.html', {'form': SignUpForm(),
                                                                 'error': 'That username has already been taken. Please choose a new username'})
                except ValidationError as err:
                    error = ''
                    for x in err.messages:
                        error += x
                    return render(request, 'floors/index.html', {'form': SignUpForm(), 'error': error})

            else:
                return render(request, 'floors/index.html', {'form': SignUpForm(), 'error': 'Passwords did not match'})

        if 'log_in_on' in request.POST:
            user = authenticate(request, username=request.POST['username'], password=request.POST['password'])
            if user is None:
                return render(request, 'floors/index.html',
                              {'form': AuthenticationForm(), 'error': 'Username and password did not match'})
            else:
                login(request, user)
                return redirect('ground_floor')

    context = {
        'sign_up_form': sign_up_form,
        'log_in_form': log_in_form,
    }

    return render(request, 'floors/index.html', context=context)

def GF(request):

    my_date = datetime.datetime.today()
    day = my_date.weekday()

    # Monday
    Previous_Date = datetime.datetime.today() - datetime.timedelta(days=day)
    monday = Previous_Date.date()

    # Friday
    Next_Date = Previous_Date + datetime.timedelta(days=4)
    friday = Next_Date.date()

    start_time = datetime.time(9, 0)  # Start time is 9:00 AM
    end_time = datetime.time(18, 0)  # End time is 5:00 PM
    delta = datetime.timedelta(minutes=60)  # Time step is 30 minutes

    times = []
    time = datetime.datetime.combine(datetime.date.today(), start_time)
    while time.time() <= end_time:
        times.append(time.time())
        time += delta

    range_times = len(times)

    is_logged_uom = False

    csticket = request.GET.get('csticket')
    csticket2 = request.session.get('csticket')
    all_rooms = []
    all_events = []

    if (csticket is not None and csticket != ''):
        all_rooms = Room.objects.filter(floor=0)
        all_events = Event.objects.all()
        request.session['csticket'] = csticket
        is_logged_uom = True

    if (csticket2 is not None and csticket2 != ''):
        all_rooms = Room.objects.filter(floor=0)
        all_events = Event.objects.all()
        is_logged_uom = True

    table = [[[None] for i in range(5)] for j in range(len(times))]

    for j in range(0, range_times):
        row = table[j]
        row.append([times[j]])
        for i in range(0, 5):
            for event in all_events:
                if (times[j] >= event.time and times[j] <= event.end_time
                        and event.start_date >= monday and friday >= event.start_date and event.start_date.weekday() == i):
                    table[j][i].append(event)

    return render(request, 'floors/ground_floor.html',
                  {'all_rooms': all_rooms, 'all_events': all_events, 'table': table
                   , 'times': times , 'is_logged_uom' : is_logged_uom})

def HF(request):
    my_date = datetime.datetime.today()
    day = my_date.weekday()

    # Monday
    Previous_Date = datetime.datetime.today() - datetime.timedelta(days=day)
    monday = Previous_Date.date()

    # Friday
    Next_Date = Previous_Date + datetime.timedelta(days=4)
    friday = Next_Date.date()

    start_time = datetime.time(9, 0)  # Start time is 9:00 AM
    end_time = datetime.time(18, 0)  # End time is 5:00 PM
    delta = datetime.timedelta(minutes=60)  # Time step is 30 minutes

    times = []
    time = datetime.datetime.combine(datetime.date.today(), start_time)
    while time.time() <= end_time:
        times.append(time.time())
        time += delta

    range_times = len(times)

    is_logged_uom = False

    csticket = request.GET.get('csticket')
    csticket2 = request.session.get('csticket')
    all_rooms = []
    all_events = []

    if (csticket is not None and csticket != ''):
        all_rooms = Room.objects.filter(floor=1)
        all_events = Event.objects.all()
        request.session['csticket'] = csticket
        is_logged_uom = True

    if (csticket2 is not None and csticket2 != ''):
        all_rooms = Room.objects.filter(floor=1)
        all_events = Event.objects.all()
        is_logged_uom = True

    table = [[[None] for i in range(5)] for j in range(len(times))]

    for j in range(0, range_times):
        row = table[j]
        row.append([times[j]])
        for i in range(0, 5):
            for event in all_events:
                if (times[j] >= event.time and times[j] <= event.end_time
                        and event.start_date >= monday and friday >= event.start_date and event.start_date.weekday() == i):
                    table[j][i].append(event)

    return render(request, 'floors/half_floor.html',
                  {'all_rooms': all_rooms, 'all_events': all_events, 'table': table
                   , 'times': times, 'is_logged_uom' : is_logged_uom})

def FF(request):
    my_date = datetime.datetime.today()
    day = my_date.weekday()

    # Monday
    Previous_Date = datetime.datetime.today() - datetime.timedelta(days=day)
    monday = Previous_Date.date()

    # Friday
    Next_Date = Previous_Date + datetime.timedelta(days=4)
    friday = Next_Date.date()

    start_time = datetime.time(9, 0)  # Start time is 9:00 AM
    end_time = datetime.time(18, 0)  # End time is 5:00 PM
    delta = datetime.timedelta(minutes=60)  # Time step is 30 minutes

    times = []
    time = datetime.datetime.combine(datetime.date.today(), start_time)
    while time.time() <= end_time:
        times.append(time.time())
        time += delta

    range_times = len(times)

    is_logged_uom = False

    csticket = request.GET.get('csticket')
    csticket2 = request.session.get('csticket')
    all_rooms = []
    all_events = []

    if (csticket is not None and csticket != ''):
        all_rooms = Room.objects.filter(floor=2)
        all_events = Event.objects.all()
        request.session['csticket'] = csticket
        is_logged_uom = True

    if (csticket2 is not None and csticket2 != ''):
        all_rooms = Room.objects.filter(floor=2)
        all_events = Event.objects.all()
        is_logged_uom = True

    table = [[[None] for i in range(5)] for j in range(len(times))]

    for j in range(0, range_times):
        row = table[j]
        row.append([times[j]])
        for i in range(0, 5):
            for event in all_events:
                if (times[j] >= event.time and times[j] <= event.end_time
                        and event.start_date >= monday and friday >= event.start_date and event.start_date.weekday() == i):
                    table[j][i].append(event)

    return render(request, 'floors/first_floor.html',
                  {'all_rooms': all_rooms, 'all_events': all_events, 'table': table
                   , 'times': times, 'is_logged_uom' : is_logged_uom})

def SF(request):
    my_date = datetime.datetime.today()
    day = my_date.weekday()

    # Monday
    Previous_Date = datetime.datetime.today() - datetime.timedelta(days=day)
    monday = Previous_Date.date()

    # Friday
    Next_Date = Previous_Date + datetime.timedelta(days=4)
    friday = Next_Date.date()

    start_time = datetime.time(9, 0)  # Start time is 9:00 AM
    end_time = datetime.time(18, 0)  # End time is 5:00 PM
    delta = datetime.timedelta(minutes=60)  # Time step is 30 minutes

    times = []
    time = datetime.datetime.combine(datetime.date.today(), start_time)
    while time.time() <= end_time:
        times.append(time.time())
        time += delta

    range_times = len(times)

    is_logged_uom = False

    csticket = request.GET.get('csticket')
    csticket2 = request.session.get('csticket')
    all_rooms = []
    all_events = []

    if (csticket is not None and csticket != ''):
        all_rooms = Room.objects.filter(floor=3)
        all_events = Event.objects.all()
        request.session['csticket'] = csticket
        is_logged_uom = True

    if (csticket2 is not None and csticket2 != ''):
        all_rooms = Room.objects.filter(floor=3)
        all_events = Event.objects.all()
        is_logged_uom = True

    table = [[[None] for i in range(5)] for j in range(len(times))]

    for j in range(0, range_times):
        row = table[j]
        row.append([times[j]])
        for i in range(0, 5):
            for event in all_events:
                if (times[j] >= event.time and times[j] <= event.end_time
                        and event.start_date >= monday and friday >= event.start_date and event.start_date.weekday() == i):
                    table[j][i].append(event)

    return render(request, 'floors/second_floor.html',
                  {'all_rooms': all_rooms, 'all_events': all_events, 'table': table
                   , 'times': times, 'is_logged_uom' : is_logged_uom}) 

def logoutuser(request):
    logout(request)
    return redirect('index')

import nltk
from fuzzywuzzy import fuzz

import nltk
from django.db.models import Q

def search_rooms_and_events(query, mode='fuzzy'):
    # Tokenize the query
    tokens = nltk.word_tokenize(query.lower())

    # Initialize lists to store matched rooms and matched events
    matched_rooms = []
    matched_events = []
    matched_offices = []
     
    if mode == 'exact':
        # Perform exact match search
        q_rooms = Q()
        for token in tokens:
            q_rooms |= Q(title__iexact=token) | Q(description__iexact=token) | Q(room_type__iexact=token)
        matched_rooms = Room.objects.filter(q_rooms)

        q_events = Q()
        for token in tokens:
            q_events |= Q(name__iexact=token) | Q(description__iexact=token) | Q(type_of_event__iexact=token) | Q(presenter__iexact=token) | Q(room__title__iexact=token)
        matched_events = Event.objects.filter(q_events)

        q_offices = Q()
        for token in tokens:
            q_offices |= Q(lecturer__iexact=token) | Q(room__title__iexact=token)
        matched_offices = Office.objects.filter(q_offices)

    else:
        # Perform fuzzy search
        # Loop through all Room instances and fields
        for room in Room.objects.all():
            for field in ['title', 'description', 'room_type']:
                value = str(getattr(room, field)).lower()
                for token in tokens:
                    distance = fuzz.ratio(token, value)
                    if distance >= 40:
                        matched_rooms.append(room)
                        break

        # Loop through all Event instances and fields
        for event in Event.objects.all():
            for field in ['name', 'description', 'type_of_event', 'presenter' , 'room']:
                if field == 'room':
                    value = str(getattr(getattr(event, field), 'title', '')).lower()
                else:
                    value = str(getattr(event, field)).lower()
                for token in tokens:
                    distance = fuzz.ratio(token, value)
                    if distance >= 40:
                        matched_events.append(event)
                        break

        # Loop through all Office instances and fields
        for office in Office.objects.all():
            for field in ['lecturer', 'room']:
                if field == 'room':
                    value = str(getattr(getattr(office, field), 'title', '')).lower()
                else:
                    value = str(getattr(office, field)).lower()
                for token in tokens:
                    distance = fuzz.ratio(token, value)
                    if distance >= 40:
                        matched_offices.append(office)
                        break

    # Return a dictionary containing the query and matched rooms and events
    context = {
        'query': query,
        'rooms': matched_rooms,
        'events': matched_events,
        'offices': matched_offices
    }
    return context

from django.http import JsonResponse

def search(request):
    query = request.GET.get('q')
    mode = request.GET.get('mode')

    if(mode != None):
        request.session['mode_last'] = mode
    
    if(mode == None):
        try:
            mode = request.session['mode_last']
        except:
            request.session['mode_last'] = "fuzzy"

    if query:
        if mode == 'exact':
            context = search_rooms_and_events(query, mode='exact')
        else:
            context = search_rooms_and_events(query)

        if request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest':
            # If the request is AJAX, return a JSON response
            data = {
                'query': query,
                'rooms': list(context['rooms'].values()),
                'events': list(context['events'].values()),
                'offices': list(context['offices'].values())
            }
            return JsonResponse(data)
        else:
            # If the request is not AJAX, return a HTML response
            return render(request, 'floors/search.html', context)
    else:
        return render(request, 'floors/search.html')


def information(request):

    is_logged_uom = False

    csticket = request.GET.get('csticket')
    csticket2 = request.session.get('csticket')


    if (csticket is not None and csticket != ''):
        request.session['csticket'] = csticket
        is_logged_uom = True

    if (csticket2 is not None and csticket2 != ''):
        is_logged_uom = True

    return render(request, 'floors/information.html', {'is_logged_uom' : is_logged_uom})

