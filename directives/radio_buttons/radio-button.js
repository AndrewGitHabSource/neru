angular.module('mainApp').directive('radioButton', ['$rootScope', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/radio_buttons/template/radio-template.html',
		scope: {
			data: "=",
			select: "=selectRadioButton"
		},
		link: function ($scope) {
			$scope.selectButton = selectButton;

			for(var i = 0; i < $scope.data.length; i++){
				if($scope.data[i].selected){
					$scope.select = $scope.data[i];
				}
			}


			/* Выбирается радиокнопка по клику */
			function selectButton(item, event){
				$scope.select = item;

				angular.element(document.querySelector(".active-radio")).removeClass("active-radio");
				angular.element(event.target).addClass("active-radio");
			}

		}
	}
}]);