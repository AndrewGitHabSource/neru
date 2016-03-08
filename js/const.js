angular.module('mainApp').constant("constCollection", {
	"url": "http://uhome.co/",
	"urlRest": {
		"urlCategory": "/lists/categories",
		"urlTypeCategory": "/lists/category-types/:categoryId",
		"urlRegions": "/lists/regions",
		"urlCity": "/lists/cities/:regionId",
		"urlDistricts": "/lists/districts/:cityId",
		"urlStreet": "/lists/streets/:cityId",
		"urlHouseNumber": "/lists/house-numbers/:streetId",
		"urlFlatNumber": "/lists/flat-numbers/:houseId",
		"urlMaterialWalk": "/lists/wall-materials",
		"urlWC": "/lists/wc",
		"urlBalconies": "/lists/balconies",
		"urlHeating": "/lists/heatings",
		"urlWaterHeating": "/lists/water-heatings",
		"urlNearObjects": "/lists/near-objects",
		"urlUnitsArea": "/lists/area-units",
		"urlCommunications": "/lists/communications",
		"urlTransportType": "/lists/transport-type",
		"urlParkingPlace": "/lists/parking-place",
		"urlInspectionPit": "/lists/inspection-pit",
		"urlImage": "http://uhome.co/api/v1/uploads/schema",
		"logout": "/api/v1/logout"
	},
	"path": "api/v1",
	"defaultAvatar": "/content/images/avatar.jpg",
	"fields": {
		"necessarily": "Поле обязательное для заполнения",
		"mailFormat": "Неправильный формат email",
		"mailPattern": new RegExp("^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$"),
		"notDegitPattern": new RegExp("^[0-9]+$"),
		"yearPattern": new RegExp("^[12][0-9]{3}$"),
		"float": new RegExp("^(?:(?:[0-9]+\.?)|(?:\.[0-9]+)|(?:[0-9]+\.[0-9]+))$"),
		"notDegit": "Введенное значение не является числом",
		"year": " Значение не является допустимым годом",
		"cadNumber": "Не верный формат кадастрового номера"
	},
	"message": {
		"region": "Невозможно получить регион",
		"city": "Невозможно получить город",
		"operation": "Не возможно получить операцию",
		"article": "Не возможно получить статью"
	},
	"units": {
		"meters": ["кв. метров", "кв. метр", "кв. метра"],
		"hectares": ["гектаров", "гектар", "гектара"],
		"sot": ["соток", "сотка", "сотки"]
	},
	"period": {
		"month": ["За месяц", "месяц"],
		"day": ["Посуточно", "сутки"]
	},
	"advert": {
		"step1Title": "Добавление объявления - Шаг 1. Адрес объекта недвижимости",
		"step2Title": "Добавление объявления - Шаг 2. Характеристики объекта недвижимости"
	}
});