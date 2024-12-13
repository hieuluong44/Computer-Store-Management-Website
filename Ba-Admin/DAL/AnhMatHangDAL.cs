using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public class AnhMatHangDAL : IAnhMatHangDAL
    {
        DatabaseHelper databaseHelper;

        public AnhMatHangDAL(DatabaseHelper baseHelper)
        {
            databaseHelper = baseHelper;
        }

        public List<AnhMatHangModel> GetAnhMatHangModels(string IDMatHang)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "getAnhMatHang",
                    "@IDMatHang", IDMatHang);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<AnhMatHangModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while retrieving data: " + ex.Message);
            }
        }
    }
}
