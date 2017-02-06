(function(){
    'use strict';
    angular.module('myApp').controller('navigationController', navigationController);

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