/*
 * Core module
 * Contains third part modules, ng modules and shared modules
 * that are used in all parts of this application
 *
 * Reference: https://github.com/johnpapa/angular-styleguide#modularity
 * */
(function () {
    'use strict';

    angular.module('PropostasApp.core', [
        /* Angular modules */
        'ngSanitize',

        /* 3rd-party modules */
        'ui.router',

        'ui.select',

        'ngFileUpload',

        'ngLocale',

        'ngFileSaver',

        'ngFileUpload',

        'ui.mask',

        'ui.bootstrap'
    ]);
})();
