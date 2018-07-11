(function () {
	'use strict';

	angular
		.module('PropostasApp.cadastro')
		.service('CategoriaDataService', CategoriaDataService)

	/** @ngInject */
	function CategoriaDataService($http, AppConfigs) {

		return {
			listarCategorias: listarCategorias,
			carregarCategoria: carregarCategoria,
			removerCategoria: removerCategoria,
			salvarCategoria: salvarCategoria
		}

		function listarCategorias() {
			return $http({
				method: 'GET',
				url: AppConfigs.apiEndpoint + '/api/categoria/listar'
			});
		}

		function carregarCategoria(id) {
			return $http({
				method: 'GET',
				url: AppConfigs.apiEndpoint + '/api/categoria/carregar/' + id
			});
		}

		function removerCategoria(id) {
			return $http({
				method: 'DELETE',
				url: AppConfigs.apiEndpoint + '/api/categoria/remover/' + id
			});
		}

		function salvarCategoria(model) {
			return $http({
				method: 'POST',
				url: AppConfigs.apiEndpoint + '/api/categoria/salvar',
				data: model
			});
		}
	}

}());
