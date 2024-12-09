using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class Tim_MatHang_TenDM
    {
        public string TenDanhMuc { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string HinhAnh { get; set; }
        public string ChiTiet { get; set; }
        public string TrangThai { get; set; }
        public string TyLeGiam { get; set; }
        public string NoiDung { get; set; }
        public string TrangThaiGiamGia { get; set; }
    }

    public partial class HienThi_MHModel
    {
        public string IDMatHang { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string HinhAnh { get; set; }
        public string ChiTiet { get; set; }
        public string TrangThai { get; set; }
    }

    public partial class Tim_MatHang_Gia
    {
        public string TenDanhMuc { get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string HinhAnh { get; set; }
        public string ChiTiet { get; set; }
        public string TrangThai { get; set; }
        public string TyLeGiam { get; set; }
        public string NoiDung { get; set; }
        public string TrangThaiGiamGia { get; set; }
    }
}
