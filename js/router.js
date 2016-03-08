angular.module('mainApp').config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
	$urlRouterProvider.otherwise('/homePage');
	$stateProvider.state('home', {
			url: '/homePage',
			templateUrl: 'home/template/home.html',
			controller: 'home as ctrl'
		}).state('registration', {
			url: '/registration-private-person',
			templateUrl: 'registration/template/registration.html',
			controller: 'regController as ctrl'
		}).state('authorization', {
			url: '/login',
			templateUrl: 'auth/template/authorization.html',
			controller: 'authController as ctrl'
		}).state('compareObject', {
			url: '/step1',
			templateUrl: 'advertisement/template/check-object.html',
			controller: 'checkObjectUnique as ctrl'
		}).state('check', {
			url: '/stepCheck',
			templateUrl: 'advertisement/template/characteristics.html',
			controller: 'checkObject as ctrl'
		}).state('create_object', {
			url: '/step2',
			templateUrl: 'advertisement/template/create-object.html',
			controller: 'createObject as ctrl'
		}).state('directive', {
			url: '/directive',
			templateUrl: 'directiveApp/template/directives.html',
			controller: 'directiveController as ctrl'
		}).state('cookie', {
			url: '/cookie',
			templateUrl: 'directiveApp/template/cookie.html',
			controller: 'cookieController as ctrl'
		}).state('codestyle', {
			url: '/codestyleShow',
			templateUrl: 'codestyle/template/codestyleShow.html',
			controller: 'codeStyleController as ctrl'
		});
	$locationProvider.html5Mode({
		enabled: true
	});
}]);