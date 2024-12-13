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

    /* Hiẻn thị list mặt hàng theo danh mục */
    public partial class Get_MatHang_DanhMuc
    {
        public string IDMatHang { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string DuongDan { get;set; }
        public string BaoHanh { get; set; } 
        public string ChiTiet { get; set; }
        public string TrangThai { get; set; }
    }

    public partial class Tim_MatHang_Gia
    {
        public string TenDanhMuc { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string HinhAnh1 { get; set; }
        public string ChiTiet { get; set; }
        public string TrangThai { get; set; }
        public string TyLeGiam { get; set; }
        public string NoiDung { get; set; }
    }
}
