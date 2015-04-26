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

  $scope.alarms = [
    { title: 'Work', id: 0, message: 'wake up', wakeupTime: null },
    { title: 'Gym Day', id: 1, message: 'wake the f**k up', wakeupTime: null }
  ];
})

.controller('AlarmsCtrl', function($scope, $state) {

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
