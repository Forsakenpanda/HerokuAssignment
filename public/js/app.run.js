/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 */
(function(){
    'use strict';
    angular.module('myApp').run(run);
    //Set up the rootScope variable for cross-controller use
    function run($rootScope){
        $rootScope.loggedIn = false;
        $rootScope.user={
            name:""
        }
    }
})();