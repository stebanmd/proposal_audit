using System.Collections.Generic;

namespace System
{
    public static class ObjectExtensions
    {
        public static object GetPropByName(this object o, string propriedade)
        {
            var tipo = o.GetType();
            var prop = tipo.GetProperty(propriedade);
            return prop.GetValue(o);
        }

        public static T GetPropByName<T>(this object o, string propriedade)
        {
            return (T)o.GetPropByName(propriedade);
        }

        public static T MapTo<T>(this object value)
        {
            return AutoMapper.Mapper.Map<T>(value);
        }

        public static List<T> ListTo<T>(this object value)
        {
            return AutoMapper.Mapper.Map<List<T>>(value);
        }
    }
}