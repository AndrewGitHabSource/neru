angular.module("mainApp").directive('tableSetColor', [function () {
	return {
		restrict: 'A',
		template: '',
		replace: false,
		link: function ($scope, $elem) {
			var elements = angular.element($elem).find("tr"),
				finalElements = [];

			angular.element(document).ready(function () {
				for (var j = 0, k = 0; j < elements.length; j++) {
					if (!angular.element(elements[j]).hasClass('ng-hide')) {
						finalElements[k] = elements[j];
						k++;
					}
				}

				for (var i = 0; i < finalElements.length; i++) {
					if (i % 2 == 0) {
						angular.element(finalElements[i]).css('background', '#f8f8f8');
					}
				}
			});

		}
	}
}]);