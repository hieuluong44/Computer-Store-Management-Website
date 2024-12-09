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

        public List<Tim_MatHang_TenDM> Tim_MH_TenDM(string TenDanhMuc)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_MatHang_TenDM",
                    "@TenDanhMuc", TenDanhMuc);

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<Tim_MatHang_TenDM>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception( ex.Message);
            }
        }

        public List<HienThi_MHModel> HienThi_MH()
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "HienThi_MH");

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<HienThi_MHModel>().ToList();
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
