using System;
using System.Collections.Generic;

namespace Model
{
    public class DonDatHangModel
    {
        public string IDDonBan { get; set; }
        public string? IDNguoiDung { get; set; } 
        public string HoTenNguoiNhan { get; set; } = string.Empty;
        public string SoDienThoaiNguoiNhan { get; set; } = string.Empty;
        public string DiaChiNguoiNhan { get; set; } = string.Empty; 
        public DateTime NgayBan { get; set; } = DateTime.Now; 
        public string TrangThai { get; set; } = "Chờ xác nhận"; 
        public string? GhiChu { get; set; } 
        public decimal TongTien { get; set; } = 0; 
        public List<ChiTietDonBan> ListChiTietBan { get; set; } = new List<ChiTietDonBan>();
    }

    public class ChiTietDonBan
    {
        public string IDChiTietDonBan { get; set; }
        public string IDDonBan { get; set; }
        public string IDMatHang { get; set; }
        public int SoLuong { get; set; }
        public decimal GiaBan { get; set; }
    }
}
