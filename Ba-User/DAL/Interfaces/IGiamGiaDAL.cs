using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public interface IGiamGiaDAL
    {
        List<HienThi_GiamGia> Hienthi_GiamGia();
        List<HienThi_GiamGia> ApDung_GiamGia();
        List<HienThi_GiamGia> Tim_GiamGia_ND(string NoiDung);
        List<HienThi_GiamGia> Tim_GiamGia_TT(string TrangThaiGiamGia);
    }
}
