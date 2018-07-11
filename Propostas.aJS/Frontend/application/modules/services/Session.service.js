(function () {
	'use strict';

	SessionService.$inject = ['$window', 'FakeStorage'];

	function SessionService($window, FakeStorage) {

		return {
			set: set,
			get: get,
			remove: remove,
			isStorageSupported: isStorageSupported
		};

		// devido a problemas com Safari em modo anônimo
		function isStorageSupported(storageName) {
			var testKey = 'test',
				storage = $window[storageName];
			try {
				storage.setItem(testKey, '1');
				storage.removeItem(testKey);
				return true;
			} catch (error) {
				return false;
			}
		}

		function set(key, value, type) {
			var storage = isStorageSupported('localStorage') ? $window.localStorage : FakeStorage;
			if (storage !== undefined) {
				if (type === undefined) {
					storage.setItem(key, value);
				} else {
					storage.setItem(key, value);
				}
			}
		}

		function get(key, type) {
			var storage = isStorageSupported('localStorage') ? $window.localStorage : FakeStorage;
			if (storage !== undefined) {
				var value = null;

				if (type === undefined) {
					value = storage.getItem(key);
				} else {
					value = storage.getItem(key);
				}

				if (value !== undefined) {
					return value;
				}
			}
			return null;
		}

		function remove(key, type) {
			var storage = isStorageSupported('localStorage') ? $window.localStorage : FakeStorage;
			if (storage !== undefined) {
				if (type === undefined) {
					storage.removeItem(key);
				} else {
					storage.removeItem(key);
				}
			}
		}

	}

	angular
		.module('PropostasApp.core')
		.factory('SessionService', SessionService);

})();
