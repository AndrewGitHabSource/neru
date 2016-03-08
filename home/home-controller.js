angular.module('mainApp').controller('home', ['restService', 'constCollection', 'declensionUnits', function (restService, constCollection, declensionUnits) {

	var ctrl = this,
		countPage = 24,
		roundService = new declensionUnits();

	ctrl.articles = [];
	ctrl.page = 1;
	ctrl.sale = true;
	ctrl.rent = false;
	ctrl.city = "";

	ctrl.more = more;
	ctrl.stateType = true;
	ctrl.setSale = setSale;
	ctrl.setRent = setRent;


	getArticles(ctrl.page, countPage);

	/* FUNCTIONS */

	/* Устанавливаем продажу */
	function setSale() {
		ctrl.page = 1;
		getArticles(ctrl.page, countPage, true, 'sale');
		ctrl.rent = false;
		ctrl.sale = true;
	}

	/* Устанавливаем аренду */
	function setRent() {
		ctrl.page = 1;
		getArticles(ctrl.page, countPage, true, 'rent');
		ctrl.rent = true;
		ctrl.sale = false;
	}

	/* Показать больше статей */
	function more() {

		var type = ctrl.sale ? "sale" : "rent";

		ctrl.page++;
		getArticles(ctrl.page, countPage, false, type);

	}

	/* functions get data articles on server */
	function getArticles(page, onPage, change, type) {

		var city = "",
			idCity,
			region = "",
			idRegion = "",
			controlUser = new restService(),
			urlRegion = "/lists/regions",
			successGetRegion = successGetRegion,
			errorGetRegion = errorGetRegion,

			urlCity = "/lists/cities/:id",
			idType = "",
			successGetCity = successGetCity,
			errorGetCity = errorGetCity,

			operationTypeUrl = "/lists/operation-types",
			successOperationType = successOperationType,
			errorOperationType = errorOperationType,

			urlArticle = '/get-announcements/last/:operationTypeId/:page/:onPage/:cityId',
			successGetArticle = successGetArticle,
			errorGetArticle = errorGetArticle,

			region,
			city;

		type = type || "sale";
		change = change || false;

		ymaps.ready(function(){
			var latitude,
				longitude;

			navigator.geolocation.getCurrentPosition(function(position) {
				latitude = position.coords.latitude;
				longitude = position.coords.longitude;

				var myGeocoder = ymaps.geocode([latitude, longitude]);
				myGeocoder.then(
					function (res) {
						var coords = res.geoObjects.get(0).geometry.getCoordinates();
						var myGeocoder = ymaps.geocode(coords, {kind: 'locality', json: true});
						myGeocoder.then(
							function (res) {
								var objectResult = res.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails.Country;

								city = objectResult.AddressLine;
								region = objectResult.AdministrativeArea.AdministrativeAreaName;

								controlUser.query(urlRegion, {}, {}, successGetRegion, errorGetRegion);
							}
						);
					});
			});

		});


		/* FUNCTIONS */

		/* Получаем регион */
		function successGetRegion(data) {
			for (var key in data.resource) {
				if (data.resource[key].name == region) {
					idRegion = data.resource[key].id;
				}
			}

			controlUser.query(urlCity, {id: idRegion}, {}, successGetCity, errorGetCity);
		}

		function errorGetRegion(response) {
			alert(constCollection.message.region);
		}

		/* Получаем город */
		function successGetCity(response) {

			for (var key in response.data) {
				if (response.data[key].name == city) {
					idCity = response.data[key].id;

					controlUser.query(operationTypeUrl, {}, {}, successOperationType, errorOperationType);

				}
			}

		}

		function errorGetCity(response) {
			alert(constCollection.message.city);
		}

		/* Получаем тип операции */
		function successOperationType(response) {

			for (var key in response.data) {
				if (response.data[key].type == type) {
					idType = response.data[key].id;

					controlUser.get(urlArticle, {
						operationTypeId: idType,
						page: page,
						onPage: onPage,
						cityId: idCity
					}, {}, successGetArticle, errorGetArticle);

				}
			}

		}

		function errorOperationType() {
			alert(constCollection.message.operation);
		}

		/* Получаем все данные для вывода */
		function successGetArticle(response) {

			ctrl.city = response.data.city['cityLocative'];

			if (change) {
				ctrl.articles = response.data.data;
			}
			else {
				for (var i = 0; i < response.data.data.length; i++) {
					ctrl.articles.push(response.data.data[i]);
				}
			}


			editPeriod(ctrl.articles);
			formedPrice(ctrl.articles);
			declensionInfo(ctrl.articles);


		}

		function errorGetArticle(data) {

			console.error(data);

		}


	}

	/* Разбивает цену на части */
	function splitPrice(string) {

		var reg = /\d{3}$/g,
			matches,
			str = string.toString(),
			round = Math.round(str),
			rest = str - round,
			newString = "";

		round = round.toString();
		rest = rest.toFixed(2).slice(-2);


		while (reg.test(round) == true) {
			matches = round.match(reg);
			round = round.replace(reg, "");
			newString = matches[0] + " " + newString;
		}

		newString = round + " " + newString;
		newString = newString.replace(/^\s/g, "");

		if(rest > 0){
			newString = newString.replace(/\s$/g, "");
			return newString + "." + rest;
		}
		else{
			return newString;
		}


	}

	/* Округляет площадь [array] - data*/
	function declensionInfo(array) {

		for (var i = 0; i < array.length; i++) {
			if (array[i]['realty']['areaUnit'].name == 'Кв. метры') {
				array[i]['realty']['areaUnit'].name = roundService.round(array[i]['realty']['area'], 'meters');
			}
			else if (array[i]['realty']['areaUnit'].name == 'Гектары') {
				array[i]['realty']['areaUnit'].name = roundService.round(array[i]['realty']['area'], 'hectares');
			}
			else if (array[i]['realty']['areaUnit'].name == 'Сотки') {
				array[i]['realty']['areaUnit'].name = roundService.round(array[i]['realty']['area'], 'sot');
			}
		}

	}

	/* Возвращает форматированную цену [array] - data*/
	function formedPrice(array) {

		for (var i = 0; i < array.length; i++) {

			var tempConvertedPrice = splitPrice(array[i]['convertedPrice'].toFixed(2)),
				tempPrice = splitPrice(array[i]['price']);

			if (array[i]['convertedCurrency'].name == '$') {

				if(!array[i]['period']){
					array[i]['period'] = {"name": ""}
				}

				array[i]['priceFormed'] = array[i]['convertedCurrency'].name + tempConvertedPrice + ' / ' + array[i]['period'].name + ' (' + tempPrice + " " + array[i]['currency'].name + ' / ' + array[i]['period'].name + ')';

			}
			else {

				array[i]['priceFormed'] = array[i]['currency'].name + tempPrice + ' (' + tempConvertedPrice + " " + array[i]['convertedCurrency'].name + ')';

			}

		}
	}

	/* Редактируем период [array] - data*/
	function editPeriod(array) {

		for (var i = 0; i < array.length; i++) {
			if (array[i]["period"]) {
				if (array[i]["period"].name == constCollection.period.month[0]) {
					array[i]["period"].name = constCollection.period.month[1];
				}
				else if (array[i]["period"].name == constCollection.period.day[0]) {
					array[i]["period"].name = constCollection.period.day[1];
				}
			}
		}

	}

}]);