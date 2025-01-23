using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class MatHangBanChayModel
    {
        public string IDMatHang { get; set; }
        public string TenMatHang { get; set; }
        public int TongSoLuongBan { get; set; }
        public decimal DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string TrangThai { get; set; }
    }

    public class DoanhThuModel
    {
        public decimal TongDoanhThu { get; set; }
        public int SoDonHang { get; set; }
        public int SoMatHangBan { get; set; }
        public DateTime NgayBan { get; set; }
    }

    public class TonKhoModel
    {
        public string TenMatHang { get; set; }
        public int SoLuongTon { get; set; }
        public decimal GiaTriTonKho { get; set; }
    }
}
    