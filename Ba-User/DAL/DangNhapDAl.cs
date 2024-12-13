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
    public class DangNhapDAl : IDangNhapDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

        // Constructor để Dependency Injection
        public DangNhapDAl(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public bool dangNhap(DangNhapModel dangNhap)
        {
            string msgError = "";
            try
            {
                // Thực thi thủ tục và nhận kết quả
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "DangNhap_NguoiDung",
                    "@Email", dangNhap.Email,
                    "@MatKhau", dangNhap.MatKhau);

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
                throw new Exception("Lỗi trong quá trình đăng nhập: " + ex.Message);
            }
        }

    }
}
