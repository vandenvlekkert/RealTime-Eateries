console.log("I'm here");

var limit;
function lineRecord(){
         waitingTime=$(this).attr("value");
            console.log(waitingTime); 
            var thisId = $(this).attr("id");
            console.log(thisId);
            $("#lineTime"+thisId).attr("text" , waitingTime);
            $("#lineTime"+thisId).text(waitingTime);
            myVar = setTimeout(backToNoData, 3000)
function backToNoData() {
                      $("#lineTime"+thisId).text("No Data");  
                                    }

        }
            function cb(data) { 
            for (i=0; i<limit; i++)   {  
                            
                               console.log("cb: " + JSON.stringify(data.businesses[i].name) +
                               " Rating: " + JSON.stringify(data.businesses[i].rating)+
                               " Address: " + JSON.stringify(data.businesses[i].location.display_address)
                                       );
                           
        var newDivAll = $("<div class = 'bigDiv' id='all_"+i+"'>" +"<br>");
        var waitingTime= "No Data";
        var currentLine = $("<div id='line_"+i+"'>" );
        var newDivTime = $("<div  id='time_"+i+"'>" );
        
        

        var waitingTime = $('<button  />',
    {
        text: waitingTime,
        id: "lineTime"+i,
        value: 10
       // click: function () { alert('hi'); }
    });

        var button0 = $('<button  />',
    {
        text: 'No line',
        class: 'line',
        id: i,
        value: 0
       // click: function () { waitingTime = 0 }
    });
        var button10 = $('<button  />',
    {
        text: '10 minutes line',
        class: 'line',
        id: i,
        value:10
      //  click: function () { waitingTime = 10 }
    });

        var button20 = $('<button  />',
    {
        text: '20+ minutes in line',
        class: 'line',
        id: i,
        value: 20
       // click: function () { alert('hi'); }
    });

    //     var newButton = $('<button  />',
    // {
    //     text: 'Comment',
    //     id: i,
    //    // click: function () { alert('hi'); }
    // });


        $('.restaurants').append(newDivAll);
        $("#all_"+i).append(JSON.stringify(data.businesses[i].name)+"<br>"
                               );
         $("#all_"+i).append(newDivTime);
        $("#time_"+i).append(currentLine);
        $("#line_"+i).append(waitingTime);
        $("#time_"+i).append(button0, button10, button20);
     //   $("#all_"+i).append(newButton);

                }


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
                //var near = 'Los+Angeles';
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
         $(document).on('click', '.line' , lineRecord);
                // .done(function(data, textStatus, jqXHR) {
                //         console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                //     }
                // )
                // .fail(function(jqXHR, textStatus, errorThrown) {
                //                     console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
                //         }
                // );
        