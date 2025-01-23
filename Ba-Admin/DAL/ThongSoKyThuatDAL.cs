using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public partial class ThongSoKyThuatDAL : IThongSoKyThuatDAL
    {
        DatabaseHelper databaseHelper;

        public ThongSoKyThuatDAL(DatabaseHelper baseHelper)
        {
            databaseHelper = baseHelper;
        }

        // Thêm thông số kỹ thuật
        public bool Create(ThongSoKyThuatModel thongSoKyThuatModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Them_ThongSo",
                    "@IDThongSo", thongSoKyThuatModel.IDThongSo,
                    "@IDMatHang", thongSoKyThuatModel.IDMatHang,
                    "@TenThongSo", thongSoKyThuatModel.TenThongSo,
                    "@GiaTriThongSo", thongSoKyThuatModel.GiaTriThongSo);

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

        // Xóa thông số kỹ thuật
        public bool Delete(string IDThongSo)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_ThongSo",
                    "@IDThongSo", IDThongSo);

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

        public List<ThongSoKyThuatModel> GetALL(string IDMatHang)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "getThongSoKyThuat",
                    "@IDMatHang", IDMatHang);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<ThongSoKyThuatModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Error while retrieving data: " + ex.Message);
            }
        }

        // Cập nhật thông số kỹ thuật
        public bool Update(ThongSoKyThuatModel thongSoKyThuatModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_ThongSo",
                    "@IDThongSo", thongSoKyThuatModel.IDThongSo,
                    "@IDMatHang", thongSoKyThuatModel.IDMatHang,
                    "@TenThongSo", thongSoKyThuatModel.TenThongSo,
                    "@GiaTriThongSo", thongSoKyThuatModel.GiaTriThongSo);

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
    }
}
