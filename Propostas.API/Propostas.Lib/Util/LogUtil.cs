using log4net;
using Propostas.Lib.Enumerator;
using System;
using System.Runtime.CompilerServices;

namespace Propostas.Lib.Util
{
    public static class LogUtil
    {
        private static readonly ILog logger = LogManager.GetLogger(ConfiguracaoAppUtil.Get(ConfiguracaoGeral.logCategory));

        public static void Error(string msg,
            [CallerMemberName] string memberName = "",
            [CallerFilePath] string sourceFilePath = "",
            [CallerLineNumber] int sourceLineNumber = 0)
        {
            log4net.Config.XmlConfigurator.Configure();
            logger.Error(FormatCaller(memberName, sourceFilePath, sourceLineNumber) + msg);
        }

        public static void ErrorTitulo(string titulo, string msg,
            [CallerMemberName] string memberName = "",
            [CallerFilePath] string sourceFilePath = "",
            [CallerLineNumber] int sourceLineNumber = 0)
        {
            if (!string.IsNullOrEmpty(msg.Replace(new string[] { "\r", "\n" }, "").Trim()))
            {
                msg = titulo + "\r\n" + msg;
                log4net.Config.XmlConfigurator.Configure();
                logger.Error(FormatCaller(memberName, sourceFilePath, sourceLineNumber) + msg);
            }
        }

        public static void Error(Exception ex,
            [CallerMemberName] string memberName = "",
            [CallerFilePath] string sourceFilePath = "",
            [CallerLineNumber] int sourceLineNumber = 0)
        {
            log4net.Config.XmlConfigurator.Configure();
            logger.Error(FormatCaller(memberName, sourceFilePath, sourceLineNumber) + ex.ToString());
        }

        public static void Debug(string msg,
            [CallerMemberName] string memberName = "",
            [CallerFilePath] string sourceFilePath = "",
            [CallerLineNumber] int sourceLineNumber = 0)
        {
            log4net.Config.XmlConfigurator.Configure();
            logger.Debug(FormatCaller(memberName, sourceFilePath, sourceLineNumber) + msg);
        }

        public static void DebugTitulo(string titulo, string msg,
            [CallerMemberName] string memberName = "",
            [CallerFilePath] string sourceFilePath = "",
            [CallerLineNumber] int sourceLineNumber = 0)
        {
            if (!string.IsNullOrEmpty(msg.Replace(new string[] { "\r", "\n" }, "").Trim()))
            {
                msg = titulo + "\r\n" + msg;
                log4net.Config.XmlConfigurator.Configure();
                logger.Debug(FormatCaller(memberName, sourceFilePath, sourceLineNumber) + msg);
            }
        }

        private static string FormatCaller(string memberName = "", string sourceFilePath = "", int sourceLineNumber = 0)
        {
            return "[" + sourceFilePath + "][" + sourceLineNumber + "][" + memberName + "]\r\n";
        }
    }
}