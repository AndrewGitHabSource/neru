angular.module('mainApp').controller('codeStyleController', ['restService', 'constCollection', '$uibModal', function(restService, constCollection, $uibModal) {

	var ctrl = this,
		controlData = new restService(),
		urlRegion = constCollection.urlRest.urlRegions,
		urlCity = constCollection.urlRest.urlCity,
		myCollection = null,
		myCollectionSecond = null,
		mapFirst = null,
		mapSecond = null;


	ctrl.maxSize = 5;
	ctrl.bigTotalItems = 175;
	ctrl.bigCurrentPage = 1;

	ctrl.checkboxFirst = false;
	ctrl.checkboxSecond = false;

	ctrl.checkboxFormFirst = false;
	ctrl.checkboxFormSecond = false;
	ctrl.checkboxFormThird = false;
	ctrl.checkboxFormFour = false;

	ctrl.count = 1;

	ctrl.unitsCost = [
		{"name": "USD"},
		{"name": "GRN"}
	];

	ctrl.unitsCostSelect = ctrl.unitsCost[0];

	ctrl.radio = [
		{"name": "Аренда", "selected": true},
		{"name": "Продажа", "selected": false},
		{"name": "Покупка", "selected": false}
	];
	ctrl.radioSelect = null;

	ctrl.gallery = [
		{
			"img": "/content/images/gallary.png",
			"main": true
		},
		{
			"img": "/content/images/realty.png",
			"main": false
		},
		{
			"img": "/content/images/gallary.png",
			"main": false
		},
		{
			"img": "/content/images/img-6.jpg",
			"main": false
		}
	];


	ctrl.selType = [
		{
			"name": "ул. Котовского"
		},
		{
			"name": "пер. Котовского"
		},
		{
			"name": "ул. Кота Бегемота"
		},
		{
			"name": "бул. Кота из сказки"
		},
		{
			"name": "ул. Котовасия"
		},
		{
			"name": "ул. Котика"
		},
		{
			"name": "ул. Котерины Алексеевны"
		}
	];
	ctrl.selTypeSel = null;

	ctrl.selectorsFirst = ["Number2", "Number3", "Number4", "Number5"];
	ctrl.selectorsFirstSelected = null;

	ctrl.selectionsSecond = [
		{
			"name": "Квартиры и комнаты",
			"number": "Number 2"
		},
		{
			"name": "Дома и дачи",
			"number": "Number 4"
		},
		{
			"name": "Дома и дачи",
			"number": "Number 4"
		},
		{
			"name": "Квартиры и комнаты",
			"number": "Number 4"
		},
		{
			"name": "Дома и дачи",
			"number": "Number 4"
		},
		{
			"name": "Квартиры и комнаты",
			"number": "Number 4"
		},
		{
			"name": "Дома и дачи",
			"number": "Number 4"
		}
	];
	ctrl.selectorsSecondSelected = null;

	ctrl.selectorsThird = ["Number 2", "Number 3", "Number 4", "Number 5"];
	ctrl.selectorsThirdSelected = null;

	ctrl.selectorsFour = ["Number 2", "Number 3", "Number 4", "Number 5"];
	ctrl.selectorsFourSelected = null;

	ctrl.selectorsFive = ["Number 2", "Number 3", "Number 4", "Number 5"];
	ctrl.selectorsFiveSelected = null;

	ctrl.location = [];
	ctrl.locationSelected = null;

	ctrl.questions = [
		{
			"name": "Вопрос номер один",
			"answer": "Ответ на вопрос номер один"
		},
		{
			"name": "Вопрос номер два",
			"answer": "Ответ на вопрос номер два"
		},
		{
			"name": "Вопрос номер три",
			"answer": "Ответ на вопрос номер три"
		}
	];

	ctrl.regions = null;
	ctrl.cityes = {};
	ctrl.index = 0;

	ctrl.openPopup = openPopup;

	ctrl.makeMain = makeMain;
	ctrl.deletePhoto = deletePhoto;









	init();


	/* FUNCTIONS */
	function init(){
		controlData.query(urlRegion, {}, {}, successGetRegion, error);

		/* создаем 2 карты */
		ymaps.ready(function () {
			mapFirst = new ymaps.Map('map1', {
				center: [50.4299, 30.5175],
				zoom: 7,
				scrollwheel: true
			});

			mapFirst.behaviors.enable(['drag', 'rightMouseButtonMagnifier']);
			mapFirst.behaviors.enable('scrollZoom');
			myCollection = new ymaps.GeoObjectCollection({}, {
				preset: 'twirl#redIcon',
				iconImageHref: '/content/images/marker.png',
				iconImageSize: [29, 44],
				draggable: true
			});

			myCollectionSecond = new ymaps.GeoObjectCollection({}, {
				preset: 'twirl#redIcon',
				iconImageHref: '/content/images/marker.png',
				iconImageSize: [29, 44],
				draggable: true
			});

			myCollection.add(new ymaps.Placemark([50.4299, 30.5175]));
			myCollectionSecond.add(new ymaps.Placemark([50.4299, 30.5175]));

			mapSecond = new ymaps.Map('map2', {
				center: [50.4299, 30.5175],
				zoom: 7,
				scrollwheel: true
			});

			mapSecond.behaviors.enable(['drag', 'rightMouseButtonMagnifier']);
			mapSecond.behaviors.enable('scrollZoom');
			mapFirst.geoObjects.add(myCollection);
			mapSecond.geoObjects.add(myCollectionSecond);
		});
	}

	/* Получаем регион */
	function successGetRegion(data) {
		ctrl.regions = data.resource;

		for(var i = 0; i < data.resource.length; i++){
			(function(i){
				controlData.query(urlCity, {regionId: data.resource[i].id}, {}, function (response){
					ctrl.location.push({
						"region": ctrl.regions[i],
						"cities": response.data
					});
				}, error);
			})(i);
		}

	}

	/* Accept error from server */
	function error(response) {
		console.error(response);
	}

	/* Открывается попап */
	function openPopup(){
		var modalInstance = $uibModal.open({
			templateUrl: 'content/template/popup-auth.html',
			windowTemplateUrl: 'content/template/window.html',
			backdrop: false,
			controller: 'authControllerModal'
		});
	}

	/* Сделать основным изображение в галереи */
	function makeMain(item){
		for(var i = 0; i < ctrl.gallery.length; i++){
			ctrl.gallery[i].main = false;
		}
		item.main = true;
	}

	/* Удаляем фото из галереи */
	function deletePhoto(index){
		ctrl.gallery.splice(index, 1);
	}
}]);