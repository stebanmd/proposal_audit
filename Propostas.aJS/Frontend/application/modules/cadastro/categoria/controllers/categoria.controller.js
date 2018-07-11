(function(){
    'use strict';

    angular
        .module('PropostasApp.cadastro')
        .controller('CategoriaCtrl', CategoriaCtrl)

    
    function CategoriaCtrl($state, $stateParams, $timeout, $rootScope, CadastroViewService, CategoriaDataService, Utils){
        var vm = this;

        var model = {};
        var lista = [];
        
        angular.extend(this, {
            vm: vm,
            model: model,
            lista: lista,

            init: init,
            salvar: salvar,
            editar: editar,
            remover: remover,
            listar: listar,
            preparaFormEdit: preparaFormEdit
        });
        
        function init() {
            CadastroViewService.setView('categoria')
        }

        function listar(){
            CategoriaDataService.listarCategorias()
                .then(function(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        vm.lista.push(response.data[i]);
                    }
                })
        }

        function editar(id) {
            CategoriaDataService.carregarCategoria(id)
                .then(function(response) {
                    model.Categoria = response.data;
                })
        }

        function remover(id) {
            $rootScope.openModal('Erro!', 'Confirma a remoção do registro?', true)
                .then(function() {
                    startSpin();
                    CategoriaDataService.removerCategoria(id)
                        .then(function(response) {
                            vm.lista = [];
                            listar();
                            $rootScope.openModal('Sucesso!', response.data.Mensagem, false);                        
                            stopSpin();
                        })
                        .catch(function(err) {
                            $rootScope.openModal('Erro!', err.data.Mensagem, false);                        
                            stopSpin();
                        })
                })
        }

        function salvar() {
            startSpin();

            if (validar()) {
                CategoriaDataService.salvarCategoria(model.Categoria)
                    .then(function(response) {
                        if (response.data.Sucesso) {
                            model.Categoria = undefined;
                            $state.go('root.categoria-list');
                        } else {
                            console.error(response.data.Mensagem);
                            $rootScope.openModal('Erro!', 'Não é possível salvar o registro. Por favor contacte o administrador', false);
                        }
                        stopSpin();
                    })
                    .catch(function(err) {
                        var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
                        if (err.data.hasOwnProperty('Mensagem')) {
                            msg = err.data.Mensagem;
                        }
                        $rootScope.openModal('Erro!', msg, false);
                        stopSpin();
                    })
            } else {
                stopSpin();
            } 
        }

        function validar() {
            var erros = '';

            if (Utils.isNullOrEmpty(model.Categoria.Nome)) {
                erros += ' Informe o Nome;';
            }
            if (Utils.isNullOrEmpty(model.Categoria.Descricao)) {
                erros += ' Informe a Descrição;';
            }           

            if (!Utils.isNullOrEmpty(erros)) {
                erros += '  Por favor verifique os dados antes de continuar';
                $rootScope.openModal('Validação!', erros, false);
                return false;
            }
            return true;
        }

        function preparaFormEdit() {
            startSpin();

            if (!Utils.isNullOrEmpty($stateParams.id)) {
                editar($stateParams.id);
            }

            $timeout(function () {
                stopSpin();
            }, 1000);
        }

        function startSpin() {
            $('body').loading({
                message: "Aguarde..."
            });
        }

        function stopSpin() {
            $('body').loading('stop');
        }
    }
}());