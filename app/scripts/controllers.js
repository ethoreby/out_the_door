angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaGeolocation, $ionicPlatform) {
  // Form data for the login modal
  $scope.loginData = {};
        console.log('here', $cordovaGeolocation)
        var posOptions = {timeout: 10000, enableHighAccuracy: false};
            $cordovaGeolocation
                .getCurrentPosition(posOptions)
                .then(function (position) {
                    console.log(position)
                    var lat  = position.coords.latitude
                    var long = position.coords.longitude
                }, function(err) {
                    console.log(err)
                    // error
                });

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
})

.controller('AlarmsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Work', id: 1 },
    { title: 'Gym Day', id: 2 }
  ];

  $scope.addAlarm = function() {
      var alarmTime = new Date();
      alarmTime.setMinutes(alarmTime.getMinutes() + 1);
      $cordovaLocalNotification.add({
          id: "1234",
          date: alarmTime,
          message: "This is a message",
          title: "This is a title",
          autoCancel: true,
          sound: null
      }).then(function () {
          console.log("The notification has been set");
      });
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
