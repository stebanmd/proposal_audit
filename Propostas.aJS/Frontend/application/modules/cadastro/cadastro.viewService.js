(function () {
    'use strict';

    CadastroViewService.$inject = [];
    function CadastroViewService() {
        var vm = this;
        var model = {};

        model.view = '';

        /**Views:
         * - usuario
         * - categoria
         * - fornecedor
         * - proposta
         */

		function setView(view) {
            model.view = view;
        }
        
        return {
            vm: vm,
            model: model,
            setView : setView
        };        
    }
    angular
        .module('PropostasApp.cadastro')
        .factory('CadastroViewService', CadastroViewService);

})();
