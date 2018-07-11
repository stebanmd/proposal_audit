using System;
using System.Security.Cryptography;
using System.Text;

namespace Propostas.Lib.Util
{
    internal class CriptografiaUtil
    {
        public static string CriptografarSenha(string senha)
        {
            SHA256CryptoServiceProvider cryptoTransform = new SHA256CryptoServiceProvider();
            string hash = BitConverter.ToString(cryptoTransform.ComputeHash(Encoding.Default.GetBytes(senha))).Replace("-", "");
            return hash.ToLower();
        }

        public static bool VerificarSenha(string hash, string senha)
        {
            return (hash == CriptografarSenha(senha));
        }
    }
}