using BLL.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BLL
{
    public partial class GiamGiaBLL : IGiamGiaBLL
    {
        private IGiamGiaDAL giamGiaDAL;
        public GiamGiaBLL(IGiamGiaDAL giamGia)
        {
            this.giamGiaDAL = giamGia;
        }

        public List<HienThi_GiamGia> ApDung_GiamGia()
        {
            return giamGiaDAL.ApDung_GiamGia();
        }

        public List<HienThi_GiamGia> Hienthi_GiamGia()
        {
            return giamGiaDAL.Hienthi_GiamGia();
        }

        public List<HienThi_GiamGia> Tim_GiamGia_ND(string NoiDung)
        {
            return giamGiaDAL.Tim_GiamGia_ND(NoiDung);
        }

        public List<HienThi_GiamGia> Tim_GiamGia_TT(string TrangThaiGiamGia)
        {
            return giamGiaDAL.Tim_GiamGia_TT(TrangThaiGiamGia);
        }
    }
}
