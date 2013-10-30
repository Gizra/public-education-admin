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
     * @params {*}
     *  Record selected.
     */
    $scope.delete = function(record) {
      // Cache selected record to avoid search.
      $scope.selected = {};
      $scope.selected = record;

      $scope.state = 'delete';
    };

    /**
     * Execute delete an specific record.
     *
     * @params {*}
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
     * Refresh the view with the markers from server.
     *
     * @params cache
     *   Use cache markers if true, from server if false.
     */
    $scope.refresh = function(cache) {
      if (!cache) {
        getMarkers();
      }
      $scope.state = 'markers';
    };

    // Initial request get markers.
    $scope.markers = {};
    $scope.refresh();

  });
