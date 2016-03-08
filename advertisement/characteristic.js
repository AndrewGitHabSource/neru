angular.module('mainApp').controller('checkObject', ['restService', '$cookies', 'constCollection', '$state', function (restService, $cookies, constCollection, $state) {
	var ctrl = this,
		user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {},
		rest = new restService(),
		categoryType = sessionStorage.getItem('categoryType') ? JSON.parse(sessionStorage.getItem('categoryType')) : {};

	ctrl.urlCreated = "";
	ctrl.checkObject = JSON.parse(sessionStorage.getItem("checkObject"));
	ctrl.createdObject = JSON.parse(sessionStorage.getItem("createdObject"));
	ctrl.urlCreated = "";

	ctrl.path = constCollection.url;

	ctrl.backOnStepFirst = backOnStepFirst;

	ctrl.createObject = createObject;

	ctrl.backOnCreated = backOnCreated;

	ctrl.statePage = +sessionStorage.getItem('statePage');

	ctrl.schema = sessionStorage.getItem("uploadImage");


	console.log(ctrl.checkObject);

	/* FUNCTIONS */

	/* Создание объекта */
	function createObject(){
		switch (categoryType) {
			case 'flats' :
				ctrl.urlCreated = '/realties/flats/add';
				break;
			case 'houses' :
				ctrl.urlCreated = '/realties/houses/add';
				break;
			case 'parcels' :
				ctrl.urlCreated = '/realties/parcels/add';
				break;
			case 'commercial-property' :
				ctrl.urlCreated = '/realties/commercials/add';
				break;
			case 'garages' :
				ctrl.urlCreated = '/realties/garages/add';
				break;
		}

		rest.post(ctrl.urlCreated, {}, ctrl.createdObject, successCreatedObject, error, {"token": user.token});
	}

	/* Если валидация прошла успешно тогда отправляем данные */
	function successCreatedObject(response) {
		alert("Object Created");
	}

	/* Ошибки сервера */
	function error(response){
		console.error(response);
	}

	/* Перейти на создание объекта */
	function backOnCreated(){
		$state.go('create_object');
	}

	/* Проверка на существование объекта */
	function backOnStepFirst(){
		$state.go('compareObject');
	}

}]);