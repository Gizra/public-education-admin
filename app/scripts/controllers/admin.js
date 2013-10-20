'use strict';

angular.module('publicEducationAdminApp')
  .controller('AdminCtrl', function ($scope, Marker, $location) {
    /**
     * Promise to get the all markers.
     */
    var getMarkers = function() {
      Marker.gettingMarkers().then(function(data) {
        angular.forEach(data, function(marker, key) {
          $scope.markers[key] = marker;
        });
      });
    };

    /**
     * Selected record to delete, and prompt confirmation.
     *
     * @params [{*}]
     *  Record selected.
     */
    $scope.delete = function(record) {
      // Cache the record to avoid search.
      $scope.selected = {};
      $scope.selected = record;

      $scope.state = 'delete';
    };

    /**
     * Execute delete an specific record.
     *
     * @params [{*}]
     *  Record selected.
     */
    $scope.confirmDelete = function(record) {
      // Performance delete record on server.
      Marker.deleteRecord(record)
        .then(function() {
          $scope.refresh();
        });
    };

    /**
     * refresh the initial view.
     */
    $scope.refresh = function() {
      $scope.state = 'markers';
      $location.path('/');
    };

    // Initial request get markers.
    $scope.markers = {};
    $scope.state = 'markers';
    getMarkers();
  });
