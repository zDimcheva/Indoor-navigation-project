from django import template

register = template.Library()

# @register.filter(name='inEvent')
def inEvent(events, room=""):
    # print(events)
    # print(room)
    for event in events:
        if event is None:
            continue
        if event.room == room:
            return True
    return False

register.filter("inEvent", inEvent)
