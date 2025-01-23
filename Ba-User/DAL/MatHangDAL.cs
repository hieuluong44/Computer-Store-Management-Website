using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;

namespace DAL
{
    public class MatHangDAL : IMatHangDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

        public MatHangDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public List<Get_MatHang_DanhMuc> get_MatHang_DanhMuc()
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_MatHang_DanhMuc");

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); 
                }

                return result.ConvertTo<Get_MatHang_DanhMuc>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception( ex.Message);
            }
        }

        public List<List_MatHang> list_MatHang()
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "MatHang_BanChay");

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); 
                }

                return result.ConvertTo<List_MatHang>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Tim_MatHang> tim_MatHang_Gia(float GiaMin, float GiaMax)
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "tim_MatHang_Gia",
                    "@GiaMin", GiaMin, "@GiaMax", GiaMax);


                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); 
                }

                return result.ConvertTo<Tim_MatHang>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Tim_MatHang> tim_MatHang_Ten(string TenMatHang)
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_MatHang_Ten",
                    "@TenMatHang", TenMatHang);


                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                return result.ConvertTo<Tim_MatHang>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
