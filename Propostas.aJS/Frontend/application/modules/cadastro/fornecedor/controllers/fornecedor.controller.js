(function(){
    'use strict';

    angular
        .module('PropostasApp.cadastro')
        .controller('FornecedorCtrl', FornecedorCtrl)

    /** @ngInject */
    function FornecedorCtrl($state, $stateParams, $timeout, $rootScope, CadastroViewService, FornecedorDataService, Utils){
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
            preparaFormEdit: preparaFormEdit,
            alteraTipoPessoa: alteraTipoPessoa
        });
        
        function init() {
            CadastroViewService.setView('fornecedor')
        }

        function listar(){
            FornecedorDataService.listarFornecedores()
                .then(function(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        vm.lista.push(response.data[i]);
                    }
                })
        }

        function editar(id) {
            FornecedorDataService.carregarFornecedor(id)
                .then(function(response) {
                    model.Fornecedor = response.data;
                    model.Fornecedor.TipoPessoa = (model.Fornecedor.Documento.length == 11)  ? 'F': 'J';
                })
        }

        function remover(id) {
            $rootScope.openModal('Erro!', 'Confirma a remoção do registro?', true)
                .then(function() {
                    startSpin();
                    FornecedorDataService.removerFornecedor(id)
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
                model.Fornecedor.Documento = Utils.limpaMascara(model.Fornecedor.Documento);               
                
                FornecedorDataService.salvarFornecedor(model.Fornecedor)
                    .then(function(response) {
                        if (response.data.Sucesso) {
                            model.Fornecedor = undefined;
                            $state.go('root.fornecedor-list');
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

            if (Utils.isNullOrEmpty(model.Fornecedor.Nome)) {
                erros += ' Informe o Nome;';
            }
            if (Utils.isNullOrEmpty(model.Fornecedor.Documento)) {
                erros += ' Informe o {documento};';
            } 
            else if (!Utils.isValidCPFCNPJ(model.Fornecedor.Documento)) {
                erros += ' {documento} é inválido;';
            }
            if (Utils.isNullOrEmpty(model.Fornecedor.Email)) {
                erros += ' Informe o E-mail;';
            }
            else if (!Utils.isValidEmail(model.Fornecedor.Email)) {
                erros += ' E-mail em formato incorreto;'
            }        

            if (!Utils.isNullOrEmpty(erros)) {
                erros = erros.replace('{documento}', model.Fornecedor.TipoPessoa == 'F' ? 'CPF': 'CNPJ')
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
            } else {
                vm.model.Fornecedor = {};
                vm.model.Fornecedor.TipoPessoa = 'F';
            }

            $timeout(function () {
                aplicaMask();
                stopSpin();
            }, 1000);
        }

        function alteraTipoPessoa() {
            vm.model.Fornecedor.Documento = '';
        }

        function aplicaMask() {
            $('.cpf').mask('000.000.000-00', { placeholder: "___.___.___-__" });
            $('.cnpj').mask('00.000.000/0000-00', { placeholder: "__.___.___/____-__" });
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