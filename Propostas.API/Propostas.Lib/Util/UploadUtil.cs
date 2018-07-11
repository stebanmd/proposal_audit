using Propostas.Lib.Enumerator;
using System;
using System.IO;

namespace Propostas.Lib.Util
{
    public abstract class UploadUtil
    {
        public static string UploadFile(string fileBase64, ConfiguracaoGeral diretorioMedia, int idRegistro, string extensao)
        {
            string newFileName = string.Empty;
            try
            {
                byte[] tempBytes = Convert.FromBase64String(fileBase64);
                if (tempBytes.Length > 0)
                {
                    newFileName = Guid.NewGuid().ToString() + extensao;

                    string diretorioSalvar = ConfiguracaoAppUtil.GetPath(diretorioMedia);

                    diretorioSalvar = string.Format("{0}/{1}/", diretorioSalvar, idRegistro);
                    if (!Directory.Exists(diretorioSalvar))
                    {
                        try
                        {
                            Directory.CreateDirectory(diretorioSalvar);
                        }
                        catch { }
                    }

                    string filePath = diretorioSalvar + @"/" + newFileName;
                    File.WriteAllBytes(filePath, tempBytes);
                }
            }
            catch (Exception ex)
            {
                LogUtil.Error(ex);
                return string.Empty;
            }
            return newFileName;
        }
    }
}