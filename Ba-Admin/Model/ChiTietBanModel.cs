using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class ChiTietBanModel
    {
        public string IDChiTietDonBan { get; set; }
        public string IDDonBan { get; set; }
        public string IDMatHang { get; set; }
        public string NoiDungGiamGia { get; set; }
        public int SoLuong { get; set; }
        public double GiaBan { get; set; }
    }

    public partial class GetChiTietBanModel
    {
        public string IDChiTietDonBan { get; set; }
        public string IDDonBan { get; set; }
        public string IDMatHang { get; set; }
        public string TenMatHang { get; set; }
        public int SoLuong { get; set; }
        public double GiaBan { get; set; }
    }

}
