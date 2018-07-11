(function(){
    'use strict';

    angular
        .module('PropostasApp.cadastro')
        .service('FornecedorDataService', FornecedorDataService)

    /** @ngInject */
    function FornecedorDataService($http, AppConfigs) {
		
		return {
			listarFornecedores: listarFornecedores,
			carregarFornecedor: carregarFornecedor,
			removerFornecedor: removerFornecedor,
			salvarFornecedor: salvarFornecedor
		}

		function listarFornecedores() {
			return $http({
				method: 'GET',
				url: AppConfigs.apiEndpoint + '/api/fornecedor/listar'
			});
		}

		function carregarFornecedor(id) {
			return $http({
				method: 'GET',
				url: AppConfigs.apiEndpoint + '/api/fornecedor/carregar/' + id
			});
		}

		function removerFornecedor(id) {
			return $http({
				method: 'DELETE',
				url: AppConfigs.apiEndpoint + '/api/fornecedor/remover/' + id
			});
		}

		function salvarFornecedor(model) {
			return $http({
				method: 'POST',
				url: AppConfigs.apiEndpoint + '/api/fornecedor/salvar',
				data: model
			});
		}
	}

}());