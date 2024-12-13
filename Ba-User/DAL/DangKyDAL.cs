using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Reflection;

namespace DAL
{
    public class DangKyDAL : IDangKyDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

        // Constructor để Dependency Injection
        public DangKyDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }
        public bool DangKyNguoiDung(DangKyModel dangKyModel)
        {
            string msgError = "";
            try
            {
                // Thực thi thủ tục và nhận kết quả
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "DangKy_NguoiDung",
                  "@IDNguoiDung", dangKyModel.IDNguoiDung,
               "@TenNguoiDung", dangKyModel.TenNguoiDung,
                "@SoDienThoai", dangKyModel.SoDienThoai,
                "@Email", dangKyModel.Email,
                "@MatKhau", dangKyModel.MatKhau,
                "@HinhAnh", dangKyModel.HinhAnh ?? (object)DBNull.Value,
                "@VaiTro", dangKyModel.VaiTro);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                // Kiểm tra xem DataTable có dữ liệu hay không
                if (result.Rows.Count > 0)
                {
                    // Đăng nhập thành công
                    return true;
                }

                // Đăng nhập thất bại
                return false;
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi đăng ký người dùng: " + ex.Message);
            }
        }
    }
}
