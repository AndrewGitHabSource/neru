'use strict';

var mainDirectives = angular.module('mainDirectives', []);

mainDirectives.directive('checkbox', ['$rootScope', '$compile', function($compile){
    return {
        restrict: 'E',
        templateUrl: 'directiveApp/template/checkbox/template.html',
        replace: true,
        scope: {
            disabled: '@disabled',
            readonly: '@readonly',
            enabled: '=ngModel',
            change: '&',
            text: '@'
        },
        link: function($scope, $element, $attrs, $ctrl){

            $scope.identifer = "element" + $attrs["name"];

            $scope.action = function() {

                console.log($scope.enabled);

                $scope.change();

            }

        }
    }
}]);

mainDirectives.directive('toggleClass', ['$rootScope',  function($compile){
    return {
        restrict: 'A',
        scope: {
            "toggleClass": "@",
            "toggleEvent": "@toggleEvent",
            "onToggle": "&onToggle"

        },
        link: function($scope, $element, $attrs, $ctrl){

            $element.bind($scope.toggleEvent, function(e){

                $element.toggleClass($scope.toggleClass);

                $scope.onToggle();

            });

        }
    }
}]);