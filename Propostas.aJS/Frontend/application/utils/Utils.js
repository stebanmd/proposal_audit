/*
* Utils
* */
(function () {
    'use strict';

    Utils.$inject = ['$filter'];
    function Utils($filter) {

        // exports public methods
        return {
            isNullOrEmpty: isNullOrEmpty,
            isValidEmail: isValidEmail,
            isValidName: isValidName,
            isValidCPFCNPJ: isValidCPFCNPJ,
            isValidDate: isValidDate,
            isValidBirthDate: isValidBirthDate,
            limpaMascara: limpaMascara,
            toLocalDate: toLocalDate,
            toSystemDate: toSystemDate,
            getBase64: getBase64
        };

        function toLocalDate(data) {
            return $filter('date')(data, 'dd/MM/yyyy')
        }

        function getBase64(file) {
			return new Promise((resolve, reject) => {
			  const reader = new FileReader();
			  reader.readAsDataURL(file);
			  reader.onload = () => resolve(reader.result);
			  reader.onerror = error => reject(error);
			});
		  }

        function toSystemDate(dataPtBr) {
            var data = dataPtBr.split('/');
            return data[2] + '-' + ((data[1] < 10 && data[1].length == 1) ? '0' + data[1] : data[1]) + 
                   '-' + ((data[0] < 10 && data[0].length == 1) ? '0' + data[0] : data[0]);
        }

        function limpaMascara(linha) {
            var stopRelace = 0;
            stopRelace = linha.indexOf('.');
            while (stopRelace > -1) {
                linha = linha.replace('.', '');
                stopRelace = linha.indexOf('.');
            }
            stopRelace = 0;
            stopRelace = linha.indexOf('-');
            while (stopRelace > -1) {
                linha = linha.replace('-', '');
                stopRelace = linha.indexOf('-');
            }
            stopRelace = 0;
            stopRelace = linha.indexOf('/');
            while (stopRelace > -1) {
                linha = linha.replace('/', '');
                stopRelace = linha.indexOf('/');
            }
            return linha
        }

        function isNullOrEmpty(input) {

            if (typeof input === 'undefined' || input == null) return true;

            return input.replace(/\s/g, '').length < 1;
        }

        function isValidEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function isValidName(name) {
            var re = /^[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ]+(?:\s[a-zA-ZáéíóúàâêôãõüçÁÉÍÓÚÀÂÊÔÃÕÜÇ]+)+$/;
            return re.test(name);
        }

        function isValidCPFCNPJ(cpfCnpj) {
            var re = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
            if (re.test(cpfCnpj)) {
                if (cpfCnpj.replace(/\D/g, '').length == 11) {
                    return isValidCPF(cpfCnpj.replace(/\D/g, ''));
                } else {
                    return isValidCNPJ(cpfCnpj.replace(/\D/g, ''));
                }
            } else {
                return false;
            };
        }

        function isValidDate(date) {
            var onlyNumbers = date.replace(/\D/g, '');
            var day = onlyNumbers.substring(0, 2);
            var month = onlyNumbers.substring(2, 4);
            var year = onlyNumbers.substring(4, 8);
            var date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);

            if (!(Object.prototype.toString.call(date) === '[object Date]')) {
                return false;
            } else if (date >= new Date()) {
                return false;
            } else if (year < 1900) {
                return false
            } else {
                return true;
            }
        }

        function isValidBirthDate(birthDate) {
            if (birthDate !== undefined) {
                var onlyNumbers = birthDate.replace(/\D/g, '');
                var day = onlyNumbers.substring(0, 2);
                var month = onlyNumbers.substring(2, 4);
                var year = onlyNumbers.substring(4, 8);
                var birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);

                if (!(Object.prototype.toString.call(birthDate) === '[object Date]')) {
                    return false;
                } else if (birthDate >= new Date()) {
                    return false;
                } else if (year < 1900) {
                    return false
                } else {
                    return true;
                }
            }
        }

        function isValidCPF(cpf) {
            var numeros, digitos, soma, i, resultado, digitos_iguais;
            digitos_iguais = 1;
            if (cpf.length < 11)
                return false;
            for (i = 0; i < cpf.length - 1; i++)
                if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                    digitos_iguais = 0;
                    break;
                }
            if (!digitos_iguais) {
                numeros = cpf.substring(0, 9);
                digitos = cpf.substring(9);
                soma = 0;
                for (i = 10; i > 1; i--)
                    soma += numeros.charAt(10 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                    return false;
                numeros = cpf.substring(0, 10);
                soma = 0;
                for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                    return false;
                return true;
            }
            else
                return false;
        }

        function isValidCNPJ(cnpj) {

            cnpj = cnpj.replace(/[^\d]+/g, '');

            if (cnpj == '') return false;

            if (cnpj.length != 14)
                return false;

            // Elimina CNPJs invalidos conhecidos
            if (cnpj == "00000000000000" ||
                cnpj == "11111111111111" ||
                cnpj == "22222222222222" ||
                cnpj == "33333333333333" ||
                cnpj == "44444444444444" ||
                cnpj == "55555555555555" ||
                cnpj == "66666666666666" ||
                cnpj == "77777777777777" ||
                cnpj == "88888888888888" ||
                cnpj == "99999999999999")
                return false;

            // Valida DVs
            var tamanho = cnpj.length - 2
            var numeros = cnpj.substring(0, tamanho);
            var digitos = cnpj.substring(tamanho);
            var soma = 0;
            var pos = tamanho - 7;
            for (var i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                return false;

            tamanho = tamanho + 1;
            numeros = cnpj.substring(0, tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--) {
                soma += numeros.charAt(tamanho - i) * pos--;
                if (pos < 2)
                    pos = 9;
            }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                return false;

            return true;

        }
    }

    angular
        .module('PropostasApp.core')
        .factory('Utils', Utils);

})();