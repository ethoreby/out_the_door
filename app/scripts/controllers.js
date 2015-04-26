angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaGeolocation, $ionicPlatform) {
  // Form data for the login modal
  $scope.loginData = {};
            $scope.setInitDistance = function() {
                var posOptions = {timeout: 10000, enableHighAccuracy: true};
                $cordovaGeolocation
                    .getCurrentPosition(posOptions)
                    .then(function (position) {
                        var lat  = position.coords.latitude
                        var long = position.coords.longitude
                        $scope.oldLat = lat;
                        $scope.oldLong = long;
                        console.log('yo',lat, long)
                    }, function(err) {
                        console.log(err)
                        // error
                    });
            };

        $scope.setNewDistance = function() {
            var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    var lat  = position.coords.latitude
                    var long = position.coords.longitude
                    $scope.lat = lat;
                    $scope.long = long;
                    console.log('yo',lat, long)
                }, function(err) {
                    console.log(err)
                    // error
                });
        };

        $scope.getDistanceChange = function() {
            $scope.distanceChange = getDistance($scope.oldLat, $scope.oldLong, $scope.lat, $scope.long);
        };


        var getDistance = function(lat1, lon1, lat2, lon2) {
            var toRad = function(num) {
                return num * Math.PI / 180;
            }

            var R = 6371; // km
//has a problem with the .toRad() method below.
            var x1 = lat2-lat1;
            var dLat = toRad(x1);
            var x2 = lon2-lon1;
            var dLon = toRad(x2);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;

            return d/1.60934;
        };



        var watchOptions = {
            frequency : 10000,
            timeout : 30000,
            enableHighAccuracy: true // may cause errors if true
        };

      //  var watch = $cordovaGeolocation.watchPosition(watchOptions);
//        watch.then(
//            null,
//            function(err) {
//                console.log(err)
//                // error
//            },
//            function(position) {
//                var lat  = position.coords.latitude
//                var long = position.coords.longitude
//                $scope.lat = lat;
//                $scope.long = long;
//                $scope.distance = getDistance(37.33233141, -122.0312186, $scope.lat, $scope.long);
//                console.log(lat, long)
//            });


        // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

  $scope.alarms = [
    {
      title: 'Work',
      id: 0,
      message: 'wake up',
      wakeupTime: null
    },
    {
      title: 'Gym Day',
      id: 1,
      message: 'wake the f**k up',
      wakeupTime: null
    }
  ];
})

.controller('AlarmsCtrl', function($scope, $state, $cordovaLocalNotification) {

  // $scope.addAlarm = function() {
  //     var alarmTime = new Date();
  //     alarmTime.setMinutes(alarmTime.getMinutes() + 1);
  //     $cordovaLocalNotification.add({
  //         id: "1234",
  //         date: alarmTime,
  //         message: "This is a message",
  //         title: "This is a title",
  //         autoCancel: true,
  //         sound: null
  //     }).then(function () {
  //         console.log("The notification has been set");
  //     });
  // };

  $scope.activateAlarm = function(alarm) {
    if(alarm.active) {
      var time = new Date();
      time.setMinutes(time.getMinutes() + 1);
      $cordovaLocalNotification.add({
          id: "1234",
          date: time,
          message: "This is a message",
          title: "This is a title",
          autoCancel: true,
          sound: null
      }).then(function () {
          console.log("The notification has been set");
      });

      // window.plugin.notification.local.add("asfdsadfsda")
    }
  }

  $scope.createNewAlarm = function() {
    var id = $scope.alarms.length;
    var alarmTemplate = { title: 'New Alarm', id: id, message: 'message' }
    $scope.alarms.push(alarmTemplate);
    $state.go('app.edit', { playlistId: id });
  }
})

.controller('AlarmEditorCtrl', function($scope, $state, $stateParams, $location, $window) {
  var id = $stateParams.id || 0;
  $scope.currentAlarm = $scope.alarms[id]
  $scope.saveAlarm = function() {
    $scope.alarms[id] = $scope.currentAlarm;

    //    none of these work for some reason
    // $state.go('app.alarms');
    // $location.path('#/app/alarms/');
    // $window.location.url = '#/app/alarms/';
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
