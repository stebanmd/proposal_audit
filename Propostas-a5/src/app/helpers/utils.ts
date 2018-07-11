export class Utils {

    static masks = {
        cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
        cnpj: [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/],
        data: [/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/]
    }

    static toLocalDate(date) {
        var data = new Date(date);
        var dia = data.getDate().toString();
        if (dia.length == 1)
            dia = '0' + dia;

        var mes = (data.getMonth() + 1).toString();
        if (mes.length == 1) 
            mes = '0' + mes.toString();
        return dia + '/' + mes + '/' + data.getFullYear();
    }

    static toSystemDate(dataPtBr: string) {
        var data = dataPtBr.split('/');
        return data[2] + '-' + ((parseInt(data[1]) < 10 && data[1].length == 1) ? '0' + data[1] : data[1]) + 
               '-' + ((parseInt(data[0]) < 10 && data[0].length == 1) ? '0' + data[0] : data[0]);
    }

    static isNullOrEmpty(input) {
        if (typeof input === 'undefined' || input == null) return true;
        return input.replace(/\s/g, '').length < 1;
    }

    static getBase64(file: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    static limpaMascara(linha: string): string {
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
        stopRelace = 0;
        stopRelace = linha.indexOf('_');
        while (stopRelace > -1) {
            linha = linha.replace('_', '');
            stopRelace = linha.indexOf('_');
        }
        return linha
    }

    static isValidEmail(email: string): boolean {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    static isValidCPFCNPJ(cpfCnpj: string): boolean {
        var re = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})$/;
        if (re.test(cpfCnpj)) {
            if (cpfCnpj.replace(/\D/g, '').length == 11) {
                return this.isValidCPF(cpfCnpj.replace(/\D/g, ''));
            } else {
                return this.isValidCNPJ(cpfCnpj.replace(/\D/g, ''));
            }
        } else {
            return false;
        };
    }

    static isValidDate(date: string): boolean {
        let onlyNumbers = date.replace(/\D/g, '');
        let day = onlyNumbers.substring(0, 2);
        let month = onlyNumbers.substring(2, 4);
        let year = onlyNumbers.substring(4, 8);
        let dateAux = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);

        if (!(Object.prototype.toString.call(dateAux) === '[object Date]')) {
            return false;
        } else if (dateAux >= new Date()) {
            return false;
        } else if (parseInt(year) < 1900) {
            return false
        } else {
            return true;
        }
    }

    static isValidBirthDate(birthDate: string): boolean {
        if (birthDate !== undefined) {
            var onlyNumbers = birthDate.replace(/\D/g, '');
            var day = onlyNumbers.substring(0, 2);
            var month = onlyNumbers.substring(2, 4);
            var year = onlyNumbers.substring(4, 8);
            var birthDateAux = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), 0, 0, 0, 0);

            if (!(Object.prototype.toString.call(birthDateAux) === '[object Date]')) {
                return false;
            } else if (birthDateAux >= new Date()) {
                return false;
            } else if (parseInt(year) < 1900) {
                return false
            } else {
                return true;
            }
        }
    }

    private static isValidCPF(cpf: string): boolean {
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

    private static isValidCNPJ(cnpj: string): boolean {

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
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2)
                pos = 9;
        }
        var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(0)))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != parseInt(digitos.charAt(1)))
            return false;

        return true;

    }
}