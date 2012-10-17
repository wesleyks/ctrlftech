/////////////////////////////////////men's restrooms////////////////////////
var mpinList = new Array();
mpinList[0] = new Array();
mpinList[1] = new Array();
mpinList[2] = new Array();
mpinList[3] = new Array();
mpinList[4] = new Array();
    mpinList[0].push(new Point(123,95));
mpinList[0].push(new Point(377,92));
mpinList[0].push(new Point(152,221));
mpinList[0].push(new Point(315,309));
mpinList[0].push(new Point(130,325));
mpinList[0].push(new Point(364,325));
    mpinList[1].push(new Point(121,77));
mpinList[1].push(new Point(385,75));
mpinList[1].push(new Point(174,201));
mpinList[1].push(new Point(211,293));
mpinList[1].push(new Point(133,423));
mpinList[1].push(new Point(370,421));
    mpinList[2].push(new Point(121,73));
mpinList[2].push(new Point(384,72));
mpinList[2].push(new Point(168,194));
mpinList[2].push(new Point(162,283));
    mpinList[3].push(new Point(103,70));
mpinList[3].push(new Point(388,69));
mpinList[3].push(new Point(158,188));
    mpinList[4].push(new Point(192,216));
mpinList[4].push(new Point(191,310));
/////////////////////////////////////////women's restrooms////////////////////////////
var wpinList = new Array();
wpinList[0] = new Array();
wpinList[1] = new Array();
wpinList[2] = new Array();
wpinList[3] = new Array();
wpinList[4] = new Array();
    wpinList[0].push(new Point(139,118));
wpinList[0].push(new Point(361,116));
wpinList[0].push(new Point(295,234));
wpinList[0].push(new Point(338,216));
wpinList[0].push(new Point(179,312));
wpinList[0].push(new Point(361,421));
    wpinList[1].push(new Point(139,90));
wpinList[1].push(new Point(204,200));
wpinList[1].push(new Point(311,200));
wpinList[1].push(new Point(340,200));
wpinList[1].push(new Point(305,293));
wpinList[1].push(new Point(367,77));
    wpinList[2].push(new Point(371,76));
wpinList[2].push(new Point(353,192));
wpinList[2].push(new Point(170,291));
wpinList[2].push(new Point(119,411));
wpinList[2].push(new Point(372,416));
    wpinList[3].push(new Point(129,82));
wpinList[3].push(new Point(149,160));
wpinList[3].push(new Point(151,275));
wpinList[3].push(new Point(365,73));
wpinList[3].push(new Point(338,189));
    wpinList[4].push(new Point(202,214));
wpinList[4].push(new Point(320,311));
//////////////////////////////////////////study spaces//////////////////////
var spinList = new Array();
spinList[0] = new Array();
spinList[1] = new Array();
spinList[2] = new Array();
spinList[3] = new Array();
spinList[4] = new Array();
    spinList[0].push(new Point(157,186,"MG28"));
spinList[0].push(new Point(187,332,"LG76"));
spinList[0].push(new Point(210,332,"LG72"));
spinList[0].push(new Point(236,332,"LG68"));
spinList[0].push(new Point(264,332,"LG66"));
spinList[0].push(new Point(287,332,"LG62"));
spinList[0].push(new Point(310,332,"LG52"));
    spinList[1].push(new Point(164,166,"M128"));
spinList[1].push(new Point(281,173,"M152"));
spinList[1].push(new Point(310,170,"M164"));
spinList[1].push(new Point(333,166,"M166"));
spinList[1].push(new Point(348,169,"M167"));
spinList[1].push(new Point(141,213,"M120"));
spinList[1].push(new Point(164,326,"A110"));
spinList[1].push(new Point(200,326,"L170"));
spinList[1].push(new Point(222,326,"L168"));
spinList[1].push(new Point(291,326,"L160"));
spinList[1].push(new Point(310,326,"L158"));
    spinList[2].push(new Point(320,244,"L211"));
spinList[2].push(new Point(349,242,"L221"));
spinList[2].push(new Point(310,292,"L251"));
    spinList[3].push(new Point(230,192,"M345"));
spinList[3].push(new Point(253,192,"M349"));
spinList[3].push(new Point(225,287,"L361"));

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

var isIE = document.all?true:false;
function getMousePosition(e) {
    var _x;
    var _y;
    if (!isIE) {
        _x = e.pageX;
        _y = e.pageY;
    }
    if (isIE) {
        _x = event.clientX + document.body.scrollLeft;
        _y = event.clientY + document.body.scrollTop;
    }
    posX=_x;
    posY=_y;
    return new Point(posX,posY);
}

function getWheelDelta(e){
    var delta=e.detail? e.detail/(-3) : e.wheelDelta/(120);
    return delta;
}

function Point(x,y,name,floor) {
    this.x=x;
    this.y=y;
    this.name = name?name:'';
    this.floor = floor?floor:1;
}

function RoomInfo(room)
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
            return new Point(x,y,roomName,floor);
        }
    }
    return new Point(0,0,'',0);
}

