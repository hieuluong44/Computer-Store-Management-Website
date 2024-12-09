using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class DanhGiaModel
    {
        public string IDDanhGia { get; set; }
        public string IDMatHang { get; set; }
        public string IDNguoiDung { get; set; }
        public int SoSao { get; set; }
        public string NoiDung { get; set; }
        public DateTime ThoiGianDanhGia { get; set; }

    }
    public class GetDanhGia
    {
        public string IDDanhGia { get; set; }
        public string HinhAnh1 { get; set; }
        public string TenMatHang { get; set; }
        public string TenNguoiDung { get; set; }
        public int SoSao { get; set; }
        public string NoiDung { get; set; }
        public DateTime ThoiGianDanhGia { get; set; }
    }
}
