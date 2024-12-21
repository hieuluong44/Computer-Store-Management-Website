using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class List_MatHang
    {
        public string IDMatHang { get; set; }
        public string TenMatHang { get; set; }
        public float GiaBan { get; set; }
        public string DuongDan { get; set; }
        public string TrangThai { get; set; }
        public int TongSoLuongBan { get; set; }
    }

    public class Get_MatHang_DanhMuc
    {
        public string DuongDan { get; set; }
        public string IDMatHang { get; set; }
        public string TenDanhMucCha { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; } 
        public string TrangThai { get; set; }
        public int TongSoLuongBan { get; set; }
    }

    public partial class Tim_MatHang_Gia
    {
        public string TenDanhMuc { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string TrangThai { get; set; }
    }
}
