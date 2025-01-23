using Model;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.Interfaces
{
    public interface IThongKe_BaoCaoBLL
    {
        List<MatHangBanChayModel> ThongKeTop10MatHangBanChay();

        List<DoanhThuModel> GetThongKeDoanhThu(DateTime? tuNgay = null, DateTime? denNgay = null);

        List<TonKhoModel> GetThongKeTonKho();
    }
}
