angular.module('mainApp').controller('authControllerModal', ['$scope', 'constCollection', '$uibModalInstance', function ($scope, constCollection, $uibModalInstance) {
	var ctrl = this;

	$scope.messages = constCollection.fields;

	$scope.email = null;
	$scope.password = null;

	$scope.cancel = cancel;

	$scope.sendData = sendData;





	function cancel() {
		$uibModalInstance.dismiss('cancel');
	}

	function sendData(form){
		if (form.$valid) {

		}
	}
}]);