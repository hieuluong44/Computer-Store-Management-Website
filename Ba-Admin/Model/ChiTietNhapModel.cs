using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class ChiTietNhapModel
    {
        public string IDChiTietDonNhap { get; set; }
        public string IDDonNhap { get; set; }
        public string IDMatHang { get; set; }
        public int SoLuong { get; set; }
        public double GiaNhap { get; set; }
    }
    public partial class GetChiTietNhapModel
    {
        public string IDChiTietDonNhap { get; set; }
        public string IDDonNhap { get; set; }
        public string TenMatHang { get; set; }
        public int SoLuong { get; set; }
        public double GiaNhap { get; set; }
    }
}
