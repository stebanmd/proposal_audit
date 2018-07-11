(function () {
    'use strict';

    ModalCtrl.$inject = ['$uibModalInstance', 'items'];
    function ModalCtrl($uibModalInstance, items) {
        // to be used inside returned promises
        var vm = this;

        var model = {
            header: null,
            body: null
        };

        function startSpin() {
            $('body').loading({
                message: "Aguarde..."
            });
        }

        function stopSpin() {
            $('body').loading('stop');
        }

        function modelinit(){
            angular.extend(model, {
                header: null,
                body: null
            });
        }

        function init() {
            model.header = items.header;
            model.body = items.body;
            model.cancelButton = items.cancelButton;
            stopSpin();
        };

        function ok() {
            $uibModalInstance.close('ok');
        };

        function cancel() {
            $uibModalInstance.dismiss('ok');
        };

        // expose public methods/vars
        angular.extend(this, {
            /* vars */
            model: model,
            vm: vm,

            /* methods */
            init: init,
            ok: ok,
            cancel: cancel
        });
    }

    angular
    .module('PropostasApp.core')
    .controller('ModalCtrl', ModalCtrl);

})();
