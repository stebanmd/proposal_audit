using System.ComponentModel;
using System.Reflection;

namespace System
{
    public static class EnumExtensions
    {
        public static string Description(this Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());

            try
            {
                DescriptionAttribute[] attributes =
                (DescriptionAttribute[])fi.GetCustomAttributes(
                typeof(DescriptionAttribute),
                false);

                if (attributes != null &&
                    attributes.Length > 0)
                    return attributes[0].Description;
                else
                    return value.ToString();
            }
            catch (Exception)
            {
                return value.ToString();
            }
        }

        public static string Name(this Enum value)
        {
            return value.ToString();
        }

        public static int ValueAsInt(this Enum value)
        {
            return Convert.ToInt32(value);
        }

        public static char ValueAsChar(this Enum value)
        {
            return Convert.ToChar(value);
        }

        public static T FromChar<T>(string caracter) where T : struct, IConvertible
        {
            return EnumExtensions.FromChar<T>(caracter[0]);
        }

        public static T FromChar<T>(char caracter) where T : struct, IConvertible
        {
            try
            {
                if (Enum.IsDefined(typeof(T), caracter))
                {
                    return (T)Enum.ToObject(typeof(T), caracter);
                }
                else
                {
                    return (T)(Enum.GetValues(typeof(T)).GetValue(0));
                }
            }
            catch
            {
                return (T)(Enum.GetValues(typeof(T)).GetValue(0));
            }
        }

        public static T FromInt<T>(int numero) where T : struct, IConvertible
        {
            try
            {
                if (Enum.IsDefined(typeof(T), numero))
                {
                    return (T)Enum.ToObject(typeof(T), numero);
                }
                else
                {
                    return (T)(Enum.GetValues(typeof(T)).GetValue(0));
                }
            }
            catch
            {
                return (T)(Enum.GetValues(typeof(T)).GetValue(0));
            }
        }

        public static T FromString<T>(string nome) where T : struct, IConvertible
        {
            try
            {
                return (T)Enum.Parse(typeof(T), nome);
            }
            catch
            {
                return (T)(Enum.GetValues(typeof(T)).GetValue(0));
            }
        }

        public static string ValueAsString(this Enum value)
        {
            return value.ValueAsChar().ToString();
        }
    }
}