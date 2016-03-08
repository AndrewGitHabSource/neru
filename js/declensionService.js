angular
	.module('mainServices').factory('declensionUnits', ['constCollection', function(constCollection){

		return function(){

			this.round = round;


			/* Склонение информации */
			function round(value, type){

				var mod = value % 10,
					units = constCollection.units;

				if(value % 5 == 0 || mod == 6 || mod == 8 || mod == 9 || mod == 0){
					return units[type][0];
				}
				else if(mod == 1){
					return units[type][1];
				}
				else{
					return units[type][2];
				}

			}

		}

	}]);