/*
* App .run block, everything here run after the .config block
* **/
(function () {
    'use strict';

    PropostasAppRun.$inject = ['$state', '$rootScope', 'SessionService', '$locale', 'Utils'];
    function PropostasAppRun($state, $rootScope, SessionService, $locale, Utils) {
        $locale.NUMBER_FORMATS.DECIMAL_SEP = ",";
        $locale.NUMBER_FORMATS.GROUP_SEP = ".";
        $rootScope.$state = $state;
    }

    angular
        .module('PropostasApp.core')
        .run(PropostasAppRun);

})();
