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

        public TaiKhoanDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public bool DangKy(TaiKhoanModel taiKhoanModel)
        {
            try
            {
                var result = _databaseHelper.ExecuteSProcedure("DangKy_NguoiDung",
                   "@IDNguoiDung", taiKhoanModel.IDNguoiDung,
                   "@HinhAnh" , taiKhoanModel.HinhAnh,
                   "@TenNguoiDung", taiKhoanModel.TenNguoiDung,
                   "@GioiTinh", taiKhoanModel.GioiTinh,
                   "@SoDienThoai", taiKhoanModel.SoDienThoai,
                    "@Email", taiKhoanModel.Email,
                    "@MatKhau", taiKhoanModel.MatKhau);
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

        public TaiKhoanModel Get_TaiKhoan(string IDNguoiDung)
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Hien_TK",
                    "@IDNguoiDung", IDNguoiDung);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<TaiKhoanModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception("Không lấy được tài khoản: " + ex.Message);
            }
        }
    }
}
