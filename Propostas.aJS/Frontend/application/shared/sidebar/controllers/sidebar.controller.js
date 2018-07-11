(function () {
	'use strict';

	SidebarCtrl.$inject = ['$state', '$scope', '$stateParams', 'CadastroViewService','SessionService'];

	function SidebarCtrl($state, $scope, $stateParams, CadastroViewService, SessionService) {

		var vm = this;
		var model = {};

		$scope.$watch(
			function () {
				return CadastroViewService.model.view;
			},
			function (newVal) {
				model.view = newVal;
			});

		function init() {
			model.view = '';
			prepareForm();
        }
        
		function prepareForm() {
			var currentUser = JSON.parse(SessionService.get('CurrentUser'));

			if (currentUser === undefined || currentUser === null) {
				$state.go('root.login');
				return;
			}

			vm.model.NomeUsuario = currentUser.Nome;			
			$(document).ready(function () {
				sidebarSetHeight();
			});
		}

		function logOff() {
			SessionService.remove('CurrentUser');
			$state.go('root.login');
		}

		function sidebarSetHeight() {
			if ($(window).width() >= 768) {
				var height = screen.height;
				$('[data-component="sidebar"]').height(height);
			}
		}

		angular.extend(this, {
			model: model,
			init: init,
			logOff: logOff
		});
	}

	angular
		.module('PropostasApp.core')
		.controller('SidebarCtrl', SidebarCtrl);

})();
