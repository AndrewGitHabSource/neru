angular.module('mainApp').directive('openContent', ['$rootScope', function () {
	return {
		restrict: 'A',
		templateUrl: 'directives/open_content/template/open-content.html',
		scope: {
			dialogTitle: "@",
			dialogContent: "@"
		},
		link: function ($scope, $element, $attrs, $ctrl) {
			$scope.openContent = openContent;





			/* Открывается контент */
			function openContent(event){
				var element = angular.element(event.target);

				element.parent().toggleClass("open-content");
			}
		}
	}
}]);