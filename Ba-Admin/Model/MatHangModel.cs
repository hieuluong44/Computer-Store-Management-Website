using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Model
{
    public partial class MatHangModel
    {
        public string IDMatHang { get; set; }
        public string IDDanhMuc { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string TrangThai { get; set; }
    }
    public class ThemMatHang_ChiTiet
    {
        public string IDMatHang { get; set; }
        public string IDDanhMuc { get; set; }
        public string IDGiamGia { get; set; }
        public string TenMatHang { get; set; }
        public decimal DonGia { get; set; }  
        public string BaoHanh { get; set; }  
        public string TrangThai { get; set; }  

        public List<ThongSoKyThuatModel> ThongSoKyThuat { get; set; }

        // Danh sách ảnh mặt hàng (nếu cần)
        public List<AnhMatHangModel> AnhMatHang { get; set; }

    }
    public class GetMatHang
    {
        public string IDMatHang { get; set; }
        public string TenDanhMuc { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string DuongDan { get; set; }
        public string TrangThai { get; set; }
    }
}
