/*
 * The main routes for the app
 * */
(function () {
	// ecma6 / jshint
	'use strict';

	/*
	 * Get the returned states from getStates function
	 * and send it to the configureStates function that
	 * do the registry of new states/routes
	 * */
	function appRun(routerHelper) {
		// calls the state registration method
		routerHelper.configureStates(getStates(), '/');
	}

	/*
	 * Return the list of objects containing the states
	 * to register
	 * */
	function getStates() {
		return [{
				state: 'root',
				config: {
					url: '/',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/index.cadastro.html'
						},
						'sidebar@root': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.login',
				config: {					
					url: 'login',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/login/partials/login.partial.html',
							controller: 'LoginCtrl'
						}
					}
				}
			},
			{
				state: 'root.mudar-senha',
				config: {					
					url: 'mudar-senha/:user',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/usuario/partials/mudarSenha.partial.html'
						},
						'sidebar@root.mudar-senha': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.usuario-list',
				config: {					
					url: 'usuario',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/usuario/partials/list.partial.html'
						},
						'sidebar@root.usuario-list': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.usuario-edit',
				config: {					
					url: 'usuario/editar/:id',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/usuario/partials/edit.partial.html'
						},
						'sidebar@root.usuario-edit': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.categoria-list',
				config: {					
					url: 'categoria',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/categoria/partials/list.partial.html'
						},
						'sidebar@root.categoria-list': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.categoria-edit',
				config: {					
					url: 'categoria/editar/:id',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/categoria/partials/edit.partial.html'
						},
						'sidebar@root.categoria-edit': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.fornecedor-list',
				config: {					
					url: 'fornecedor',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/fornecedor/partials/list.partial.html'
						},
						'sidebar@root.fornecedor-list': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.fornecedor-edit',
				config: {					
					url: 'fornecedor/editar/:id',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/fornecedor/partials/edit.partial.html'
						},
						'sidebar@root.fornecedor-edit': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.proposta-list',
				config: {					
					url: 'proposta',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/proposta/partials/list.partial.html'
						},
						'sidebar@root.proposta-list': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						},
						'filtro-proposta@root.proposta-list': {
							templateUrl: 'application/modules/cadastro/proposta/partials/filtroProposta.partial.html'
						}
					}
				}
			},
			{
				state: 'root.proposta-edit',
				config: {					
					url: 'proposta/editar/:id',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/proposta/partials/edit.partial.html'
						},
						'sidebar@root.proposta-edit': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			},
			{
				state: 'root.proposta-historico',
				config: {					
					url: 'proposta/historico/:id',
					views: {
						'main-view@': {
							templateUrl: 'application/modules/cadastro/proposta/partials/historico.partial.html'
						},
						'sidebar@root.proposta-historico': {
							templateUrl: 'application/shared/sidebar/partials/sidebar.partial.html',
							controller: 'SidebarCtrl'
						}
					}
				}
			}
		];
	}

	// run the config code inside the app main module
	angular
		.module('PropostasApp.core')
		.run(appRun);

})();
