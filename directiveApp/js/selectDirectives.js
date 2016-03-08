'use strict';

var selectDirectives = angular.module('selectDirectives', []);

mainDirectives.directive('multyselect', ['$rootScope', function () {
    return {
        restrict: 'E',
        templateUrl: 'directiveApp/template/multyselect/multyselect.html',
        scope: {
            source: "=source",
            ngModel: "=",
            defaultText: "@defaultText",
            index: "@",
            ngChange: "&"
        },
        link: function ($scope, $element, $attrs, $ctrl) {

            $scope.selectElementsString = $scope.defaultText;

            $scope.toggle = toggle;
            $scope.select = select;
            $scope.getIndexObject = getIndexObject;
            $scope.formedText = formedText;


            /* открывает / скрывает список элементов */
            function toggle(e) {
                var $elem = angular.element(e.target.parentNode.querySelector(".open-select")),
                    allElements = document.querySelectorAll(".open-select");

                for(var i = 0; i < allElements.length; i++){
                    if(allElements[i].getAttribute('class') == e.target.parentNode.querySelector(".open-select").getAttribute('class'))
                    continue;

                    angular.element(allElements[i]).removeClass("opened");
                }

                $elem.toggleClass("opened");


            }

            function select(object, elem) {

                var compareResult = $scope.getIndexObject(object),
                    targetElement = angular.element(elem.target);

                if (compareResult === false) {
                    $scope.ngModel.push(object);
                    $scope.formedText($scope.ngModel);
                } else {
                    $scope.ngModel.splice(compareResult, 1);
                    $scope.formedText($scope.ngModel);
                }

                if (targetElement.hasClass("icon-select")) {
                    targetElement.parent().toggleClass("selected");
                }
                else {
                    targetElement.toggleClass("selected");
                }

                $scope.ngChange();

            }

            function getIndexObject(obj) {

                var length = $scope.ngModel.length,
                    state = false;

                for (var i = 0; i < length; i++) {

                    if ($scope.ngModel[i].id == obj.id) {
                        state = i;
                    }

                }

                return state;

            }

            function formedText(array) {

                var arrayString = [],
                    length = array.length,
                    str = "";

                for (var i = 0; i < length; i++) {
                    arrayString[i] = '"' + array[i].name + '"';
                }

                str = arrayString.join(', ');

                if (str != '') {
                    $scope.selectElementsString = str;
                }
                else {
                    $scope.selectElementsString = $scope.defaultText;
                }

            }

        }
    }
}]);