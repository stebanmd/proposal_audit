using Propostas.Lib.Util;
using System.Globalization;
using System.Text.RegularExpressions;

namespace System
{
    public static class StringExtensions
    {
        public static string Replace(this string valor, string[] oldValues, string newValue)
        {
            string retorno = valor;
            foreach (string oldValue in oldValues)
            {
                retorno = retorno.Replace(oldValue, newValue);
            }
            return retorno;
        }

        public static DateTime ToDateTime(this string text)
        {
            text = text.Trim();
            if (text == "Now")
            {
                return DateTime.Now;
            }
            else if (text == "Today")
            {
                return DateTime.Today;
            }
            else if (text.Length == 10)
            {
                return DateTime.ParseExact(text, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            }
            else
            {
                return DateTime.ParseExact(text, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);
            }
        }

        public static string MascaraCnpjCpf(this string pCnpjCpf)
        {
            string result = "";
            if (string.IsNullOrEmpty(pCnpjCpf)) return result;

            if (pCnpjCpf.Length == 14)
                result = pCnpjCpf.Insert(2, ".").Insert(6, ".").Insert(10, "/").Insert(15, "-");

            if (pCnpjCpf.Length == 11)
                result = pCnpjCpf.Insert(3, ".").Insert(7, ".").Insert(11, "-");

            if ((pCnpjCpf.Length != 11) && (pCnpjCpf.Length != 14))
                result = pCnpjCpf;

            return result;
        }

        public static string OnlyNumbers(this string s)
        {
            try
            {
                Regex rgx = new Regex("[^0-9]");
                return rgx.Replace(s, "");
            }
            catch
            {
                return "";
            }
        }

        public static bool IsValidCPFCNPJ(this string doc)
        {
            if (doc.Length == 11)
                return ValidacaoUtil.IsValidCPF(doc);
            else
                return ValidacaoUtil.IsValidCNPJ(doc);
        }
    }
}