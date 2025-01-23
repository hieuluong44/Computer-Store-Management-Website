using Model;
using System;
using System.Collections.Generic;
using System.Text;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class ThongKe_BaoCaoBLL : IThongKe_BaoCaoBLL
    {
        private IThongKe_BaoCaoDAL _thongKe_BaoCaoDAL;

        public ThongKe_BaoCaoBLL(IThongKe_BaoCaoDAL thongKe_BaoCaoDAL)
        {
            _thongKe_BaoCaoDAL = thongKe_BaoCaoDAL;
        }

        public List<DoanhThuModel> GetThongKeDoanhThu(DateTime? tuNgay = null, DateTime? denNgay = null)
        {
            try
            {
                return _thongKe_BaoCaoDAL.GetThongKeDoanhThu(tuNgay, denNgay);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy thống kê doanh thu từ BLL", ex);
            }
        }

        public List<TonKhoModel> GetThongKeTonKho()
        {
            try
            {
                return _thongKe_BaoCaoDAL.GetThongKeTonKho();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy thống kê tồn kho từ BLL", ex);
            }
        }

        public List<MatHangBanChayModel> ThongKeTop10MatHangBanChay()
        {
            try
            {
                return _thongKe_BaoCaoDAL.ThongKeTop10MatHangBanChay();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy thống kê mặt hàng bán chạy từ BLL", ex);
            }
        }
    }
}
