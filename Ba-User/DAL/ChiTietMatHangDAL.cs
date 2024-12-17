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
    public class ChiTietMatHangDAL : IChiTietMatHangDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

        // Constructor để Dependency Injection
        public ChiTietMatHangDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }
        public List<AnhMatHang> GetAnhMatHangs(string IDMatHang)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "getAnhMatHang",
                    "@IDMatHang", IDMatHang);

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<AnhMatHang>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ChiTietMatHangModel GetChiTietMatHangs(string IDMatHang)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_MatHang_User",
                    "@IDMatHang", IDMatHang);

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<ChiTietMatHangModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<ThongSoKyThuat> GetThongSoKyThuats(string IDMatHang)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "getThongSoKyThuat",
                    "@IDMatHang", IDMatHang);

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<ThongSoKyThuat>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
