'use strict';

angular.module('publicEducationAdminApp')
  .service('Marker', function Marker($q, $http, $timeout, BACKEND_URL) {

    return {

      /**
       * Private variable to hold the state.
       *
       * data.marker: List of markers in cache.
       */
      data: {
        markers: null
      },

      /**
       * Get markers.
       *
       * @param cache
       *   Determine if a request to the server should be done. Defaults to
       *   true.
       * @returns {*}
       */
      gettingMarkers: function() {
        var self = this;

        var defer = $q.defer();
        var markers;

        $http({
          method: 'GET',
          url: BACKEND_URL + '/get-markers'
        }).success(function (data) {

            self.data.markers = data;
            defer.resolve(data);

          });

        return defer.promise
      },

      /**
       * Delete a specific record
       *
       * @return {*}
       *   Promise of deleting record.
       */
      deleteRecord: function(record) {
        return $http.delete(BACKEND_URL + '/recordings/' + record._id + ';' + record.venueId);
      }
    };
  });
