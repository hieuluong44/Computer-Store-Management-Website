using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DanhGiaDAL : IDanhGiaDAL
    {
        private IDatabaseHelper databaseHelper;
        public DanhGiaDAL(IDatabaseHelper database)
        {
            databaseHelper = database;
        }


        public bool Delete(string IDDanhGia)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_DanhGia",
                    "@IDDanhGia", IDDanhGia);
                if (result != null && !string.IsNullOrEmpty(result.ToString()))
                {
                    throw new Exception(result.ToString());
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GetDanhGia> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_DanhGia");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<GetDanhGia>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
    }
}
