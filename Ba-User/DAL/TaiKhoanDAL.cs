using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public class TaiKhoanDAL : ITaiKhoanDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

        // Constructor để Dependency Injection
        public TaiKhoanDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public TaiKhoanModel DangNhap(string Email, string MatKhau)
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "DangNhap_NguoiDung",
                    "@Email", Email,
                    "@MatKhau", MatKhau);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<TaiKhoanModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi trong quá trình đăng nhập: " + ex.Message);
            }
        }

        public List<TaiKhoanModel> Get_TaiKhoan(string IDNguoiDung)
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_TaiKhoan",
                    "@IDNguoiDung", IDNguoiDung);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<TaiKhoanModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Không lấy được tài khoản: " + ex.Message);
            }
        }
    }
}
