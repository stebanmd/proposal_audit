/*
 * Helper to create and config
 * the routes/states providers
 * */
(function () {
    'use strict';

    routerHelperProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
    /* @ngInject */
    function routerHelperProvider($stateProvider, $urlRouterProvider) {
        /* jshint validthis:true */
        this.$get = RouterHelper;

        RouterHelper.$inject = ['$state'];
        /* @ngInject */
        function RouterHelper($state) {
            var hasOtherwise = false;

            // exports both functions to
            // config states in modules
            return {
                configureStates: configureStates,
                getStates: getStates
            };

            function configureStates(states, otherwisePath) {
                states.forEach(function (state) {
                    $stateProvider.state(state.state, state.config);
                });
                if (otherwisePath && !hasOtherwise) {
                    hasOtherwise = true;
                    $urlRouterProvider.otherwise(otherwisePath);
                }
            }

            function getStates() { return $state.get(); }
        }
    }

    angular
        .module('PropostasApp.core')
        .provider('routerHelper', routerHelperProvider);
})();
