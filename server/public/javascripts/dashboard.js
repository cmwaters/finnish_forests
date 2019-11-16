var map;
var directionsService;
var directctionsRender;

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

function calcRoute() {
    var start = counters[0];
    var end = counters[1];
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
            alert(marker1.getPosition());
        });

        marker2.addListener('click', function() {
            alert(marker2.getPosition());
        });

    });
}

function initMap() {

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});

    var center = {lat: 60.277593, lng: 24.593690};
    var map_container = document.getElementById('map_container');
    map = new google.maps.Map(map_container, {zoom: 12, center: center, controlSize: 32});

    directionsRenderer.setMap(map);

    //counters.forEach(putMarker);

    calcRoute();

    /*
    let new_height = $(window).height() - $('.navbar').height();
    $('#map_container').height(new_height);

    alert($(window).height());
    alert($('#map_container').height());
    */

}
