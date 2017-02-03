(function(){
    'use strict';
    angular.module('myApp').run(run);
    function run($rootScope){
        $rootScope.loggedIn = false;
        $rootScope.user={
            name:""
        }
    }
})();