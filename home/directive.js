angular.module("mainApp").directive('roomCount', [function () {
	return {
		restrict: 'E',
		template: '{{room}}',
		replace: false,
		scope: {
			count: "@"
		},
		link: function ($scope) {

			$scope.room = "";

			if ($scope.count == 1) {
				$scope.room = "Комната";
			}
			else if ($scope.count == 2 || $scope.count == 3 || $scope.count == 4) {
				$scope.room = "Комнаты";
			}
			else if ($scope.count == "") {
				$scope.room = "";
			}
			else {
				$scope.room = "Комнат";
			}

		}
	}
}]);