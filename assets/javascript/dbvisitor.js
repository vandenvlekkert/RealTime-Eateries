var config = {
    apiKey: "AIzaSyBpQl8wSESvif9OYHV7lbr6wvqegikQc4Y",
    authDomain: "realtime-eaterie-1478752187177.firebaseapp.com",
    databaseURL: "https://realtime-eaterie-1478752187177.firebaseio.com",
    storageBucket: "realtime-eaterie-1478752187177.appspot.com",
    messagingSenderId: "526255042597"
  };
  firebase.initializeApp(config);

  var analytics = new Firebase ('https://realtime-eaterie-1478752187177.firebaseio.com');
  var activeUser = analytics.child('activeUser');
    activeVisitors.push({
      path: window.location.pathname,
      arrivedAt: Firebase.ServerValue.TIMESTAMP,
      userAgent: navigator.userAgent
    });

      /**
      * Data object to be written to Firebase.
      */
      var data = {
        sender: null,
        timestamp: null,
        lat: null,
        lng: null
      };

      var totalVisitor = analytics.child('totalVisitor');
        totalVisitor.once('value', function(snapshot) {
          totalVisitor.set(snapshot.val()+1);
        });

        var totalVisitors = analytics.child('totalVisitors');
          totalVisitors.transaction(function (currentData) {
            return currentData + 1;
});

      var visitor = {
          path: window.location.pathname,
          arrivedAt: Firebase.ServerValue.TIMESTAMP,
          userAgent: navigator.userAgent
};

    var activeVisitorRef = activeVisitors.push(visitor, function () {
        activeVisitors.child(visitorId).once('value', function (snapshot) {
        visitor.arrivedAt = snapshot.child('arrivedAt').val();
    var pastVisitors = analytics.child('pastVisitors');
      visitor.leftAt = Firebase.ServerValue.TIMESTAMP;
      pastVisitors.child(visitorId).onDisconnect().set(visitor);
    });
});

    var visitorId = activeVisitorRef.name();

      activeVisitorRef.onDisconnect().remove();

      $(document).on('ready', function () {
    var $totalVisitors = $('#total-visitors');
      analytics.child('totalVisitors').on('value', function (snapshot) {
        $totalVisitors.text(snapshot.val());
  });
});
    var $activeVisitors = $('#active-visitors');
    var activeVisitors = analytics.child('activeVisitors');
      activeVisitors.on('child_added', function (snapshot) {
        var n = snapshot.name();
        var v = snapshot.val();
        $activeVisitors.prepend(
          '<li id="active-visitor' + n + '">' + n + ':' +
          '<ul>' +
          '<li>Arrived: ' + new Date(v.arrivedAt) + '</li>' +
          '<li>Path: ' + v.path + '</li>' +
          '<li>User Agent: ' + v.userAgent + '</li>' +
          '</ul>' +
          '</li>'
);
});
    var pastVisitors = analytics.child('pastVisitors');
      pastVisitors.on('child_added', function (snapshot) {
    var n = snapshot.name();
    var v = snapshot.val();
    $pastVisitors.prepend(
      '<li id="past-visitor' + n + '">' + n + ':' +
      '<ul>' +
      '<li>Arrived: ' + new Date(v.arrivedAt) + '</li>' +
      '<li>Left: ' + new Date(v.leftAt) + '</li>' +
      '<li>Spent: ' + ((v.leftAt - v.arrivedAt) / 1000) + ' Seconds </li>' +
      '<li>Path: ' + v.path + '</li>' +
      '<li>User Agent: ' + v.userAgent + '</li>' +
      '</ul>' +
      '</li>'
);
});

    activeVisitors.on('child_removed', function (snapshot) {
      $('#active-visitor' + snapshot.name()).remove();
    });

    var pastVisitors = analytics.child('pastVisitors').endAt().limit(3);
      pastVisitors.on('child_added', function (snapshot) {
 // ...
});

      pastVisitors.on('child_removed', function (snapshot) {
    $('#past-visitor' + snapshot.name()).remove();
  });


      
