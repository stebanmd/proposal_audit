(function () {
	'use strict';

	angular
		.module('PropostasApp.login')
		.service('LoginDataService', LoginDataService)

	LoginDataService.$inject = ['$http', 'AppConfigs'];

	function LoginDataService($http, AppConfigs) {

		function efetuarLogin(cpf, senha) {

			return $http({
                method: 'POST',
                url: AppConfigs.apiEndpoint + '/auth',
                data: $.param({
					"username": cpf,
					"password": senha,
					"grant_type": "password"
				}),
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
		}

		return {           
			efetuarLogin: efetuarLogin
		};
	}
}());
