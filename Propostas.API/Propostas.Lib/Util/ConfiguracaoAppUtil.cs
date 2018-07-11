using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;

namespace Propostas.Lib.Util
{
    public static class ConfiguracaoAppUtil
    {
        public static string Get<T>(T nome)
        {
            if (ConfigurationManager.AppSettings[nome.ToString()] == null)
            {
                // não encontrado
                return null;
            }
            else
            {
                return ConfigurationManager.AppSettings[nome.ToString()].ToString();
            }
        }

        public static string GetPath<T>(T nome, string arquivoNome = null)
        {
            string path = Get<T>(nome);
            if (!path.Contains(":"))
            {
                string diretorioBase = AppDomain.CurrentDomain.BaseDirectory;
                path = Path.Combine(diretorioBase, path);
                DirectoryInfo dirTemp = new DirectoryInfo(path);
                path = dirTemp.FullName;
            }
            if (!string.IsNullOrEmpty(arquivoNome))
            {
                path += arquivoNome;
            }
            return path;
        }

        public static List<string> GetAsList<T>(T nome, char separator = ',')
        {
            if (String.IsNullOrEmpty(ConfiguracaoAppUtil.Get(nome)))
            {
                return new List<string>();
            }
            else
            {
                return ConfiguracaoAppUtil.Get(nome).Split(separator).Select(t => t.Trim()).ToList();
            }
        }

        public static Dictionary<string, string> GetAsDictionary<T>(T nome, char separator = ',', char separatorValue = '=')
        {
            var list = ConfiguracaoAppUtil.Get(nome).Split(separator);
            if ((list.Length > 0) && (list[0].Trim().Contains(separatorValue)))
            {
                return list.ToDictionary<string, string, string>(t => t.Split(separatorValue)[0].Trim(), t => t.Split(separatorValue)[1].Trim());
            }
            else
            {
                return new Dictionary<string, string>();
            }
        }

        public static int GetAsInt<T>(T nome)
        {
            return Convert.ToInt32(ConfiguracaoAppUtil.Get(nome));
        }

        public static List<int> GetAsListInt<T>(T nome, char separator = ',')
        {
            return ConfiguracaoAppUtil.GetAsList(nome, separator).Select(t => Convert.ToInt32(t.Trim())).ToList();
        }

        public static Dictionary<string, int> GetAsDictionaryInt<T>(T nome, char separator = ',', char separatorValue = '=')
        {
            var list = ConfiguracaoAppUtil.Get(nome).Split(separator);
            if ((list.Length > 0) && (list[0].Trim().Contains(separatorValue)))
            {
                return list.ToDictionary<string, string, int>(t => t.Split(separatorValue)[0].Trim(), t => Convert.ToInt32(t.Split(separatorValue)[1].Trim()));
            }
            else
            {
                return new Dictionary<string, int>();
            }
        }

        public static decimal GetAsDecimal<T>(T nome)
        {
            return Convert.ToDecimal(ConfiguracaoAppUtil.Get(nome));
        }

        public static List<decimal> GetAsListDecimal<T>(T nome, char separator = ',')
        {
            return ConfiguracaoAppUtil.GetAsList(nome, separator).Select(t => Convert.ToDecimal(t.Trim())).ToList();
        }

        public static Dictionary<string, decimal> GetAsDictionaryDecimal<T>(T nome, char separator = ',', char separatorValue = '=')
        {
            var list = ConfiguracaoAppUtil.Get(nome).Split(separator);
            if ((list.Length > 0) && (list[0].Trim().Contains(separatorValue)))
            {
                return list.ToDictionary<string, string, decimal>(t => t.Split(separatorValue)[0].Trim(), t => Convert.ToDecimal(t.Split(separatorValue)[1].Trim()));
            }
            else
            {
                return new Dictionary<string, decimal>();
            }
        }

        public static double GetAsDouble<T>(T nome)
        {
            return Convert.ToDouble(ConfiguracaoAppUtil.Get(nome));
        }

        public static List<double> GetAsListDouble<T>(T nome, char separator = ',')
        {
            return ConfiguracaoAppUtil.GetAsList(nome, separator).Select(t => Convert.ToDouble(t.Trim())).ToList();
        }

        public static Dictionary<string, double> GetAsDictionaryDouble<T>(T nome, char separator = ',', char separatorValue = '=')
        {
            var list = ConfiguracaoAppUtil.Get(nome).Split(separator);
            if ((list.Length > 0) && (list[0].Trim().Contains(separatorValue)))
            {
                return list.ToDictionary<string, string, double>(t => t.Split(separatorValue)[0].Trim(), t => Convert.ToDouble(t.Split(separatorValue)[1].Trim()));
            }
            else
            {
                return new Dictionary<string, double>();
            }
        }

        public static bool GetAsBool<T>(T nome)
        {
            return Convert.ToBoolean(ConfiguracaoAppUtil.Get(nome));
        }

        public static List<bool> GetAsListBool<T>(T nome, char separator = ',')
        {
            return ConfiguracaoAppUtil.GetAsList(nome, separator).Select(t => Convert.ToBoolean(t.Trim())).ToList();
        }

        public static Dictionary<string, bool> GetAsDictionaryBool<T>(T nome, char separator = ',', char separatorValue = '=')
        {
            var list = ConfiguracaoAppUtil.Get(nome).Split(separator);
            if ((list.Length > 0) && (list[0].Trim().Contains(separatorValue)))
            {
                return list.ToDictionary<string, string, bool>(t => t.Split(separatorValue)[0].Trim(), t => Convert.ToBoolean(t.Split(separatorValue)[1].Trim()));
            }
            else
            {
                return new Dictionary<string, bool>();
            }
        }

        public static DateTime GetAsDateTime<T>(T nome)
        {
            return ConfiguracaoAppUtil.Get(nome).ToDateTime();
        }

        public static List<DateTime> GetAsListDateTime<T>(T nome, char separator = ',')
        {
            return ConfiguracaoAppUtil.GetAsList(nome, separator).Select(t => t.ToDateTime()).ToList();
        }

        public static Dictionary<string, DateTime> GetAsDictionaryDateTime<T>(T nome, char separator = ',', char separatorValue = '=')
        {
            var list = ConfiguracaoAppUtil.Get(nome).Split(separator);
            if ((list.Length > 0) && (list[0].Trim().Contains(separatorValue)))
            {
                return list.ToDictionary<string, string, DateTime>(t => t.Split(separatorValue)[0].Trim(), t => t.Split(separatorValue)[1].ToDateTime());
            }
            else
            {
                return new Dictionary<string, DateTime>();
            }
        }
    }
}