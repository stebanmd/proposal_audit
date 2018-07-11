(function(){
    'use strict';

    angular
        .module('PropostasApp.cadastro')
        .service('UsuarioDataService', UsuarioDataService)

    function UsuarioDataService($http, AppConfigs){

        return {
            listarUsuarios: listarUsuarios,
            carregarUsuario: carregarUsuario,
            salvarUsuario: salvarUsuario,
            removerUsuario: removerUsuario,
            mudarSenhaUsuario: mudarSenhaUsuario
        }

        function listarUsuarios(){
            return $http({
                method: 'GET',
                url: AppConfigs.apiEndpoint + '/api/usuario/listar'
            });
        }

        function carregarUsuario(id) {
            return $http({
                method: 'GET',
                url: AppConfigs.apiEndpoint + '/api/usuario/carregar/' + id
            });
        }

        function salvarUsuario(model) {
            return $http({
                method: 'POST',
                url: AppConfigs.apiEndpoint + '/api/usuario/salvar',
                data: model
            });
        }

        function removerUsuario(id) {
            return $http({
                method: 'DELETE',
                url: AppConfigs.apiEndpoint + '/api/usuario/remover/' + id
            });
        }

        function mudarSenhaUsuario(model) {
            return $http({
                method: 'POST',
                url: AppConfigs.apiEndpoint + '/api/usuario/mudar-senha',
                data: model
            });
        }
    }
}());