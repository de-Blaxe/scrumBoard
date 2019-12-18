(function(){
                'use strict';

                angular.module('scrumboard.demo', [])
                    .controller('ScrumboardController', ['$scope', '$http', ScrumboardController]);

                function ScrumboardController($scope, $http) {
                    $scope.add = function (list, title, description) {
                        var card = {
                            list: list.id,
                            title: title,
                            description: description
                        };
                        $http.post('/scrumboard/cards/', card)
                            .then(function(response){
                                list.cards.push(response.data)
                            },
                                function(){
                                    alert('Could not create card')
                                }
                            );
                    };

                    $scope.delete = function(list) {
                        $http.delete('scrumboard/lists/' + list.id + '/').then(
                            function() {
                                var data = $scope.data;
                                data.splice(
                                    data.indexOf($scope.list),
                                    1
                                );
                            }
                        )
                    };

                    $scope.newList = function() {
                        var list = {
                            id: 2,
                            name: 'New List'
                        };
                        $http.post('/scrumboard/lists/', list)
                            .then(function(response){
                                    $scope.data.push(response.data)
                                },
                                    function(){
                                        alert('Could not create card')
                                    }
                                );
                    };

                    $scope.updateListTitle = function() {
                        $http.put('scrumboard/lists/' + $scope.list.id + '/', $scope.list)
                    };

                    $scope.modelOptions = {
                        debounce:500
                    };

                    $scope.data = [];
                    $http.get('/scrumboard/lists/').then(function(response){
                        $scope.data = response.data;
                    })
                }
            }());