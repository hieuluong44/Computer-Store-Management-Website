using System;
using System.Collections.Generic;
using Model;
using System.Text;

namespace DAL.Interfaces
{
    public interface IThongKe_BaoCaoDAL
    {
        List<MatHangBanChayModel> ThongKeTop10MatHangBanChay();

        List<DoanhThuModel> GetThongKeDoanhThu(DateTime? tuNgay = null, DateTime? denNgay = null);

        List<TonKhoModel> GetThongKeTonKho();
    }
}
