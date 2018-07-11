using System;

namespace Propostas.Lib.Util
{
    public abstract class ValidacaoUtil
    {
        internal static bool IsValidCPF(string cpf)
        {
            string digito = String.Empty;
            int k, j, soma;

            for (k = 0; k < 2; k++)
            {
                soma = 0;
                for (j = 0; j < 9 + k; j++)
                    soma += int.Parse(cpf[j].ToString()) * (10 + k - j);
                digito += (soma % 11 == 0 || soma % 11 == 1) ? 0 : (11 - (soma % 11));
            }

            return (digito[0] == cpf[9] & digito[1] == cpf[10]);
        }

        internal static bool IsValidCNPJ(string cnpj)
        {
            int[] multiplicador1 = new int[12] { 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] multiplicador2 = new int[13] { 6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2 };
            int soma;
            int resto;
            string digito;
            string tempCnpj;
            cnpj = cnpj.Trim();
            cnpj = cnpj.Replace(".", "").Replace("-", "").Replace("/", "");
            if (cnpj.Length != 14)
                return false;
            tempCnpj = cnpj.Substring(0, 12);
            soma = 0;
            for (int i = 0; i < 12; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador1[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = resto.ToString();
            tempCnpj = tempCnpj + digito;
            soma = 0;
            for (int i = 0; i < 13; i++)
                soma += int.Parse(tempCnpj[i].ToString()) * multiplicador2[i];
            resto = (soma % 11);
            if (resto < 2)
                resto = 0;
            else
                resto = 11 - resto;
            digito = digito + resto.ToString();
            return cnpj.EndsWith(digito);
        }
    }
}