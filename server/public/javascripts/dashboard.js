

var map;
var marker = [];
var directionsService;
var active_route = null;

var routes = document.currentScript.getAttribute('routes');
var JSONroutes = JSON.parse(routes);
var start = JSONroutes[1].coordinates[0];
var end = JSONroutes[1].coordinates[1];


var counters = [
    {lat: 60.303525451006834, lng: 24.550391008969527},
    {lat: 60.27581963490531, lng: 24.463689284278516},
    {lat: 60.29819039594651, lng: 24.45628974906327},
    {lat: 60.2824219963335, lng: 24.505873789599413},
    {lat: 60.326924542956334, lng: 24.495358359272675},
    {lat: 60.33073081360451, lng: 24.492838046488888},
    {lat: 60.31295694299057, lng: 24.447281862291263},
    {lat: 60.24969716104745, lng: 24.698307563459544}
]

var toSet = false;
function showCounters(){

    Object.keys(markers).forEach(function(key) {
        console.log(key, markers[key]);
        markers[key].setVisible(toSet); 
    });

    toSet = !toSet;

}

var currentId = 0;
var uniqueId = function() {
    return ++currentId;
}

var currentZ = 0;
var uniqueZ = function() {
    return ++currentZ;
}


var markers = {};
var directions = {};

function putMarker(value, index, array) {
    
    var id = uniqueId(); // get new id

    var image = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    var marker = new google.maps.Marker({position: value, map: map, icon: image, id: id });
    
    markers[id] = marker;

    /*
    marker.addListener('click', function() {
        alert(marker.getPosition());
    });
    */
}

var colors = ['#6B5B95','#FEB236','#D64161','#FF7525']
var rt_idx = 1;

function calcRoute(route, id) {

    var color =  rt_idx % colors.length;
    //alert(color)


    var directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
        strokeColor: '#212529',
        strokeOpacity: 0.7,
        id: route._id
      }
    });

    rt_idx++;

    directionsRenderer.setMap(map);

    var rt_length = route.coordinates.length
    var start = route.coordinates[0];
    var end = route.coordinates[rt_length-1];

    var request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING'
    };

    if(rt_length > 2)
    {
        var waypts = [];

        for (i = 1; i < rt_length-1; i++) {

            waypts.push(
                {
                    location: route.coordinates[i],
                    stopover: false
                }
            )
        }

        request = {
            origin: start,
            destination: end,
            travelMode: 'WALKING',
            waypoints: waypts
        };
    }


    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }

        var marker1 = new google.maps.Marker({position: start, map: map});
        var marker2 = new google.maps.Marker({position: end, map: map});

        marker1.addListener('click', function() {
            showRoute(route);
        });

        marker2.addListener('click', function() {
            showRoute(route);
        });

    });
    directions[route._id] = directionsRenderer;
}

function initMap() {

    directionsService = new google.maps.DirectionsService();

    var center = {lat: 60.277593, lng: 24.593690};
    var map_container = document.getElementById('map_container');
    map = new google.maps.Map(map_container, {zoom: 12, center: center, controlSize: 24});


    counters.forEach(putMarker);

    for (let i = 0; i < JSONroutes.length; i++) {
        calcRoute(JSONroutes[i], i);
    }

    let new_height = $(window).height() - $('.navbar').outerHeight();
    $('#map_container').height(new_height);


}

function showRoute(route) {
    if(active_route !== null)
    {
        directions[active_route].setMap(null);
        directions[active_route].setOptions({
            polylineOptions: {
                strokeColor: '#212529'
            }
            });
        directions[active_route].setMap(map);
    }

        directions[route._id].setMap(null);
        directions[route._id].setOptions({
            polylineOptions: {
                strokeColor: '#DC143C',
                zIndex: uniqueZ()
            }
            });
        directions[route._id].setMap(map);

    if (active_route !== null && active_route !== route._id) {


        $("#" + active_route).animate({right: '-400px'});
        setTimeout(function () {
            $("#" + route._id).animate({right: '0px'});
            active_route = route._id;
        }, 500)

    } else {

        $('#map').animate({width: "-=400px"});
        $("#" + route._id).animate({right: '0px'});        
        
        active_route = route._id;
    }

}

$(".close_route").click(function() {
    $("#" + active_route).animate({right: '-400px'});

    directions[active_route].setMap(null);

    directions[active_route].setOptions({
          polylineOptions: {
            strokeColor: '#212529'
          }
        });
      
    directions[active_route].setMap(map);
    
    active_route = null;

});

