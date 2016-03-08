'use strict';

angular.module('mainServices', []);

angular
	.module('mainServices')
	.factory('restService', ['$resource', 'constCollection',
		function ($resource, constCollection) {

			return function () {


				this.get = get;
				this.query = query;
				this.put = put;
				this.post = post;
				this.remove = remove;




				/* FUNCTIONS */

				/* Получаем данные с сервера */
				function init(url, params, data, successFunction, errorFunction, headers) {

					var emptyFunc = function () {},
						res;

					url = constCollection.url + constCollection.path + url;
					params = params || {};
					data = data || {};
					successFunction = successFunction || emptyFunc;
					errorFunction = errorFunction || emptyFunc;
					headers = headers || {};


					res = $resource(url, params, {
						get: {
							method: 'GET',
							headers: headers,
							interceptor: {
								response: successFunction,
								responseError: function (resp) {
									errorFunction(resp);
									if (resp.status === 401) {
										alert('bad token');
									}
								}
							},
							isArray: false
						},
						query: {
							method: 'GET',
							headers: headers,
							interceptor: {
								response: successFunction,
								responseError: function (resp) {
									errorFunction(resp);
									if (resp.status === 401) {
										alert('bad token');
									}
								}
							},
							isArray: true
						},
						put: {
							method: 'PUT',
							headers: headers,
							interceptor: {
								response: successFunction,
								responseError: function (resp) {
									errorFunction(resp);
									if (resp.status === 401) {
										alert('bad token');
									}
								}
							}
						},
						post: {
							method: 'POST',
							headers: headers,
							interceptor: {
								response: successFunction,
								responseError: function (resp) {
									errorFunction(resp);
									if (resp.status === 401) {
										alert('bad token');
									}
								}
							}
						},
						delete: {
							method: 'DELETE',
							headers: headers,
							interceptor: {
								response: successFunction,
								responseError: function (resp) {
									errorFunction(resp);
									if (resp.status === 401) {
										alert('bad token');
									}
								}
							}
						}

					});

					return res;
				}

				function get(url, params, data, successFunction, errorFunction, headers) {

					return init(url, params, data, successFunction, errorFunction, headers).get(data);

				}

				function query(url, params, data, successFunction, errorFunction, headers) {

					return init(url, params, data, successFunction, errorFunction, headers).query(data);

				}

				function put(url, params, data, successFunction, errorFunction, headers) {

					return init(url, params, data, successFunction, errorFunction, headers).put(data);
				}

				function post(url, params, data, successFunction, errorFunction, headers) {

					return init(url, params, data, successFunction, errorFunction, headers).post(data);
				}

				function remove(url, params, data, successFunction, errorFunction, headers) {

					return init(url, params, data, successFunction, errorFunction, headers).delete(data);
				}
			};


		}]);