function Map(elt) {
    this.canvas = elt;//document.getElementById("map_canvas");
    this.canvas.parent = this;
    this.context = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight-84;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.position = new Point(250,250);
    this.lastPosition = new Point(250,250);
    this.lastLength = 1.0;
    this.scale = 1.0;
    this.maxscale = 2.0;
    this.minscale = 0.6;
    this.currentfloor = 1;
    this.pinImg = new Image();
    this.pinList = new Array();
    this.mapImg = new Array();	//load the maps where everything will be overlaid on top of
    for(var i=0;i<5;i++)
    {
        this.pinList[i] = new Array();
        this.mapImg[i] = new Image();
        this.mapImg[i].src = "maps/f"+i+".png";
    }
    
    this.type = decodeURIComponent(getURLParameter('type'));
    if (this.type == 'null') this.type = 'map';
    if (this.type == 'find') {
        var room = decodeURIComponent(getURLParameter('room'));
        var pin = RoomInfo(room);
        this.pinList[pin.floor].push(pin);
        this.currentfloor = pin.floor;
        this.pinImg.src = "maps/pin.png";
    } else if (this.type == 'study') {
        this.pinList = spinList;
        this.pinImg.src = "maps/pin.png";
    } else if (this.type == 'restroom') {
        var gender = decodeURIComponent(getURLParameter('gender'));
        if (gender == 'male') {
            this.pinList = mpinList;
            this.pinImg.src = "maps/mpin.png";
        }
        else {
            this.pinList = wpinList;
            this.pinImg.src = "maps/wpin.png";
        }
    }

    this.drawMap = function () {
        this.context.fillStyle = '#FFF';
        this.context.fillRect(0,0,this.width,this.height);
        var img = this.mapImg[this.currentfloor];
        this.context.drawImage(img,this.width/2-this.position.x*this.scale,this.height/2-this.position.y*this.scale,img.width*this.scale,img.height*this.scale);
        for (i=0;i<this.pinList[this.currentfloor].length;i++){
            this.context.drawImage(this.pinImg,this.width/2-(this.position.x-this.pinList[this.currentfloor][i].x)*this.scale-15,this.height/2-(this.position.y-this.pinList[this.currentfloor][i].y)*this.scale-40,30,40);
            this.context.fillStyle="#195ca1";
            this.context.strokeStyle = "#dddddd";
            this.context.font = "bold 18px sans-serif";
            this.context.fillText(this.pinList[this.currentfloor][i].name ,this.width/2-(this.position.x-this.pinList[this.currentfloor][i].x)*this.scale-15,this.height/2-(this.position.y-this.pinList[this.currentfloor][i].y)*this.scale+22);
            this.context.font = "bold 18px sans-serif";
            this.context.strokeText(this.pinList[this.currentfloor][i].name ,this.width/2-(this.position.x-this.pinList[this.currentfloor][i].x)*this.scale-15,this.height/2-(this.position.y-this.pinList[this.currentfloor][i].y)*this.scale+22);
        }
    };
    
    this.changescale = function (delta) {
        this.scale += delta;
        if(this.scale<this.minscale || this.scale>this.maxscale) this.scale -= delta;
        this.drawMap();
    }
    
    this.changepos = function (deltaPos) {
        this.position.x -= deltaPos.x/this.scale;
        this.position.y -= deltaPos.y/this.scale;
        if(this.position.x < 0 || this.position.x > 500 ||
           this.position.y < 0 || this.position.y > 500){
            this.position.x += deltaPos.x/this.scale;
            this.position.y += deltaPos.y/this.scale;
        }
        this.drawMap();
    }
    
    this.changeFloor= function(floor) {
        this.currentfloor = floor;
        this.drawMap();
    };
    
    // mouse events
    
    this.canvas.onmousedown = function(event){
        this.parent.lastPosition = getMousePosition(event);
        this.onmousemove = function(event){
            var currPos = getMousePosition(event);
            var prevPos = this.parent.lastPosition;
            this.parent.lastPosition = currPos;
            var deltaPos = new Point(currPos.x-prevPos.x,currPos.y-prevPos.y);
            this.parent.changepos(deltaPos);
        };
    };
    
    this.canvas.onmouseup = function(){this.onmousemove=null;};
    
    this.canvas.addEventListener('DOMMouseScroll', function(event){
        var delta = getWheelDelta(event)*0.2;
        this.parent.changescale(delta);
    },false);
    
    this.canvas.onmousewheel = function(event){
        var delta = getWheelDelta(event)*0.2;
        this.parent.changescale(delta);
    };
    
    // touch events
    
    this.canvas.ontouchstart = function(event) {
        if(event.touches.length==1){
            this.parent.lastPosition.x = event.touches[0].pageX;
            this.parent.lastPosition.y = event.touches[0].pageY;
            this.ontouchmove = function (event) {
                var currPos = new Point(event.touches[0].pageX,event.touches[0].pageY);
                var prevPos = this.parent.lastPosition;
                this.parent.lastPosition = currPos;
                var deltaPos = new Point(currPos.x-prevPos.x,currPos.y-prevPos.y);
                this.parent.changepos(deltaPos);
            };
        }
        else{
            var xdist = event.touches[0].pageX-event.touches[1].pageX;
            var ydist = event.touches[0].pageY-event.touches[1].pageY;
            this.parent.lastLength = Math.sqrt(xdist*xdist+ydist*ydist);
            this.ontouchmove = function (event) {
                var xdist = event.touches[0].pageX-event.touches[1].pageX;
                var ydist = event.touches[0].pageY-event.touches[1].pageY;
                var currLength = Math.sqrt(xdist*xdist+ydist*ydist);
                var prevLength = this.parent.lastLength;
                this.parent.lastLength = currLength;
                var deltaLength = currLength - prevLength;
                this.parent.changescale(deltaLength*.005);
            };
        }
    };
    
    this.mapImg[this.currentfloor].parent = this;
    this.mapImg[this.currentfloor].onload = function() {
        this.parent.drawMap();
    };
    this.pinImg.parent = this;
    this.pinImg.onload = function () {
        this.parent.drawMap()
    };
}