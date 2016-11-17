
var limit;
// about DB
  var config = {
    apiKey: "AIzaSyC25IkA7UWE_UBDLuXr2_wXtkGKF-wRQbM",
    authDomain: "realtimeeateries.firebaseapp.com",
    databaseURL: "https://realtimeeateries.firebaseio.com",
    storageBucket: "realtimeeateries.appspot.com",
    messagingSenderId: "551288616539"
  };
  firebase.initializeApp(config);
    var database= firebase.database();

   var waitingTimeInLine = {};
//Pushing to the DB
function AddtoDB() {
        waitingTimeInLine = {
       timeInMin: $(this).attr("value"),
       thisId: $(this).attr("id")
                               };
       database.ref().push(waitingTimeInLine);
       console.log(waitingTimeInLine);
    $("#lineTime"+waitingTimeInLine.thisId).text("The line here is " +waitingTimeInLine.timeInMin + " minutes long");

                   };



// End of db
   
            function cb(data) { 
            for (i=0; i<limit; i++)   {                           
        var newDivAll = $("<div class = 'bigDiv' id='all_"+i+"'>" +"<br>");
        var currentLine = $("<div id='line_"+i+"'>" );
        var newDivTime = $("<div  id='time_"+i+"'>" );
             

        var waitingTime = $('<p  />',
    {   
        id: "lineTime"+i,
        
    });

        var button0 = $('<button  />',
    {   text: 'No line',
        class: 'line',
        id: i,
        value: 0
    });
        var button10 = $('<button  />',
    {   text: '10 minutes line',
        class: 'line',
        id: i,
        value:10
    });

        var button20 = $('<button  />',
    {   text: '20+ minutes in line',
        class: 'line',
        id: i,
        value: 20
    });

        $('.restaurants').append(newDivAll);
        $("#all_"+i).append(JSON.stringify(data.businesses[i].name)+"<br>"
                               );
         $("#all_"+i).append(newDivTime);
        $("#time_"+i).append(currentLine);
      $("#line_"+i).html(waitingTime);
        $("#time_"+i).append(button0, button10, button20);
                }
                database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val());
            var lineDB = childSnapshot.val().timeInMin;
            console.log("#lineTime"+childSnapshot.val().thisId);
          $("#lineTime"+childSnapshot.val().thisId).text("The line here is " +lineDB + " minutes long");


        });
   
                        ;}



function SearchRes() {
                console.log("hey");
                var auth = {
                    consumerKey : "Am-C5I2OXXdpHG-ulB00fQ",
                    consumerSecret : "aBZF5cAZ--yFIIdvJEOBAlo-vNM",
                    accessToken : "i_l5qNU0aUnpX3YNM4hBgQHR9oM5oZrw",
                    accessTokenSecret : "ipbpmBatoFAR6hczIFzXLcbocYU",
                    serviceProvider : {
                        signatureMethod : "HMAC-SHA1"
                    }
                };
        
                var terms = 'restaurants';
                var near = $("#search").val();

                 limit = 10;
        
                var accessor = {
                    consumerSecret : auth.consumerSecret,
                    tokenSecret : auth.accessTokenSecret
                };

                var parameters = [];
                parameters.push(['term', terms]); //restaurants
                parameters.push(['location', near]); //Los Angeles
                parameters.push(['callback', 'cb']);
                parameters.push(['limit', limit]);
                parameters.push(['oauth_consumer_key', auth.consumerKey]);
                parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
                parameters.push(['oauth_token', auth.accessToken]);
                parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
        
                var message = {
                    'action' : 'https://api.yelp.com/v2/search',
                    'method' : 'GET',
                    'parameters' : parameters
                };
        
                OAuth.setTimestampAndNonce(message);
                OAuth.SignatureMethod.sign(message, accessor);
        
                var parameterMap = OAuth.getParameterMap(message.parameters);
                    
                $.ajax({
                    'url' : message.action,
                    'data' : parameterMap,
                    'dataType' : 'jsonp',
                    'jsonpCallback' : 'cb',
                    'cache': true
                })
         };
         function clear() {
            $(".restaurants").empty();
         }
         $(document).on('click', '.forSearch' , clear);
         $(document).on('click', '.forSearch' , SearchRes);
         $(document).on('click', '.line' , AddtoDB);
     