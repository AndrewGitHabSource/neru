'use strict';

angular.module('mainApp', ['ngSanitize', 'ui.mask', 'ui.uploader', 'ui.select', 'ui.bootstrap', 'ngResource',
	'mainServices', 'mainCtrl', 'registration', 'ngCookies', 'auth', 'ui.router', 'mainDirectiveApp', 'mainDirectives', 'cookieService']);

angular.element(document).ready(function () {
	angular.bootstrap(document, ['mainApp']);
});

