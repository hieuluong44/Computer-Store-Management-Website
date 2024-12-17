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
    public class ChiTietMatHangBLL : IChiTietMatHangBLL
    {
        private IChiTietMatHangDAL chiTietMatHang;
        public ChiTietMatHangBLL(IChiTietMatHangDAL ChiTietMatHang)
        {
            this.chiTietMatHang = ChiTietMatHang;
        }

        public List<AnhMatHang> GetAnhMatHangs(string IDMatHang)
        {
            return chiTietMatHang.GetAnhMatHangs(IDMatHang);
        }

        public ChiTietMatHangModel GetChiTietMatHangs(string IDMatHang)
        {
            return chiTietMatHang.GetChiTietMatHangs(IDMatHang);
        }

        public List<ThongSoKyThuat> GetThongSoKyThuats(string IDMatHang)
        {
            return chiTietMatHang.GetThongSoKyThuats(IDMatHang);
        }
    }
}
