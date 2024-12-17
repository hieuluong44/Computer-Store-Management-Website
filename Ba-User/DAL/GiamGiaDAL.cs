using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;

namespace DAL
{
    public class GiamGiaDAL : IGiamGiaDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

        // Constructor được sửa thành public để hỗ trợ DI
        public GiamGiaDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public List<HienThi_GiamGia> ApDung_GiamGia()
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "get_GiamGia_User");

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<HienThi_GiamGia>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<HienThi_GiamGia> Hienthi_GiamGia()
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "HienThi_GiamGia");

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<HienThi_GiamGia>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<HienThi_GiamGia> Tim_GiamGia_ND(string NoiDung)
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_GiamGia_ND",
                    "@NoiDung", NoiDung);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); 
                }

                return result.ConvertTo<HienThi_GiamGia>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<HienThi_GiamGia> Tim_GiamGia_TT(string TrangThaiGiamGia)
        {
            string msgError = "";
            try
            {
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_GiamGia_TT",
                    "@TrangThaiGiamGia", TrangThaiGiamGia);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                return result.ConvertTo<HienThi_GiamGia>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
