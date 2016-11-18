console.log("start");
//declaring namspace:
  var yoh = {};
//declaring map;
  var map;
//creating array to hold yelp markers;
  var yelp = [];
//defining bounding box of all locations;
  var bounds;
//creating info window;
  var infoIindow = new google.maps.InfoWindow();
//need to trace function for debugging:
function trace(message) {
  if (typeof console != 'undefined') {
    console.log(message);
  }

}
//need to toggel array layers on/off
yoh.toggleArrayLayer = function(arraylayer) {
  if (arraylayer) {
    for (i in arraylayer) {
      if (arraylayer[i].getVisible() == true) {
        arraylayer[i].setMap(null);
        arraylayer[i].visible = false;
      } else {
        arraylayer[i].setMap(null);
        arraylayer[i].visible = true;
        console.log("28");
      }
    }
  }
}
//next function is used to create yelp marker
yoh.createYelpMarker = function(i, latitude, longitude,title, infowindowcontent) {
  var markerLatLng = new google.maps.LatLng(latitude,longitude);
  console.log("36");
  bounds.extend(markerLatLng);
  map.fitBounds(bounds);
  yelp[i] = new google.map.Marker({
    position: markerLatLng,
    title: title,
    //icon = 'assets/images/yelp-2c.png'
  });
  //adding an onclick event
  google.maps.event.addlistener(yelp[i], 'click', function() {
    infowindow.setContent(infowindowcontent);
    infowindow.open(map,yelp[i]);
  });
}
//function to get data from yelp;
yoh.getYelp = function(term) {
  bounds = new google.mapslatLngBounds();
  $.getJSON('http://api.yelp.com/business_review_search?lat='+map.getCenter().lat()+'&long='+map.getCenter().lng()+'&limit=20&ywsid=i_l5qNU0aUnpX3YNM4hBgQHR9oM5oZrw&term='+term+'&callback=?',
                function(data) {
                  $.each(data.buisnesses, function(i,item) {
                    trace(item);
                    infowindowcontent = '<strong>'+item.name+'</strong><br>';
                    infowindowcontent += '<img src="'+item.photo_url+'"><br>';
                    infowindowcontent += '<a href="'+item.url+'" target="_blank">see it on yelp</a>';

                    yoh.createYelpMarker(i,item.latitude, item, longitude,item.name, infowindowcontent);
                });
              }
            );
          }
        //function that should be called when the document loads
        yoh.initialize = function()  {
        function writeAddressName(latLng) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
          "location": latLng
        },
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK)
            document.getElementById("address").innerHTML = results[0].formatted_address;
          else
            document.getElementById("error").innerHTML += "Unable to retrieve your address" + "<br />";
        });
      }

      function geolocationSuccess(position) {
        var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        // Write the formatted address
        writeAddressName(userLatLng);

        var myOptions = {
          zoom : 16,
          center : userLatLng,
          mapTypeId : google.maps.MapTypeId.ROADMAP
        };
        // Draw the map
        var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
        // Place the marker
        new google.maps.Marker({
          map: mapObject,
          position: userLatLng,
        });
        // Draw a circle around the user position to have an idea of the current localization accuracy
        var circle = new google.maps.Circle({
          center: userLatLng,
          radius: position.coords.accuracy,
          map: mapObject,
          fillColor: '#0000FF',
          fillOpacity: 0.5,
          strokeColor: '#0000FF',
          strokeOpacity: 1.0
        });
        mapObject.fitBounds(circle.getBounds());
      }

      function geolocationError(positionError) {
        document.getElementById("error").innerHTML += "Error: " + positionError.message + "<br />";
      }

      function geolocateUser() {
        // If the browser supports the Geolocation API
        if (navigator.geolocation)
        {
          var positionOptions = {
            enableHighAccuracy: true,
            timeout: 10 * 1000 // 10 seconds
          };
          navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
        }
        else
          document.getElementById("error").innerHTML += "Your browser doesn't support the Geolocation API";
      }
    }
      window.onload = geolocateUser;
      //sample call for data
      yoh.getYelp('cafe');
