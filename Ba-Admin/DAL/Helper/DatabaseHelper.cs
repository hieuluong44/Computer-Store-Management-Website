using DAL.Helper.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace DAL.Helper
{
    public class DatabaseHelper : IDatabaseHelper, IDisposable
    {
        public string StrConnection { get; set; }
        private SqlConnection sqlConnection;

        public DatabaseHelper(IConfiguration configuration)
        {
            StrConnection = configuration["ConnectionStrings:DefaultConnection"];
        }

        public void SetConnectionString(string connectionString)
        {
            StrConnection = connectionString;
        }

        public string OpenConnection()
        {
            try
            {
                if (sqlConnection == null)
                    sqlConnection = new SqlConnection(StrConnection);

                if (sqlConnection.State != ConnectionState.Open)
                    sqlConnection.Open();

                return string.Empty;
            }
            catch (Exception exception)
            {
                return exception.Message;
            }
        }

        public string CloseConnection()
        {
            try
            {
                if (sqlConnection != null && sqlConnection.State != ConnectionState.Closed)
                    sqlConnection.Close();

                return string.Empty;
            }
            catch (Exception exception)
            {
                return exception.Message;
            }
        }

        public string ExecuteNoneQuery(string strQuery)
        {
            string msgError = string.Empty;
            try
            {
                OpenConnection();
                using var sqlCommand = new SqlCommand(strQuery, sqlConnection);
                sqlCommand.ExecuteNonQuery();
            }
            catch (Exception exception)
            {
                msgError = exception.ToString();
            }
            finally
            {
                CloseConnection();
            }
            return msgError;
        }

        public DataTable ExecuteQueryToDataTable(string strQuery, out string msgError)
        {
            msgError = string.Empty;
            var result = new DataTable();
            using var sqlDataAdapter = new SqlDataAdapter(strQuery, StrConnection);
            try
            {
                sqlDataAdapter.Fill(result);
            }
            catch (Exception exception)
            {
                msgError = exception.ToString();
                result = null;
            }
            return result;
        }

        public object ExecuteScalar(string strQuery, out string msgError)
        {
            msgError = string.Empty;
            object result = null;
            try
            {
                OpenConnection();
                using var sqlCommand = new SqlCommand(strQuery, sqlConnection);
                result = sqlCommand.ExecuteScalar();
            }
            catch (Exception ex)
            {
                msgError = ex.StackTrace;
            }
            finally
            {
                CloseConnection();
            }
            return result;
        }

        #region Execute Stored Procedure
        public string ExecuteSProcedure(string sprocedureName, params object[] paramObjects)
        {
            string result = string.Empty;
            try
            {
                using var connection = new SqlConnection(StrConnection);
                using var cmd = new SqlCommand(sprocedureName, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                connection.Open();
                AddParameters(cmd, paramObjects);
                cmd.ExecuteNonQuery();
            }
            catch (Exception exception)
            {
                result = exception.ToString();
            }
            return result;
        }

        public object ExecuteScalarSProcedure(out string msgError, string sprocedureName, params object[] paramObjects)
        {
            msgError = string.Empty;
            object result = null;
            try
            {
                using var connection = new SqlConnection(StrConnection);
                using var cmd = new SqlCommand(sprocedureName, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                connection.Open();
                AddParameters(cmd, paramObjects);
                result = cmd.ExecuteScalar();
            }
            catch (Exception exception)
            {
                msgError = exception.ToString();
            }
            return result;
        }

        public DataTable ExecuteSProcedureReturnDataTable(out string msgError, string sprocedureName, params object[] paramObjects)
        {
            DataTable tb = new DataTable();
            msgError = string.Empty;
            try
            {
                using var connection = new SqlConnection(StrConnection);
                using var cmd = new SqlCommand(sprocedureName, connection)
                {
                    CommandType = CommandType.StoredProcedure
                };

                connection.Open();
                AddParameters(cmd, paramObjects);

                using var adapter = new SqlDataAdapter(cmd);
                adapter.Fill(tb);
            }
            catch (Exception exception)
            {
                tb = null;
                msgError = exception.ToString();
            }
            return tb;
        }

        private void AddParameters(SqlCommand cmd, object[] paramObjects)
        {
            int parameterInput = paramObjects.Length / 2;
            int j = 0;
            for (int i = 0; i < parameterInput; i++)
            {
                string paramName = Convert.ToString(paramObjects[j++]).Trim();
                object value = paramObjects[j++];

                cmd.Parameters.Add(new SqlParameter(paramName, value ?? DBNull.Value));
            }
        }

        public void Dispose()
        {
            CloseConnection();
            sqlConnection?.Dispose();
        }
        #endregion
    }
}
