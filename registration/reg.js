var registration = angular.module('registration', []);

registration.controller('regController', ['restService', '$state', 'constCollection', '$rootScope', function (restService, $state, constCollection, $rootScope) {
	var ctrl = this;

	$rootScope.title = "Регистрация в системе";
	$rootScope.robots = true;

	$rootScope.user = {firstName: '', email: ''};
	$rootScope.disabled = true;
	ctrl.errors = {};
	ctrl.messages = constCollection.fields;


	ctrl.registration = registration;

	/* FUNCTIONS */

	/* Регистрация пользователя */
	function registration(form) {

		if (form.$valid) {

			var controlUser = new restService(),
				url = "/registration/private-person";

			$rootScope.disabled = true;

			controlUser.post(url, {}, $rootScope.user, successUser, errorUser);

		}
	}

	function successUser(data) {

		$rootScope.disabled = false;

		$state.go('authorization');

	}

	function errorUser(response) {

		$rootScope.disabled = false;

		ctrl.errors = response.data.errors;

	}

	function check(){

		if( ($rootScope.user['firstName'] != "" && $rootScope.user['email'] != "") && ($rootScope.user['firstName'] != undefined && $rootScope.user['email'] != undefined) ){
			$rootScope.disabled = false;
		}
		else{
			$rootScope.disabled = true;
		}

	}

	$rootScope.$watch('user.firstName', function(){
		check();
	});
	$rootScope.$watch('user.email', function(){
		check();
	});


}]);