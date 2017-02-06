/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 */
(function(){
    'use strict';
    angular.module('myApp').controller('navigationController', navigationController);
    //Controller for the navigation bar
    function navigationController($scope, $rootScope){
        $rootScope.isPost='post';

        $scope.changePage = function(pageName){
            $rootScope.isPost=pageName;
        }
        $scope.logout=function(){
            $rootScope.user={};
            $rootScope.loggedIn=false;
        }
    }
})();