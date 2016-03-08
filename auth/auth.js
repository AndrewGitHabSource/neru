angular.module('auth', []);

angular.module('auth').controller('authController', ['restService', '$state', '$rootScope', '$cookies', 'constCollection', function (restService, $state, $rootScope, $cookies, constCollection) {
	var ctrl = this;

	$rootScope.title = "Аутентификация в системе Neru.ua";
	$rootScope.robots = true;

	$rootScope.disabled = true;
	$rootScope.user = {email: '', password: ''};
	ctrl.errors = {};
	ctrl.messages = constCollection.fields;

	ctrl.authorization = authorization;


	/* FUNCTIONS */

	/* Авторизуемся */
	function authorization(form) {
		if (form.$valid) {
			var controlUser = new restService(),
				url = "/login";

			$rootScope.disabled = true;

			controlUser.post(url, {}, $rootScope.user, success, error);
		}
	}

	function success(response) {
		var objectUser = {};

		$rootScope.disabled = false;

		objectUser = {
			"email": response.data.email,
			"enabled": response.data.enabled,
			"firstName": response.data.firstName,
			"id": response.data.id,
			"token": response.data.token,
			"userType": response.data.userType
		};

		$cookies.put("user", JSON.stringify(objectUser));

		$rootScope.authorized = true;
		$state.go('home');
	}

	function error(response) {
		$rootScope.disabled = false;

		ctrl.errors = response.data.errors;
	}


	function check(){
		if( ($rootScope.user['email'] != "" && $rootScope.user['password'] != "") && ($rootScope.user['email'] != undefined && $rootScope.user['password'] != undefined) ){
			$rootScope.disabled = false;
		}
		else{
			$rootScope.disabled = true;
		}
	}

	$rootScope.$watch('user.email', function(){
		check();
	});
	$rootScope.$watch('user.password', function(){
		check();
	});

}]);
