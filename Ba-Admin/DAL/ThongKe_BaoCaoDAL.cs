using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL
{
    public partial class ThongKe_BaoCaoDAL : IThongKe_BaoCaoDAL
    {
        private IDatabaseHelper databaseHelper;

        public ThongKe_BaoCaoDAL(IDatabaseHelper database)
        {
            databaseHelper = database;
        }

        public List<MatHangBanChayModel> ThongKeTop10MatHangBanChay()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "ThongKeTop10MatHangBanChay");

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                return result.ConvertTo<MatHangBanChayModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy thống kê mặt hàng bán chạy", ex);
            }
        }

        public List<DoanhThuModel> GetThongKeDoanhThu(DateTime? tuNgay = null, DateTime? denNgay = null)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "ThongKeDoanhThu",
                    "@TuNgay", tuNgay.HasValue ? (object)tuNgay.Value : DBNull.Value,
                    "@DenNgay", denNgay.HasValue ? (object)denNgay.Value : DBNull.Value);

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                return result.ConvertTo<DoanhThuModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy thống kê doanh thu", ex);
            }
        }

        // Thực thi thủ tục ThongKeTonKho
        public List<TonKhoModel> GetThongKeTonKho()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "ThongKeTonKho");

                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }

                // Chuyển đổi DataTable thành danh sách đối tượng TonKhoModel
                return result.ConvertTo<TonKhoModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy thống kê tồn kho", ex);
            }
        }
    }
}
