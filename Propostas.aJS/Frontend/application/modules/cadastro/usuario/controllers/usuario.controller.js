(function(){
    'use strict';

    angular
        .module('PropostasApp.cadastro')
        .controller('UsuarioCtrl', UsuarioCtrl)

    
    function UsuarioCtrl($state, $stateParams, $timeout, $rootScope, UsuarioDataService, CadastroViewService, Utils, SessionService){
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
            preparaMudarSenha: preparaMudarSenha,
            mudarSenha: mudarSenha
        });

        model.arrayPerfis = [
            { description: "Administrador", value: 0 },
            { description: "Analista Comercial", value: 1 },
            { description: "Analista Financeiro", value: 2 },
            { description: "Diretor Financeiro", value: 3 }
        ];
        
        function init() {
            CadastroViewService.setView('usuario')
        }

        function listar(){
            UsuarioDataService.listarUsuarios()
                .then(function(response) {
                    for (var i = 0; i < response.data.length; i++) {
                        vm.lista.push(response.data[i]);
                    }
                })
        }

        function salvar() {
            startSpin();

            if (validarUsuario()) {
                model.Usuario.CPF = Utils.limpaMascara(model.Usuario.CPF);               
                model.Usuario.DataNascimento = Utils.toSystemDate(model.Usuario.DataNascFormatada);

                UsuarioDataService.salvarUsuario(model.Usuario)
                    .then(function(response) {
                        if (response.data.Sucesso) {
                            model.Usuario = undefined;
                            $state.go('root.usuario-list');
                        } else {
                            $rootScope.openModal('Erro!', response.data.Mensagem, false);
                        }
                        stopSpin();
                    })
                    .catch(function(err) {
                        var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
                        if (err.data != null && err.data.hasOwnProperty('Mensagem')) {
                            msg = err.data.Mensagem;
                        }
                        $rootScope.openModal('Erro!', msg, false);
                        stopSpin();
                    })
            } else {
                stopSpin();
            }        
        }

        function validarUsuario() {
            var erros = '';

            if (Utils.isNullOrEmpty(model.Usuario.Nome)) {
                erros += ' Informe o Nome;';
            }
            else if (!Utils.isValidName(model.Usuario.Nome)) {
                erros += ' Favor informar nome e sobrenome;';
            }
            if (Utils.isNullOrEmpty(model.Usuario.CPF)) {
                erros += ' Informe o CPF;';
            }
            else if (!Utils.isValidCPFCNPJ(model.Usuario.CPF)){
                erros += ' CPF inválido;';
            }
            if (typeof model.Usuario.DataNascFormatada === 'undefined' || model.Usuario.DataNascFormatada == '' || (!Utils.isValidBirthDate(model.Usuario.DataNascFormatada))) {
                erros += ' Informe sua data de nascimento corretamente;'
            }
            if (model.Usuario.ID === undefined || (model.Usuario.ID !== undefined && model.Usuario.ID == 0)) {
                if (Utils.isNullOrEmpty(model.Usuario.Senha)) {
                    erros += ' Informe a Senha;'
                }
            }

            if (!Utils.isNullOrEmpty(erros)) {
                erros += '  Por favor verifique os dados antes de continuar';
                $rootScope.openModal('Validação!', erros, false);
                return false;
            }
            return true;
        }

        function editar(id) {
            UsuarioDataService.carregarUsuario(id)
                .then(function(response) {
                    model.Usuario = response.data;
                    model.Usuario.DataNascFormatada = Utils.toLocalDate(model.Usuario.DataNascimento);

                    var usuarioAtual = JSON.parse(SessionService.get('CurrentUser'));
                    if (usuarioAtual.Perfil === 'Administrador') {
                        model.PodeMudarSenha = true;
                    }
                })
        }

        function remover(user) {
            if (user.Perfil == 0) {
                $rootScope.openModal('Erro!', 'Não é possível remover o Administrador', false);
                return;
            }

            $rootScope.openModal('Erro!', 'Confirma a remoção do registro?', true)
                .then(function() {
                    startSpin();
                    UsuarioDataService.removerUsuario(user.ID)
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

        function preparaFormEdit() {
            startSpin();
            if (!Utils.isNullOrEmpty($stateParams.id)) {
                editar($stateParams.id);
            }
            $timeout(function () {
                aplicaMask();
                stopSpin();
            }, 1000);
        }

        function preparaMudarSenha() {
            vm.model.MudarSenha = {};
            if (!Utils.isNullOrEmpty($stateParams.user)) {
                var usuarioAtual = JSON.parse(SessionService.get('CurrentUser'));

                if (usuarioAtual.ID !== $stateParams.user) {
                    if (usuarioAtual.Perfil === 'Administrador') {
                        vm.model.MudarSenha.UsuarioDiferente = true;
                        vm.model.MudarSenha.IdUsuario = $stateParams.user;
                    }
                }
            }
        }

        function mudarSenha() {
            startSpin();
            UsuarioDataService.mudarSenhaUsuario(model.MudarSenha)
                .then(function(response) {
                    if (response.data.Sucesso) {
                        vm.model.MudarSenha = {};
                        $rootScope.goBack();
                        $rootScope.openModal('Sucesso!', 'Senha alterada com sucesso!');
                    }
                    else {
                        $rootScope.openModal('Ops..', response.data.Mensagem);
                    }
                    stopSpin();
                })
                .catch(function(err) {
                    var msg = 'Não é possível salvar o registro. Por favor contacte o administrador';
                    if (err.data != null && err.data.hasOwnProperty('Mensagem')) {
                        msg = err.data.Mensagem;
                    }
                    $rootScope.openModal('Erro!', msg, false);
                })
        }

        function aplicaMask() {
            $('.cpf').mask('000.000.000-00', { placeholder: "___.___.___-__" });
            $('.date').mask('00/00/0000', { placeholder: "__/__/____" });
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