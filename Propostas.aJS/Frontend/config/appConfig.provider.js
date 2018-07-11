/**
 * Application general configs provider
 * */
(function () {

	function AppConfigs() {

		var options = {
			activeEnv: "preview",
			preview: {
				apiEndpoint: '//localhost:58259'
			}
		};

		this.$get = [function () {
			var activeOptions = options[options['activeEnv']];
			if (activeOptions.apiEndpointIE9 && activeOptions.apiEndpointIE9.length > 0 && navigator.userAgent.match(/MSIE 9/)) {
				activeOptions.apiEndpoint = activeOptions.apiEndpointIE9;
				delete activeOptions.apiEndpointIE9;
			}
			return activeOptions;
		}];
	}

	// inject the provider in the module
	angular
		.module('PropostasApp')
		.provider('AppConfigs', AppConfigs);

})();


