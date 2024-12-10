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

        // Constructor được sửa thành public để hỗ trợ DI
        public MatHangDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public List<Get_MatHang_DanhMuc> get_MatHang_DanhMuc()
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_MatHang_DanhMuc");

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
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
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "MatHang_BanChay");

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<List_MatHang>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<Tim_MatHang_Gia> tim_MatHang_Gia(float GiaMin, float GiaMax)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "tim_MatHang_Gia",
                    "@GiaMin", GiaMin, "@GiaMax", GiaMax);


                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<Tim_MatHang_Gia>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
