(function(){
    'use strict';

    angular
    .module('myApp')
    .controller('signinController', signinController);

    function signinController($scope, $http, $rootScope){
        $scope.info = {
            username:"",
            password:""
        }
        $scope.error = "";
        $scope.loginInfo = {
            username:"",
            password:""
        }
        $scope.submit = function(credentials){
            $http({
                url: '/register',
                method: 'POST',
                data: $scope.info
            }).then(function(response){
                console.log('response:', response);
            })
        }
        $scope.login =function(credentials) {
            $http({
                url:'/login',
                method:'GET',
                params:{user:$scope.loginInfo.username, pass:$scope.loginInfo.password}
            }).then(function(response){
                console.log('response:', response);
                if(response.data.length==0){
                    $scope.error = "Invalid username or password"
                } else {
                    $scope.error="";
                    $rootScope.user.name=response.data[0].username;
                    $rootScope.loggedIn=true;
                }
            })
        }
    }
})();