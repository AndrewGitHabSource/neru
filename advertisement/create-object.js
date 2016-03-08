angular.module('mainApp').controller('createObject', ['restService', '$scope', '$cookies', 'uiUploader',
			'constCollection', '$state', function (restService, $scope, $cookies, uiUploader, constCollection, $state) {

		var ctrl = this,
			rest = new restService(),
			user = $cookies.get('user') ? JSON.parse($cookies.get('user')) : {},
			sendObject = sessionStorage.getItem('sendObject') ? JSON.parse(sessionStorage.getItem('sendObject')) : {},
			categoryType = sessionStorage.getItem('categoryType') ? JSON.parse(sessionStorage.getItem('categoryType')) : {},
			urlMaterialWalk = constCollection.urlRest.urlMaterialWalk,
			urlWC = constCollection.urlRest.urlWC,
			urlBalconies = constCollection.urlRest.urlBalconies,
			urlHeating = constCollection.urlRest.urlHeating,
			urlWaterHeating = constCollection.urlRest.urlWaterHeating,
			urlNearObjects = constCollection.urlRest.urlNearObjects,
			urlUnitsArea = constCollection.urlRest.urlUnitsArea,
			urlCommunications = constCollection.urlRest.urlCommunications,
			urlTransportType = constCollection.urlRest.urlTransportType,
			urlParkingPlace = constCollection.urlRest.urlParkingPlace,
			urlInspectionPit = constCollection.urlRest.urlInspectionPit;

		ctrl.messages = constCollection.fields;

		ctrl.title = constCollection.advert.step1Title;

		ctrl.showObject = {};

		ctrl.realty = {"list": {}};

		ctrl.typeRealty = JSON.parse(sessionStorage.getItem("typeRealty"));

		ctrl.realty.area = null;

		ctrl.realty.list.materialWall = [];
		ctrl.realty.wallMaterialSelected = null;

		ctrl.realty.livingArea = null;

		ctrl.realty.roomCount = null;

		ctrl.realty.kitchenArea = null;

		ctrl.realty.floor = null;
		ctrl.realty.floorNumber = null;

		ctrl.realty.list.WC = [];
		ctrl.realty.wcSelected = null;

		ctrl.realty.buildYear = null;

		ctrl.realty.list.balconies = [];
		ctrl.realty.balconySelected = null;

		ctrl.realty.list.heating = [];
		ctrl.realty.heatingSelected = null;

		ctrl.realty.list.waterHeating = [];
		ctrl.realty.waterHeatingSelected = null;

		ctrl.realty.list.nearObjects = [];
		ctrl.realty.nearObjectsSelected = [];

		ctrl.realty.list.communications = [];
		ctrl.realty.communicationSelected = [];

		ctrl.realty.landArea = null;

		ctrl.realty.list.areaUnits = [];
		ctrl.realty.areaUnitsHomestatedSel = null;
		ctrl.realty.areaUnitsSquareSel = null;

		ctrl.realty.effectiveArea = null;

		ctrl.realty.list.transportType = [];
		ctrl.realty.transportTypeSelected = null;

		ctrl.realty.list.parkingPlace = [];
		ctrl.realty.parkingPlaceSelected = null;

		ctrl.realty.list.inspectionPit = [];
		ctrl.realty.inspectionPitSelected = null;

		ctrl.realty.schema = "";

		ctrl.realty.list.categoryFlat = false;
		ctrl.realty.list.categoryHouse = false;
		ctrl.realty.list.categoryParcels = false;
		ctrl.realty.list.commercialReal = false;
		ctrl.realty.list.garage = false;

		ctrl.nextClick = true;

		ctrl.statePage = 1;

		ctrl.selectObject = selectObject;

		ctrl.createdObject = {};

		ctrl.uploadImage = sessionStorage.getItem("uploadImage") || "";
		ctrl.uploaded = sessionStorage.getItem("uploadImage") ? true : false;
		ctrl.uploadImageFunction = uploadImageFunction;

		ctrl.decrementRoom = decrementRoom;
		ctrl.incrementRoom = incrementRoom;
		ctrl.inputBlur = inputBlur;

		ctrl.createObject = createObject;

		ctrl.backOnCheck = backOnCheck;

		ctrl.deletePhoto = deletePhoto;

		ctrl.errorPhoto = null;







		init();




		/* FUNCTIONS */

		function init() {

			setTypeOnCategory();

			if(sessionStorage.getItem("realtyCreated")){
				ctrl.realty = JSON.parse(sessionStorage.getItem("realtyCreated"));
			}
			else{
				rest.query(urlMaterialWalk, {}, {}, successMaterialWalk, error);
				rest.query(urlWC, {}, {}, successWC, error);
				rest.query(urlBalconies, {}, {}, successBalconies, error);
				rest.query(urlHeating, {}, {}, successHeating, error);
				rest.query(urlWaterHeating, {}, {}, successWaterHeating, error);
				rest.query(urlNearObjects, {}, {}, successNearObjects, error);
				rest.query(urlUnitsArea, {}, {}, successHomestead, error);
				rest.query(urlCommunications, {}, {}, successCommunications, error);
				rest.query(urlTransportType, {}, {}, successTransportType, error);
				rest.query(urlParkingPlace, {}, {}, successParkingPlace, error);
				rest.query(urlInspectionPit, {}, {}, successInspectionPit, error);
			}

			var element = document.getElementById('file');
			element.addEventListener('change', function (e) {
				var files = e.target.files;
				uiUploader.addFiles(files);
				$scope.files = uiUploader.getFiles();
				$scope.$apply();
				uploadImageFunction();
			});

			if(!ctrl.realty.list.categoryParcels){
				ctrl.realty.roomCount = 1;
			}


		}

		/* Очищаем изображение */
		function deletePhoto(){
			ctrl.realty.schema = "";
			ctrl.uploaded = false;
			sessionStorage.removeItem('uploadImage');
		}

		/* Уменшаем количество комнат */
		function decrementRoom() {
			if (ctrl.realty.roomCount > 1) {
				ctrl.realty.roomCount = parseInt(ctrl.realty.roomCount) - 1;
			}
		}

		/* Увеличиваем количество комнат */
		function incrementRoom() {
			ctrl.realty.roomCount = parseInt(ctrl.realty.roomCount) + 1;
		}

		/* потеря фокуса у поля количество комнат */
		function inputBlur(e){
			var exp = +e.target.value;

			if(e.target.value == "" || !exp){
				e.target.value = 1;
				ctrl.realty.roomCount = e.target.value;
			}
		}

		/* Устанавливаем нужную категорию которая пришла с первого шага */
		function setTypeOnCategory() {
			switch (categoryType) {
				case 'flats' :
					resetCategory();
					ctrl.realty.list.categoryFlat = true;
					break;
				case 'houses' :
					resetCategory();
					ctrl.realty.list.categoryHouse = true;
					break;
				case 'parcels' :
					resetCategory();
					ctrl.realty.list.categoryParcels = true;
					break;
				case 'commercial-property' :
					resetCategory();
					ctrl.realty.list.commercialReal = true;
					break;
				case 'garages' :
					resetCategory();
					ctrl.realty.list.garage = true;
					break;
			}
		}

		function resetCategory() {
			ctrl.realty.list.categoryFlat = false;
			ctrl.realty.list.categoryHouse = false;
			ctrl.realty.list.categoryParcels = false;
			ctrl.realty.list.commercialReal = false;
			ctrl.realty.list.garage = false;
		}

		/* Функция загрузки изображения на сервер */
		function uploadImageFunction(e) {
			var obj;

			uiUploader.startUpload({
				url: constCollection.urlRest.urlImage,
				concurrency: 2,
				onProgress: function (file) {
					$scope.$apply();
				},
				onCompleted: function (file, response) {
					obj = JSON.parse(response);

					if(obj.errors){
						ctrl.errorPhoto = obj.errors;
						$scope.$apply();
					}
					else{
						ctrl.uploadImage = constCollection.url + obj.thumbnails[1].path;
						sessionStorage.setItem("uploadImage", ctrl.uploadImage);
						ctrl.uploaded = true;

						ctrl.realty.schema = obj.id;
						ctrl.showObject.schema = obj;

						$scope.$apply();
					}
				},
				"headers": {
					"token": user.token
				}
			});
		}

		/* Выбор чекбокса */
		function selectObject(elem, event, select) {
			var targetElement = angular.element(event.target);

			if(targetElement.hasClass("selected") || targetElement.parent().hasClass("selected")){
				for(var i = 0; i < select.length; i++){
					if(select[i].id == elem.id){
						select.splice(i, 1);
						elem.checked = false;
					}
				}
			}
			else{
				elem.checked = true;
				select.push(elem);
			}

			if (targetElement.hasClass("icon-select")) {
				targetElement.parent().toggleClass("selected");
			}
			else {
				targetElement.toggleClass("selected");
			}
		}

		/* Успешно загружен материал стен */
		function successMaterialWalk(response) {
			ctrl.realty.list.materialWall = response.data;
			if(!ctrl.realty.list.categoryParcels){
				ctrl.realty.wallMaterialSelected = response.data[0];
			}
		}

		/* Успешно загружены санузлы */
		function successWC(response) {
			ctrl.realty.list.WC = response.data;
			if(!ctrl.realty.list.categoryParcels && !ctrl.realty.list.garage){
				ctrl.realty.wcSelected = response.data[0];
			}
		}

		/* Успешно загружены санузлы */
		function successBalconies(response) {
			ctrl.realty.list.balconies = response.data;
			if(!ctrl.realty.list.categoryParcels && !ctrl.realty.list.commercialReal && !ctrl.realty.list.garage){
				ctrl.realty.balconySelected = response.data[0];
			}
		}

		/* Успешно загружены отопление */
		function successHeating(response) {
			ctrl.realty.list.heating = response.data;
			if(!ctrl.realty.list.categoryParcels){
				ctrl.realty.heatingSelected = response.data[0];
			}
		}

		/* Успешно загружено подогрев воды */
		function successWaterHeating(response) {
			ctrl.realty.list.waterHeating = response.data;
			if(!ctrl.realty.list.categoryParcels && !ctrl.realty.list.garage){
				ctrl.realty.waterHeatingSelected = response.data[0];
			}
		}

		/* Успешно загружены ближайшие объекты */
		function successNearObjects(response) {
			ctrl.realty.list.nearObjects = response.data;
		}

		/* Успешно загружены участки */
		function successHomestead(response) {
			ctrl.realty.list.areaUnits = response.data;
			ctrl.realty.areaUnitsSquareSel = response.data[0];
			ctrl.realty.areaUnitsHomestatedSel = response.data[1];
		}

		/* Успешно загружены тип транспорта */
		function successTransportType(response) {
			if(ctrl.realty.list.garage){
				ctrl.realty.transportTypeSelected = response.data[0];
			}
			ctrl.realty.list.transportType = response.data;
		}

		/* Успешно загружены коммуникации */
		function successCommunications(response) {
			ctrl.realty.list.communications = response.data;
		}

		/* Успешно загружены парковочные места */
		function successParkingPlace(response) {
			if(ctrl.realty.list.garage){
				ctrl.realty.parkingPlaceSelected = response.data[0];
			}
			ctrl.realty.list.parkingPlace = response.data;
		}

		/* Успешно загружено смотровая яма */
		function successInspectionPit(response) {
			if(ctrl.realty.list.garage){
				ctrl.realty.inspectionPitSelected = response.data[0];
			}
			ctrl.realty.list.inspectionPit = response.data;
		}

		/* Ошибка которую вернул сервер */
		function error(response) {
			console.error(response);
		}

		/* Отправка создаваемого объекта на сервер */
		function createObject(form) {
			var urlValidate = "",
				strProperty = "",
				expression = new RegExp('Selected', 'g');

			if (form.$valid) {
				/* Устанавливаем нужную категорию */
				switch (categoryType) {
					case 'flats' :
						urlValidate = '/realties/flats/validate';
						break;
					case 'houses' :
						urlValidate = '/realties/houses/validate';
						break;
					case 'parcels' :
						urlValidate = '/realties/parcels/validate';
						break;
					case 'commercial-property' :
						urlValidate = '/realties/commercials/validate';
						break;
					case 'garages' :
						urlValidate = '/realties/garages/validate';
						break;
				}

				/* Собираем все данные в объект для отправки на сервер */
				for(var key in ctrl.realty){
					if(key == "areaUnitsHomestatedSel" || !ctrl.realty[key] || key == "areaUnitsSquareSel" || key == "list"){
						continue;
					}
					else{
						if(key.match(expression)){
							strProperty = key.replace(expression, "");
							if(strProperty == "communication" || strProperty == "nearObjects"){
								if(ctrl.realty[key].length > 0){
									ctrl.createdObject[strProperty] = ctrl.realty[key];
									ctrl.showObject[strProperty] = ctrl.realty[key];
								}
							}
							else{
								ctrl.createdObject[strProperty] = ctrl.realty[key].id;
								ctrl.showObject[strProperty] = ctrl.realty[key];
							}
						}
						else{
							ctrl.createdObject[key] = ctrl.realty[key];
							if(key != 'schema'){
								ctrl.showObject[key] = ctrl.realty[key];
							}
						}
					}
				}

				/* Собираем данные из первого шага */
				for(var key in sendObject){
					if(key == 'show')
						continue;

					if(sendObject[key]){
						ctrl.createdObject[key] = sendObject[key];
					}
				}

				for(var key in sendObject.show){
					if(sendObject.show[key]){
						ctrl.showObject[key] = sendObject.show[key];
					}
				}

				/* Распределяем оставшиеся данные */
				if(categoryType == 'commercial-property'){
					ctrl.createdObject.areaUnit = ctrl.realty.areaUnitsHomestatedSel.id;
					ctrl.showObject.areaUnit = ctrl.realty.areaUnitsHomestatedSel;
				}
				if (categoryType == 'flats'){
					ctrl.createdObject.areaUnit =  ctrl.realty.areaUnitsSquareSel.id;
					ctrl.showObject.areaUnit =  ctrl.realty.areaUnitsSquareSel;
				}
				if (categoryType == 'parcels'){
					ctrl.createdObject.areaUnit =  ctrl.realty.areaUnitsSquareSel.id;
					ctrl.showObject.areaUnit =  ctrl.realty.areaUnitsSquareSel;
				}
				if (categoryType == 'houses'){
					ctrl.createdObject.areaUnit =  ctrl.realty.areaUnitsSquareSel.id;
					ctrl.createdObject.landAreaUnit =  ctrl.realty.areaUnitsHomestatedSel.id;
					ctrl.showObject.areaUnit =  ctrl.realty.areaUnitsSquareSel;
					ctrl.showObject.landAreaUnit =  ctrl.realty.areaUnitsHomestatedSel;
				}
				if (categoryType == 'garages'){
					ctrl.createdObject.areaUnit =  ctrl.realty.areaUnitsSquareSel.id;
					ctrl.showObject.areaUnit =  ctrl.realty.areaUnitsSquareSel;
				}

				ctrl.nextClick = false;

				rest.post(urlValidate, {}, ctrl.createdObject, successValidate, error, {"token": user.token});
			}

		}

		/* Сперва проверяем данные */
		function successValidate(response) {
			if (response.statusText == "OK") {

				sessionStorage.removeItem('checkObject');
				sessionStorage.removeItem('createdObject');
				sessionStorage.removeItem('statePage');
				sessionStorage.removeItem('realtyCreated');

				sessionStorage.setItem('checkObject', JSON.stringify(ctrl.showObject));
				sessionStorage.setItem('createdObject', JSON.stringify(ctrl.createdObject));
				sessionStorage.setItem('statePage', ctrl.statePage);
				sessionStorage.setItem('realtyCreated', JSON.stringify(ctrl.realty));
				$state.go('check');
			}
		}

		/* Вернуться назад на проверку */
		function backOnCheck() {
			$state.go('compareObject');
		}

	}]);