(function () {
    'use strict';
    emailValidate.$inject = ['$window'];
    function emailValidate($window) {
        function filter(scope, element, attrs, modelCtrl) {
            element.on('keydown', function (event) {
                modelCtrl.$parsers.push(function (inputValue) {
                    if (inputValue == null)
                        return ''
                    var cleanInputValue = inputValue.replace(/[^\-\_\.\@\a-zA-Z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ\s]/g, '');
                    if (cleanInputValue != inputValue) {
                        modelCtrl.$setViewValue(cleanInputValue);
                        modelCtrl.$render();
                    }
                    return cleanInputValue;
                });
            });
        }

        return {
            require: 'ngModel',
            strict: 'A',
            link: filter
        };
    }

    angular
    .module('PropostasApp.core')
    .directive('emailValidate', emailValidate);
})();
