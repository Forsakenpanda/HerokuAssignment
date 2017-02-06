/**
 * Created by Nick Gregorio, 100514374
 * Created for Cloud Computing (UOIT)
 */
(function() {
    'use strict';
    angular.module('myApp').controller('geoController', geoController);
    //Controller file controlling the Geographic Information page.
    function geoController($scope, $http, $rootScope){
        var colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
        var map;
        $scope.countries=[];
        $scope.table = [];
        initialize();
        //Initializes the map on the html page (Google API)
        //https://developers.google.com/fusiontables/docs/samples/mouseover_map_styles
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
        //Draws the map on the html page (Google API, changed from mouseover events to mouseclick events)
        //https://developers.google.com/fusiontables/docs/samples/mouseover_map_styles
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
                    //Add or remove countries to show rant information for, on click events. 
                    google.maps.event.addListener(country, 'click', function(){
                        if(!this.isChecked){
                            this.setOptions({fillOpacity:0.8, isChecked:true});
                            name=this.name;
                            $scope.$apply(function(){
                                $scope.countries.push(name);
                                initializeTable(name);
                            })
                        } else{
                            this.setOptions({fillOpacity:0.3, isChecked:false});
                            name=this.name;
                            $scope.$apply(function(){
                                $scope.countries.splice($scope.countries.indexOf(name), 1);
                                removeEntry(name);
                            })
                            
                        }
                        
                    })

                    country.setMap(map);
                }
            }
        }
        //Constructs the coordinates for a given country (Google API)
        //https://developers.google.com/fusiontables/docs/samples/mouseover_map_styles
        function constructNewCoordinates(polygon) {
            var newCoordinates = [];
            var coordinates = polygon['coordinates'][0];
            for (var i in coordinates) {
                newCoordinates.push(new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
            }
            return newCoordinates;
        }

        //Initializes the table underneath the map with the information required. 
        function initializeTable(){

            var push = true;
            var feed;
            var country;
            var data;
            var entry;
            //Must iterate through every entry in the feed, and subsequently through every country that has been clicked, in order to determine what countries have information
            for (var i = 0; i< $rootScope.feedData.length; i++){
                feed=$rootScope.feedData[i];
                for(var j = 0; j<$scope.countries.length;j++){
                    country = $scope.countries[j];
                    if (country == feed.location){
                        if($scope.table.length==0){
                            $scope.table.push({country:country, comCount:0, empCount:0, entCount:0, polCount:0, socCount:0, tecCount:0, completed:false});
                        }else{
                            for (var k =0; k<$scope.table.length;k++){
                                data=$scope.table[k];
                                
                                if(data.country == country)push=false;break;

                            }
                            if(push){
                                $scope.table.push({country:country, comCount:0, empCount:0, entCount:0, polCount:0, socCount:0, tecCount:0});
                            }
                            push=true;
                        }
                    }  
                }
                //Create a count of each type of rant
                for (var l = 0; l<$scope.table.length; l++) {
                    entry = $scope.table[l];
                    if(entry.country==feed.location && !entry.completed){
                        if(feed.topic == "Commercial"){
                            entry.comCount++;
                        } else if(feed.topic=="Employers/Employees"){
                            entry.empCount++;
                        } else if(feed.topic =="Entertainment"){
                            entry.entCount++;
                        } else if(feed.topic == "Politics"){
                            entry.polCount++;
                        } else if(feed.topic == "Social"){
                            entry.socCount++;
                        } else if(feed.topic == "Technology") {
                            entry.tecCount++;
                        }
                    }
                }
            }
            //Prevent re-calculation of countries with multiple rants posted. 
            for(var entry in $scope.table){
                $scope.table[entry].completed=true;
            }
        }

        //Removes a given country from the list of countries to show information for
        function removeEntry(countryName){
            for(var i = 0; i < $scope.table.length; i++){
                if($scope.table[i].country == countryName){
                    $scope.table.splice(i, 1);
                } 
            }
        }
    }
})();