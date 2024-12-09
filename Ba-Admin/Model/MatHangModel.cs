using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Model
{
    public partial class MatHangModel
    {
        public string IDMatHang { get; set; }
        public string IDLoaiMatHang { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string HinhAnh1 { get; set; }
        public string TrangThai { get; set; }
    }
    public class ThemMatHang_ThongSo
    {
        public string IDMatHang { get; set; }
        public string IDLoaiMatHang { get; set; }
        public string IDGiamGia { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string HinhAnh1 { get; set; }
        public string TrangThai { get; set; }

        // Danh sách thông số kỹ thuật của mặt hàng này
        public List<ThongSoKyThuatModel> ThongSoKyThuat { get; set; }

    }
    public class GetMatHang
    {
        public string IDMatHang { get; set; }
        public string TenDanhMuc { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string HinhAnh1 { get; set; }
        public string TrangThai { get; set; }
    }
}
