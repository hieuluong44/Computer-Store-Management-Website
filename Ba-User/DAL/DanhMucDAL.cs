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
    public class DanhMucDAL : IDanhMucDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

        // Constructor để Dependency Injection
        public DanhMucDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public List<DanhMucChaModel> GetDanhMuc()
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_DanhMuc1");

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<DanhMucChaModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<DanhMucChauModel> GetDanhMucChau(string IDDanhMucCon)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_DanhMuc2",
                    "@IDDanhMucCha", IDDanhMucCon);

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<DanhMucChauModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public List<DanhMucConModel> GetDanhMucCon(string IDDanhMucCha)
        {
            string msgError = "";
            try
            {
                // Gọi stored procedure với tham số
                var result = _databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_DanhMuc2",
                    "@IDDanhMucCha", IDDanhMucCha);

                // Kiểm tra xem có lỗi xảy ra khi gọi stored procedure
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError); // Ném ngoại lệ với thông báo lỗi
                }

                // Chuyển đổi kết quả thành danh sách các đối tượng MatHangModel
                return result.ConvertTo<DanhMucConModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
