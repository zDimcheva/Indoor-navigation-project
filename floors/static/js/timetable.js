var data;
var events;
var rooms;
var tableHight;
var tableWidth;

window.onload = (function(onload) {
    return function(event) {
      onload && onload(event);

      const timetable = document.getElementsByClassName("timetable")[0];
      const timetableModal = document.getElementsByClassName("modal");

      tableHight = timetable.clientHeight;
      tableWidth = timetable.clientWidth;
      loadDoc();
    }
}(window.onload))


function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        events = JSON.parse(data.all_events).map(x=>x.fields);
        console.log(events);
        rooms = JSON.parse(data.all_rooms).map(x=>x.fields);
      }
    };
    xhttp.open("GET", "http://127.0.0.1:8000/timetable", true);
    xhttp.send();
}


function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}
  

function show_info(room){
    console.log(events)
    const timetable = document.getElementById("timetable-"+room);
    const width = tableHight;
    const height = tableWidth;

    const cell_height = 35.2;
    const cell_width = 135.767;

    for(let i = 0; i < events.length; i++){
      
        if(events[i].room == room){

            const x_index = Math.ceil(((+new Date(events[i].start_date)) - +getMonday(new Date()))/(24*60*60*1000));

            if(x_index>5 || x_index < 0 ){
                continue;
            }
            const y_index = ((+new Date(events[i].start_date+" "+events[i].time))-+new Date(events[i].start_date).setHours(9))/(60*60*1000);
            var dy_index = ((+new Date(events[i].start_date+" "+events[i].end_time))-+new Date(events[i].start_date).setHours(9) )/(60*60*1000);

            if(y_index>9) continue;
            if(dy_index>=10) dy_index=10;

            const element = document.createElement("div");
            element.innerText=events[i].name;
            element.style.position="absolute";
            element.style.top=Math.round((y_index+1)*cell_height).toString()+"px";
            element.style.left=((x_index+1)*cell_width).toString()+"px";
            element.style.width=cell_width.toString()+"px";
            element.style.height=Math.round((dy_index-y_index)*cell_height).toString()+"px";
            element.classList.add("event");
            timetable.appendChild(element);
        }
    }
}

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('input', event => {
    event.preventDefault();
    const query = document.querySelector('#search-form input[name="q"]').value;
    fetch(`/search?q=${encodeURIComponent(query)}`)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');
        const roomList = newDocument.querySelector('#room-list').innerHTML;
        const eventList = newDocument.querySelector('#event-list').innerHTML;
        const officeList = newDocument.querySelector('#office-list').innerHTML;

        document.querySelector('#room-list').innerHTML = roomList;
        document.querySelector('#event-list').innerHTML = eventList;
        document.querySelector('#office-list').innerHTML = officeList;
      });
  });

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const query = document.querySelector('#search-form input[name="q"]').value;
  fetch(`/search?q=${encodeURIComponent(query)}`)
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const newDocument = parser.parseFromString(html, 'text/html');
      const roomList = newDocument.querySelector('#room-list').innerHTML;
      const eventList = newDocument.querySelector('#event-list').innerHTML;
      const officeList = newDocument.querySelector('#office-list').innerHTML;

      document.querySelector('#room-list').innerHTML = roomList;
      document.querySelector('#event-list').innerHTML = eventList;
      document.querySelector('#office-list').innerHTML = officeList;
    });
});



