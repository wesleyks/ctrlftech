$('#room-search-form').submit(function(){
    $.mobile.showPageLoadingMsg();
    var room = $('input#room').val();
    room = room.replace(/\s+/g, '');
    var type = $('input#type').val();
    if(!RoomExists(room)) alert('Room not found.');
    else $.mobile.changePage('map.html?type=find&room='+encodeURIComponent(room),{transition:'slide'});
    $.mobile.hidePageLoadingMsg();
    return false;
});

function RoomExists(room)
{
    var request;
    var rooms;
    request = new XMLHttpRequest();
    request.open("GET","coords.xml",false);
    request.send();
    var doc = request.responseXML;
    rooms = doc.getElementsByTagName("row");
    for (var i=0; i<rooms.length; i++){
        var roomName = rooms[i].childNodes[1].textContent;
        if (roomName.toLowerCase().indexOf(room.toLowerCase()) != -1){
            var floor = rooms[i].childNodes[3].textContent;
            var x = rooms[i].childNodes[5].textContent;
            var y = rooms[i].childNodes[7].textContent;
            return true;
        }
    }
    return false
}