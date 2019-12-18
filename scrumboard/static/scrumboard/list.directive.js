(function(){
    'use strict';
    angular.module('scrumboard.demo')
        .directive('scrumboardList', ListDirective);

    function ListDirective() {
        return {
            templateUrl: 'static/scrumboard/list.html',
            restrict: 'E',
            controller: ['$scope', '$http', function($scope, $http) {
                var url = 'scrumboard/lists/' + $scope.list.id + '/';
                $scope.delete = function() {
                    $http.delete(url).then(
                        function() {
                            var data = $scope.data;
                            data.splice(
                                data.indexOf($scope.list),
                                1
                            );
                        }
                    );
                };
            }]
        }
    }
});