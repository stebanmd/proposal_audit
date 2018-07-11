(function () {
	'use strict';

	FakeStorage.$inject = [];

	function FakeStorage() {

		return {
			setItem: setItem,
			getItem: getItem,
			removeItem: removeItem,
			clear: clear,
			key: key
		};

		function setItem(key, value) {
			this[key] = value;
		};

		function getItem(key) {
			return typeof this[key] == 'undefined' ? null : this[key];
		}

		function removeItem(key) {
			this[key] = undefined;
		};

		function clear() {
			for (var key in this) {
				if (this.hasOwnProperty(key)) {
					this.removeItem(key);
				}
			}
		};

		function key(index) {
			return Object.keys(this)[index];
		};

	}

	angular
		.module('PropostasApp.core')
		.factory('FakeStorage', FakeStorage);

})();
