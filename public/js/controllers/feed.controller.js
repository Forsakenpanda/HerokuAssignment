(function(){
    'use strict';
    angular.module('myApp').controller('feedController', feedController);

    function feedController($scope, $http, $interval, $rootScope){
        $rootScope.feedData = [];
        
        $http({
            url:'/getFeed',
            method:'GET'
        }).then(function(response){
            console.log(response);
            $scope.feedData=response.data;
        })
        $interval(function(){
             $http({
                url:'/getFeed',
                method:'GET'
            }).then(function(response){
                console.log(response);
                $scope.feedData=response.data;
            })
        },10000);   
        
    }
})();