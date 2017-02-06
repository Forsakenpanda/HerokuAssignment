/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 * January 30th, 2017
 */
(function(){
    'use strict';
    angular.module('myApp').controller('feedController', feedController);
    //Controller for the live feed in the app
    function feedController($scope, $http, $interval, $rootScope){
        $rootScope.feedData = [];
        
        $http({
            url:'/getFeed',
            method:'GET'
        }).then(function(response){
            console.log(response);
            $rootScope.feedData=response.data;
        })
        //Update the live feed from the server every 10 seconds. 
        $interval(function(){
             $http({
                url:'/getFeed',
                method:'GET'
            }).then(function(response){
                console.log(response);
                $rootScope.feedData=response.data;
            })
        },10000);   
        
    }
})();