using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Reflection;

namespace DAL
{
    public static class MessageConvert
    {
        private static readonly JsonSerializerSettings Settings;

        static MessageConvert()
        {
            Settings = new JsonSerializerSettings
            {
                Formatting = Formatting.None,
                DateFormatHandling = DateFormatHandling.IsoDateFormat,
                NullValueHandling = NullValueHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
        }

        public static string SerializeObject(this object obj)
        {
            return obj == null ? string.Empty : JsonConvert.SerializeObject(obj, Settings);
        }

        public static T DeserializeObject<T>(this string json)
        {
            return JsonConvert.DeserializeObject<T>(json, Settings);
        }

        public static object DeserializeObject(this string json, Type type)
        {
            try
            {
                return JsonConvert.DeserializeObject(json, type, Settings);
            }
            catch (Exception ex)
            {
                // Ghi lại lỗi để dễ theo dõi
                Console.WriteLine($"Error deserializing: {ex.Message}");
                return null;
            }
        }
    }

    public static class CollectionHelper
    {
        public static object GetPropertyValue(this object obj, string propName)
        {
            var prop = obj.GetType().GetProperty(propName);
            return prop?.GetValue(obj);
        }

        public static string GetPropertyValueToString(this object obj, string propName)
        {
            var prop = obj.GetType().GetProperty(propName);
            return prop == null ? string.Empty : Convert.ToString(prop.GetValue(obj));
        }

        public static List<T> GetSourceWithPaging<T>(IEnumerable<T> source, int pageSize, int pageIndex, ref int totalPage)
        {
            var enumerable = source.ToList();
            int totalRow = enumerable.Count;
            totalPage = (int)Math.Ceiling(totalRow / (double)pageSize);
            return enumerable.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
        }

        public static DataTable ConvertTo<T>(this IList<T> list)
        {
            var table = CreateTable<T>();
            foreach (var item in list)
            {
                var row = table.NewRow();
                foreach (PropertyDescriptor prop in TypeDescriptor.GetProperties(typeof(T)))
                {
                    row[prop.Name] = prop.GetValue(item) ?? DBNull.Value;
                }
                table.Rows.Add(row);
            }
            return table;
        }

        public static IList<T> ConvertTo<T>(IList<DataRow> rows)
        {
            var list = new List<T>();
            if (rows != null)
            {
                foreach (DataRow row in rows)
                {
                    T item = CreateItem<T>(row);
                    list.Add(item);
                }
            }
            return list;
        }

        public static IList<T> ConvertTo<T>(this DataTable table)
        {
            return table == null ? null : ConvertTo<T>(table.AsEnumerable().ToList());
        }

        public static T CreateItem<T>(DataRow row)
        {
            T obj = Activator.CreateInstance<T>();
            if (row == null) return obj;

            foreach (DataColumn column in row.Table.Columns)
            {
                var prop = obj.GetType().GetProperty(column.ColumnName);
                if (prop == null) continue;

                object value = row[column.ColumnName];
                if (value != DBNull.Value)
                {
                    prop.SetValue(obj, Convert.ChangeType(value, prop.PropertyType));
                }
            }

            return obj;
        }

        public static DataTable CreateTable<T>()
        {
            var table = new DataTable(typeof(T).Name);
            foreach (PropertyDescriptor prop in TypeDescriptor.GetProperties(typeof(T)))
            {
                table.Columns.Add(prop.Name, Nullable.GetUnderlyingType(prop.PropertyType) ?? prop.PropertyType);
            }
            return table;
        }
    }
}
