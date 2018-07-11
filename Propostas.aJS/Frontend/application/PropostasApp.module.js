/*
 * The main app module for the maker admin
 * */
(function () {
	// ecma6 / jshint
	'use strict';

	// creates the main module and inject its dependencies and external modules
	angular.module('PropostasApp', [

		'PropostasApp.core',

		'PropostasApp.login',

		'PropostasApp.cadastro'
	]);
})();
