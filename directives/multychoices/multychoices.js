angular.module('mainApp').directive('multychoices', ['$rootScope', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/multychoices/template/template-multychoices.html',
		scope: {
			data: "=",
			select: "="
		},
		link: function ($scope) {
			var close = false;

			$scope.subData = {};
			$scope.formedText = "";
			$scope.openly = false;
			$scope.step = true;
			$scope.backFirstStep = backFirstStep;

			$scope.choiceFirst = choiceFirst;
			$scope.choice = choice;
			$scope.open = open;
			$scope.state = true;


			/* Закрываем мультиселест по клику на пустом месте */
			angular.element(document).ready(function () {
				var elem = document.getElementsByClassName("open-window")[0];

				elem.addEventListener("click", function (e) {
					if (!close) {
						$scope.openly = true;
						$scope.state = true;
					}
					else {
						close = false;
					}
				}, false);

				document.body.addEventListener("click", reset, true);

				function reset(e) {
					if (angular.element(e.currentTarget).hasClass('open-window')) {
						e.stopPropagation();
						$scope.state = false;
						$scope.$apply();
					}

					if (!close) {
						if (!$scope.state) {
							$scope.openly = true;
							$scope.state = true;
							$scope.$apply();
						}
						else {
							$scope.openly = false;
							$scope.$apply();
						}
					}
					else {
						close = false;
					}
				}
			});


			/* Выбираем из первых данных(например область) */
			function choiceFirst(item) {
				$scope.select = angular.copy(item);
				$scope.subData = angular.copy(item.cities);
				$scope.step = false;
			}

			/* Выбираем конечный результат(например город) */
			function choice(item) {
				$scope.select.cities = item;
				$scope.formedText = $scope.select.region.name + ", " + $scope.select.cities.name;
				$scope.openly = false;
				$scope.step = true;
				close = true;
			}

			/* Открывается селект */
			function open() {
				$scope.openly = true;
			}

			/* Возвращаемся на первый шаг */
			function backFirstStep() {
				$scope.step = true;
			}

		}
	}
}]);