(function () {
    'use strict';

    MainCtrl.$inject = ['$rootScope', '$state', '$scope', '$uibModal'];
    function MainCtrl($rootScope, $state, $scope, $uibModal) {
        var vm = this;

        angular.extend(this, {
            vm: vm
        });

        $rootScope.goBack = function () {
			window.history.back();
		}

        $rootScope.openModal = function (headerMsg, footerMsg, cancelButton) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'application/shared/modal/partials/modal-content.partial.html',
                controller: 'ModalCtrl',
                controllerAs: 'ctrl',
                resolve: {
                    items: function () {
                        return {
                            header: headerMsg,
                            body: footerMsg,
                            cancelButton: cancelButton
                        };
                    }
                }
            })

            return modalInstance.result
            .then(function (result) {
                return result;
            });
        };
    }

    angular
    .module('PropostasApp.core')
    .controller('MainCtrl', MainCtrl);
})();
