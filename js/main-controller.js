angular.module('mainCtrl', []).controller('mainController', ['$cookies', '$rootScope', 'constCollection', '$state', 'restService',
	function ($cookies, $rootScope, constCollection, $state, restService) {
	var main = this,
		date = new Date();

	main.year = date.getFullYear();

	$rootScope.agency = false;

	$rootScope.title = "Index";

	main.logout = logout;
	main.checkAuthorized = checkAuthorized;




	checkAuthorized();

	/* FUNCTIONS */

	/* Выход */
	function logout() {
		var allCookie = $cookies.getAll(),
			controlUser = new restService(),
			url = constCollection.urlRest.logout;

		for (var key in allCookie) {
			$cookies.remove(key);
		}

		$rootScope.authorized = false;

		controlUser.post(url);

		$state.go("home");
	}

	/* Проверка авторизации */
	function checkAuthorized(){
		main.userObject = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {};
		$rootScope.authorized = main.userObject['token'] ? true : false;
		main.nameUser = main.userObject['firstName'] ? main.userObject['firstName'] : "";
		main.imageUser = main.userObject['userAvatar'] ? constCollection.url + main.userObject['userAvatar'].path : constCollection.defaultAvatar;

		if(main.userObject){
			if(main.userObject.userType == "agency"){
				$rootScope.agency = true;
			}
			else{
				$rootScope.agency = false;
			}
		}

	}

	$rootScope.$watch('authorized', function () {
		checkAuthorized();
	});

	/* Доступы к маршрутам */
	$rootScope.$on('$stateChangeStart',
		function (event, toState) {

			if ((toState['name'] == 'registration' || toState['name'] == 'authorization') && $rootScope.authorized == true) {
				event.preventDefault();
				$state.go("home");
			}

			if ((toState['name'] == 'compareObject' || toState['name'] == 'check' || toState['name'] == 'create_object') && $rootScope.authorized == false) {
				event.preventDefault();
				$state.go("authorization");
			}

			if (toState['name'] != 'check' && toState['name'] != 'create_object') {
				sessionStorage.removeItem('realtyCreated');
				sessionStorage.removeItem('uploadImage');
			}

		})
}]);