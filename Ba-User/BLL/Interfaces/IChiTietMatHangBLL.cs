using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IChiTietMatHangBLL
    {
        ChiTietMatHangModel GetChiTietMatHangs(string IDMatHang);
        List<ThongSoKyThuat> GetThongSoKyThuats(string IDMatHang);
        List<AnhMatHang> GetAnhMatHangs(string IDMatHang);
    }
}
