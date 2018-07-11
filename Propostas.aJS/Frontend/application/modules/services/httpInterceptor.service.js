(function () {
    'use strict';

    HttpInterceptorService.$inject = ['$q', '$location', 'SessionService', '$injector', 'Utils'];
    function HttpInterceptorService($q, $location, SessionService, $injector, Utils) {
        return {
            request: request,
            responseError: responseError
        };

        var resolve = $q.resolve;

        function stopSpin() {
            $('.loading-overlay').remove();
        }

        function modalMessageOpen(type, title, text) {
            $('.modalMessage').removeClass('error');
            $('.modalMessage').removeClass('success');
            $('.modalMessage').removeClass('warning');
            $('.modalMessage').addClass(type);
            $('.modalMessage .title').text(title);
            $('.modalMessage .text').text(text);
            $('.modalMessage').fadeIn();
        }

        function modalMessageClose() {
            $('.modalMessage').fadeOut(function () {
                $('.modalMessage').removeClass('error');
                $('.modalMessage').removeClass('success');
                $('.modalMessage').removeClass('warning');
            });
        }

        function request(config) {            
            config.headers['Content-Type'] = "application/json";
            config.headers['Authorization'] = 'Bearer ' + SessionService.get('BearerTokenKey');
            
            var currentUser = JSON.parse(SessionService.get('CurrentUser'));
            var userId = 0;

            if (currentUser !== undefined && currentUser !== null) {
                userId = currentUser.ID;
            }

			config.headers['CurrentUserId'] = userId;			
			return config;
        }

        function responseError(rejection) {
            var deferred = $q.defer();

            if (rejection.status === 401 || rejection.status === 417) {
                
                SessionService.remove('BearerTokenKey');
                SessionService.remove('BearerTokenExpiresIn');
                SessionService.remove('CurrentUser');

                $location.url('/');
                stopSpin();
                deferred.reject(rejection);

            } else if (rejection.status == -1) {
                stopSpin();
                deferred.reject(rejection);
            } else {
                deferred.reject(rejection);
                stopSpin();
            }

            return deferred.promise;
        }
    }

    function interceptorConfig($httpProvider) {
        $httpProvider.interceptors.push('HttpInterceptorService');
    }

    angular
        .module('PropostasApp.core')
        .factory('HttpInterceptorService', HttpInterceptorService)
        .config(['$httpProvider', interceptorConfig]);
})();
