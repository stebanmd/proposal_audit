(function(){
    'use strict';

    angular
        .module('PropostasApp.cadastro')
        .service('PropostaDataService', PropostaDataService)

    /** @ngInject */
    function PropostaDataService($http, AppConfigs){

        return {
            pesquisarPropostas: pesquisarPropostas,
            carregarProposta: carregarProposta,
            removerProposta: removerProposta,
            salvarProposta: salvarProposta,
            carregarHistorico: carregarHistorico,
            aprovarProposta: aprovarProposta,
            reprovarProposta: reprovarProposta,
            uploadArquivo: uploadArquivo
        }

        function pesquisarPropostas(filtro) {
            return $http({
                method: 'POST',
                url: AppConfigs.apiEndpoint + '/api/proposta/pesquisar',
                data: filtro
            });
        }

        function carregarProposta(id) {
            return $http({
                method: 'GET',
                url: AppConfigs.apiEndpoint + '/api/proposta/carregar/' + id
            });
        }

        function removerProposta(id) {
            return $http({
                method: 'DELETE',
                url: AppConfigs.apiEndpoint + '/api/proposta/remover/' + id
            });
        }

        function salvarProposta(model) {
            return $http({
                method: 'POST',
                url: AppConfigs.apiEndpoint + '/api/proposta/gravar',
                data: model
            });
        }

        function carregarHistorico(idProposta) {
            return $http({
                method: 'GET',
                url: AppConfigs.apiEndpoint + '/api/proposta/historico/' + idProposta
            });
        }

        function aprovarProposta(id) {
            return $http({
                method: 'PUT',
                url: AppConfigs.apiEndpoint + '/api/proposta/aprovar/' + id
            });
        }

        function reprovarProposta(id) {
            return $http({
                method: 'PUT',
                url: AppConfigs.apiEndpoint + '/api/proposta/reprovar/' + id
            });
        }   

        function uploadArquivo(model) {
            return $http({
                method:"POST",
                url: AppConfigs.apiEndpoint + '/api/proposta/upload-file',
                data: model
            });
        }
    
    }
}());