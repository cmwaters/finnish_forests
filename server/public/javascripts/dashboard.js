

var map;
var marker = [];
var directionsService;
var active_route = null;
var clickedNode = false;

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

function putMarker(value, index, array) {
    var marker = new google.maps.Marker({position: value, map: map});

    marker.addListener('click', function() {
        alert(marker.getPosition());
    });
}

function calcRoute(route, id) {

    var directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});

    directionsRenderer.setMap(map);

    var start = route.coordinates[0];
    var end = route.coordinates[1];
    var request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING'
    };
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
}

function initMap() {

    directionsService = new google.maps.DirectionsService();

    var center = {lat: 60.277593, lng: 24.593690};
    var map_container = document.getElementById('map_container');
    map = new google.maps.Map(map_container, {zoom: 12, center: center, controlSize: 24});


    //counters.forEach(putMarker);

    for (let i = 0; i < JSONroutes.length; i++) {
        calcRoute(JSONroutes[i], i);
    }

    let new_height = $(window).height() - $('.navbar').outerHeight();
    $('#map_container').height(new_height);


}

function showRoute(route) {
    clickedNode = true;
    if (active_route !== null && active_route !== route._id) {
        $("#" + active_route).fadeOut();
    }
    $("#" + route._id).fadeIn();
    active_route = route._id;
    // let box = document.getElementById(route._id);
    // box.css("display": "block");
}

$(window).click(function() {
    setTimeout(function () {
        if (active_route !== null && !clickedNode) {
            $("#" + active_route).fadeOut();
            active_route = null;
        } else {
            clickedNode = false;
        }
    }, 200)
});

