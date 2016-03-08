angular.module('mainApp').controller('checkObjectUnique', ['restService', '$rootScope', '$cookies', '$state',
	'constCollection', function (restService, $rootScope, $cookies, $state, constCollection) {

		var ctrl = this,
			rest = new restService(),
			urlCategory = constCollection.urlRest.urlCategory,
			urlTypeCategory = constCollection.urlRest.urlTypeCategory,
			urlRegions = constCollection.urlRest.urlRegions,
			urlCity = constCollection.urlRest.urlCity,
			urlDistricts = constCollection.urlRest.urlDistricts,
			urlStreet = constCollection.urlRest.urlStreet,
			urlHouseNumber = constCollection.urlRest.urlHouseNumber,
			urlFlatNumber = constCollection.urlRest.urlFlatNumber,
			map = {},
			myGeocoder,
			myCollection,
			statusOK = 200,
			checkObject = {};

		$rootScope.title = constCollection.advert.step1Title;

		ctrl.messages = constCollection.fields;

		ctrl.realty = {};

		ctrl.realty.selectedCategory = {};

		ctrl.realty.typeRealty = [];
		ctrl.realty.selectTypeRealty = {};

		ctrl.realty.region = [];
		ctrl.realty.selectedRegions = {};

		ctrl.realty.city = [];
		ctrl.realty.selectedCity = {};

		ctrl.realty.districts = [];
		ctrl.realty.selectedDistricts = null;

		ctrl.realty.street = [];
		ctrl.realty.streetSelected = null;

		ctrl.realty.houseNumber = [];
		ctrl.realty.houseNumberSelected = {"number": null};

		ctrl.realty.numberFlat = [];
		ctrl.realty.numberFlatSelected = {"number": null};

		ctrl.realty.cadastralNumber = "";

		ctrl.realty.garageNumber = "";

		ctrl.realty.coordinates = [];

		ctrl.realty.categoryFlat = false;
		ctrl.realty.categoryHouse = false;
		ctrl.realty.categoryParcels = false;
		ctrl.realty.commercialReal = false;
		ctrl.realty.garage = false;

		ctrl.statePage = 0;

		ctrl.changeInputFlat = changeInputFlat;
		ctrl.changeInputHouse = changeInputHouse;

		ctrl.changeCategory = changeCategory;
		ctrl.changeRegion = changeRegion;
		ctrl.changeCity = changeCity;
		ctrl.changeStreet = changeStreet;
		ctrl.changeNumberHouse = changeNumberHouse;

		ctrl.sendObject = sendObject;

		ctrl.initYandex = initYandex;

		ctrl.nextClick = true;

		ctrl.cat = {};








		init();






		/* Functions */

		function init() {
			if(sessionStorage.getItem("realty")){
				ctrl.realty = JSON.parse(sessionStorage.getItem("realty"));
				initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name + ", "
					+ ctrl.realty.streetSelected.name + " " + ctrl.realty.houseNumberSelected.number);
			}
			else{
				rest.query(urlCategory, {}, {}, successGetCategory, errorFunction);
			}

			ymaps.ready(function () {
				map = new ymaps.Map('map', {
					center: [50.4299, 30.5175],
					zoom: 7,
					scrollwheel: true
				});

				map.behaviors.enable(['drag', 'rightMouseButtonMagnifier']);
				map.behaviors.enable('scrollZoom');
				myCollection = new ymaps.GeoObjectCollection({}, {
					preset: 'twirl#redIcon',
					iconImageHref: '/content/images/marker.png',
					iconImageSize: [29, 44],
					draggable: true
				});
			});
		}

		/* сбрасываем категорию */
		function resetCategory() {
			ctrl.realty.categoryFlat = false;
			ctrl.realty.categoryHouse = false;
			ctrl.realty.categoryParcels = false;
			ctrl.realty.commercialReal = false;
			ctrl.realty.garage = false;
		}

		/* Функция определения местонахождения */
		function initYandex(str) {
			ymaps.ready(function () {
				myGeocoder = ymaps.geocode(str);
				myGeocoder.then(
					function (res) {
						map.setCenter(res.geoObjects.get(0).geometry.getCoordinates(), 15);
						ctrl.realty.coordinates = res.geoObjects.get(0).geometry.getCoordinates();
						myCollection.removeAll();
						myCollection.add(new ymaps.Placemark(res.geoObjects.get(0).geometry.getCoordinates()));
						map.geoObjects.add(myCollection);
					},
					function (err) {
						alert('Ошибка');
					}
				);
			});
		}

		/* изминение dropdown квартиры */
		function changeInputFlat(e) {
			ctrl.realty.numberFlatSelected = {"number": e.$viewValue};
		}

		/* изминение dropdown дома */
		function changeInputHouse(e) {
			ctrl.realty.houseNumberSelected = {"number": e.$viewValue};
			initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name + ", " +
				ctrl.realty.streetSelected.name + " " + e.$viewValue);
		}

		/* изминение dropdown категории */
		function changeCategory(element) {
			ctrl.cat = element.type;

			switch (ctrl.cat) {
				case 'flats' :
					resetCategory();
					ctrl.realty.categoryFlat = true;
					break;
				case 'houses' :
					resetCategory();
					ctrl.realty.categoryHouse = true;
					break;
				case 'parcels' :
					resetCategory();
					ctrl.realty.categoryParcels = true;
					break;
				case 'commercial-property' :
					resetCategory();
					ctrl.realty.commercialReal = true;
					break;
				case 'garages' :
					resetCategory();
					ctrl.realty.garage = true;
					break;
			}

			rest.query(urlTypeCategory, {"categoryId": ctrl.realty.selectedCategory.id}, {}, successTypeRealtyOnChange, errorFunction);
		}

		/* изминение dropdown региона */
		function changeRegion(element) {
			rest.query(urlCity, {"regionId": element.id}, {}, successCity, errorFunction);
			initYandex(ctrl.realty.selectedRegions.name);
		}

		/* изминение dropdown города */
		function changeCity(element) {
			rest.query(urlDistricts, {"cityId": element.id}, {}, successDistricts, errorFunction);
			rest.query(urlStreet, {"cityId": element.id}, {}, successStreet, errorFunction);
			initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name);
		}

		/* изминение dropdown улицы */
		function changeStreet(element) {
			rest.query(urlHouseNumber, {"streetId": element.id}, {}, successHouseNumber, errorFunction);
			initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name + ", " + ctrl.realty.streetSelected.name);
		}

		/* изминение номера дома */
		function changeNumberHouse(element) {
			rest.query(urlFlatNumber, {"houseId": element.id}, {}, successFlatNumber, errorFunction);
			initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name + ", " + ctrl.realty.streetSelected.name
				+ " " + ctrl.realty.houseNumberSelected.number);
		}

		/* получение категории */
		function successGetCategory(response) {
			ctrl.realty.categoryFlat = true;
			ctrl.realty.category = response.data;
			ctrl.realty.selectedCategory = response.data[0];
			rest.query(urlTypeCategory, {"categoryId": ctrl.realty.category[0].id}, {}, successTypeRealty, errorFunction);
		}

		/* получение типа недвижимости */
		function successTypeRealty(response) {
			ctrl.realty.typeRealty = response.data;
			ctrl.realty.selectTypeRealty = response.data[0];
			rest.query(urlRegions, {}, {}, successRegions, errorFunction);
		}

		/* получение типа недвижимости при изменении dropdown */
		function successTypeRealtyOnChange(response) {
			ctrl.realty.typeRealty = response.data;
			ctrl.realty.selectTypeRealty = response.data[0];
		}

		/* получение регионов */
		function successRegions(response) {
			ctrl.realty.region = response.data;
			ctrl.realty.selectedRegions = response.data[0];
			rest.query(urlCity, {"regionId": response.data[0].id}, {}, successCity, errorFunction);
			initYandex(ctrl.realty.selectedRegions.name);
		}

		/* получение городов */
		function successCity(response) {
			ctrl.realty.selectedCity = response.data[0];
			ctrl.realty.city = response.data;
			rest.query(urlDistricts, {"cityId": response.data[0].id}, {}, successDistricts, errorFunction);
			rest.query(urlStreet, {"cityId": response.data[0].id}, {}, successStreet, errorFunction);
			initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name);
		}

		/* получение районов */
		function successDistricts(response) {
			ctrl.realty.districts = response.data;
		}

		/* получение улиц */
		function successStreet(response) {
			var street = "";

			ctrl.realty.streetSelected = null;
			ctrl.realty.street = response.data;

			if(!response.data[0]){
				street = null;
			}
			else{
				street = response.data[0].id;
			}

			rest.query(urlHouseNumber, {"streetId": street}, {}, successHouseNumber, errorFunction);

			if(ctrl.realty.streetSelected && ctrl.realty.houseNumberSelected){
				initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name + ", " + ctrl.realty.streetSelected.name);
			}
		}

		/* получение номеров дома */
		function successHouseNumber(response) {
			ctrl.realty.houseNumber = response.data;
			rest.query(urlFlatNumber, {"houseId": response.data[0].id}, {}, successFlatNumber, errorFunction);

			if(ctrl.realty.streetSelected && ctrl.realty.houseNumberSelected){
				initYandex(ctrl.realty.selectedRegions.name + ", " + ctrl.realty.selectedCity.name + ", "
					+ ctrl.realty.streetSelected.name + " " + ctrl.realty.houseNumberSelected.number);
			}
		}

		/* получение номеров квартир */
		function successFlatNumber(response) {
			ctrl.realty.numberFlat = response.data;
		}

		/* ошибка */
		function errorFunction(data) {
			console.error(data);
			ctrl.backError = data.data.errors;
		}

		/* Отправляем объект */
		function sendObject(form) {
			var urlCheck = "",
				headers = {},
				objectUser,
				idDistrict = ctrl.realty.selectedDistricts ? ctrl.realty.selectedDistricts.id : null;

			if (form.$valid) {
				urlCheck = "/realties/" + ctrl.realty.selectedCategory.type + "/check";

				switch (ctrl.realty.selectedCategory.type) {
					case 'flats' :
						urlCheck = "/realties/flats/check";
						break;
					case 'houses' :
						urlCheck = "/realties/houses/check";
						break;
					case 'parcels' :
						urlCheck = "/realties/parcels/check";
						break;
					case 'commercial-property' :
						urlCheck = "/realties/commercials/check";
						break;
					case 'garages' :
						urlCheck = "/realties/garages/check";
						break;
				}

				checkObject = {
					"category": ctrl.realty.selectedCategory.id,
					"categoryType": ctrl.realty.selectTypeRealty.id,
					"region": ctrl.realty.selectedRegions.id,
					"city": ctrl.realty.selectedCity.id,
					"district": idDistrict,
					"street": ctrl.realty.streetSelected.id,
					"show": {
						"category": ctrl.realty.selectedCategory,
						"categoryType": ctrl.realty.selectTypeRealty,
						"address": {
							"region": ctrl.realty.selectedRegions,
							"city": ctrl.realty.selectedCity,
							"district": ctrl.realty.selectedDistricts,
							"street": ctrl.realty.streetSelected
						}
					}
				};

				/* Собираем данные для объекта */
				if (ctrl.realty.selectedCategory.type == 'flats') {
					checkObject.flatNumber = ctrl.realty.numberFlatSelected.number;
					checkObject.houseNumber = ctrl.realty.houseNumberSelected.number;

					checkObject.show.address.flatNumber = ctrl.realty.numberFlatSelected;
					checkObject.show.address.houseNumber = ctrl.realty.houseNumberSelected;
				}
				else if (ctrl.realty.selectedCategory.type == 'houses') {
					checkObject.houseNumber = ctrl.realty.houseNumberSelected.number;
					checkObject.show.address.houseNumber = ctrl.realty.houseNumberSelected;
				}
				else if (ctrl.realty.selectedCategory.type == 'parcels') {
					checkObject.cadastralNumber = ctrl.realty.cadastralNumber;
					checkObject.show.address.cadastralNumber = ctrl.realty.cadastralNumber;
				}
				else if (ctrl.realty.selectedCategory.type == 'garages') {
					checkObject.houseNumber = ctrl.realty.houseNumberSelected.number;
					checkObject.garageNumber = ctrl.realty.garageNumber;
					checkObject.show.address.houseNumber = ctrl.realty.houseNumberSelected;
					checkObject.show.address.garageNumber = {"number": ""};
					checkObject.show.address.garageNumber.number = ctrl.realty.garageNumber;
				}
				else if (ctrl.realty.selectedCategory.type == 'commercial-property') {
					checkObject.houseNumber = ctrl.realty.houseNumberSelected.number;
					checkObject.show.address.houseNumber = ctrl.realty.houseNumberSelected;
				}

				objectUser = JSON.parse($cookies.get("user"));
				headers = {
					"token": objectUser.token
				};

				sessionStorage.setItem('realty', JSON.stringify(ctrl.realty));
				sessionStorage.setItem('typeRealty', JSON.stringify(ctrl.realty.selectTypeRealty.name));

				ctrl.nextClick = false;

				rest.post(urlCheck, {}, checkObject, successCheck, errorFunction, headers);
			}
		}

		/* Если существует кидаем на характеристики иначе кидаем на создание */
		function successCheck(response) {
			if ((response.status == statusOK) && (response.data.id)) {
				sessionStorage.setItem('checkObject', JSON.stringify(response.data));
				sessionStorage.setItem('statePage', ctrl.statePage);
				$state.go('check');
			}
			else if (response.status == statusOK) {
				checkObject.longitude =  ctrl.realty.coordinates[0];
				checkObject.latitude = ctrl.realty.coordinates[1];
				if (ctrl.realty.selectedDistricts) {
					checkObject.selectedDistricts = ctrl.realty.selectedDistricts.id;
				}

				sessionStorage.setItem('sendObject', JSON.stringify(checkObject));
				sessionStorage.setItem('categoryType', JSON.stringify(ctrl.realty.selectedCategory.type));

				$state.go('create_object');
			}
		}

	}]);