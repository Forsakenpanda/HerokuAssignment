(function(){
    'use strict';
    angular.module('myApp').controller('loginController', loginController);
    function loginController($scope){
        $scope.formInfo={
            userName:"",
            password:""
        }
        function submit(credentials){
            console.log("Submitting");
        }
    }
})();