using System;
using System.Collections.Generic;
using Model;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IChiTietMatHangDAL
    {
        ChiTietMatHangModel GetChiTietMatHangs(string IDMatHang);
        List<ThongSoKyThuat> GetThongSoKyThuats(string IDMatHang);
        List<AnhMatHang> GetAnhMatHangs(string IDMatHang);
    }
}
