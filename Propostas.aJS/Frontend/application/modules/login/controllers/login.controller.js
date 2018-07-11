(function(){
    'use strict';
    
    LoginCtrl.$inject = ['$state', '$timeout', '$rootScope', 'LoginDataService', 'Utils', 'SessionService', 'CadastroViewService'];
    function LoginCtrl($state, $timeout, $rootScope, LoginDataService, Utils, SessionService, CadastroViewService){
        var vm = this;
        var model = {};

        angular.extend(this, {
            vm: vm,
            model: model,
                                   
            init: init,
            login: login
        });
        
        function init() {
            startSpin();
            CadastroViewService.setView('');
            $timeout(function () {
                $('.cpf').mask('000.000.000-00', { placeholder: "___.___.___-__" });
                stopSpin();
            }, 1);
        }

        function login() {
            startSpin();

            if (model.CPF === 'undefined' || Utils.isNullOrEmpty(model.CPF) || Utils.isNullOrEmpty(model.Senha)) {
                $rootScope.openModal('Erro', 'Por favor, informe os dados de acesso.', false);
                return false;
            }

            var cpfSemMascara = Utils.limpaMascara(model.CPF);
            LoginDataService.efetuarLogin(cpfSemMascara, model.Senha)
                .then(function (response) {
                    var expirationDate = new Date();
                    expirationDate.setSeconds(expirationDate.getSeconds() + response.data.expires_in);

                    SessionService.set('BearerTokenKey', response.data.access_token);
                    SessionService.set('BearerTokenExpiresIn', expirationDate);
                    SessionService.set('CurrentUser', JSON.stringify({
                        Nome: response.data.userName,
                        ID: response.data.userId,
                        Perfil: response.data.userProfile
                    }));
                    
                    $state.go('root');
                    stopSpin();
                })
                .catch(function (error) {
                    if (error instanceof Error) {
                        $rootScope.openModal('Desculpe!', 'O sistema encontra-se indisponível no momento.', false);
                    } else if (error.status == -1 && error.data == null) {
                        $rootScope.openModal('Desculpe!', 'O sistema encontra-se indisponível no momento.', false);
                    } else {
                        $rootScope.openModal('Aviso', error.data.error_description, false);
                    }
                    stopSpin();
                })
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

    angular
        .module('PropostasApp.login')
        .controller('LoginCtrl', LoginCtrl)

}());