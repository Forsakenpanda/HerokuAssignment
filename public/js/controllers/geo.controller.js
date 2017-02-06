(function() {
    'use strict';
    angular.module('myApp').controller('geoController', geoController);

    function geoController($scope, $http){
        var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
        var map;
        $scope.countries=[];
        initialize();
        function initialize() {
            var myOptions = {
                zoom: 2,
                center: new google.maps.LatLng(10, 0),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
            $http.get('/js/controllers/coord.json').then(function(data){
                //The following json object is copied from the original source's script. This removes the need for url parameter callbacks. 
                drawMap(data.data);
            })
        }

        function drawMap(data) {
            var rows = data['rows'];
            var name="";
            for (var i in rows) {
                if (rows[i][0] != 'Antarctica') {
                    var newCoordinates = [];
                    var geometries = rows[i][1]['geometries'];
                    if (geometries) {
                        for (var j in geometries) {
                            newCoordinates.push(constructNewCoordinates(geometries[j]));
                        }
                    } else {
                        newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
                    }
                    var randomnumber = Math.floor(Math.random() * 4);
                    var country = new google.maps.Polygon({
                        name:rows[i][0],
                        isChecked:false,
                        paths: newCoordinates,
                        strokeColor: colors[randomnumber],
                        strokeOpacity: 0,
                        strokeWeight: 1,
                        fillColor: colors[randomnumber],
                        fillOpacity: 0.3
                    });
                    google.maps.event.addListener(country, 'click', function(){
                        if(!this.isChecked){
                            this.setOptions({fillOpacity:0.8, isChecked:true});
                            console.log(this.name);
                            name=this.name;
                            $scope.$apply(function(){
                                $scope.countries.push(name);
                            })
                            
                            console.log($scope.countries);
                        } else{
                            this.setOptions({fillOpacity:0.3, isChecked:false});
                            name=this.name;
                            $scope.$apply(function(){
                                $scope.countries.splice($scope.countries.indexOf(name), 1);
                            })
                            
                        }
                        
                    })

                    country.setMap(map);
                }
            }
        }

        function constructNewCoordinates(polygon) {
            var newCoordinates = [];
            var coordinates = polygon['coordinates'][0];
            for (var i in coordinates) {
                newCoordinates.push(new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
            }
            return newCoordinates;
        }
    }
})();