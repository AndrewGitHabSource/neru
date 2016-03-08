angular.module('mainApp').directive('counter', ['$rootScope', function () {
	return {
		restrict: 'E',
		templateUrl: 'directives/counter/template/render-counter.html',
		scope: {
			min: "@",
			max: "@",
			count: "="
		},
		link: function ($scope, $element, $attrs, $ctrl) {
			$scope.increment = increment;
			$scope.decrement = decrement;
			$scope.change = change;





			/* Увеличиваем значение */
			function increment(){
				var value = parseInt(angular.element($element.find("input")).val());

				if(value < $scope.max){
					value++;
					angular.element($element.find("input")).val(value);
				}
			}

			/* Уменьшаем значение */
			function decrement(){
				var value = parseInt(angular.element($element.find("input")).val());

				if(value > $scope.min){
					value--;
					angular.element($element.find("input")).val(value);
				}
			}

			/* Вызывается когда меняем данные */
			function change(count, event){
				var exp = +count;

				if(!exp || exp > $scope.max || exp < $scope.min ){
					$scope.count = 1;
				}
			}
		}
	}
}]);