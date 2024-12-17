using System;
using System.Collections.Generic;
using Model;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ChiTietMatHangModel
    {
        public string IDMatHang {  get; set; }
        public string TenMatHang { get; set; }
        public float DonGia { get; set; }
        public string BaoHanh { get; set; }
        public string DuongDan { get; set; }
        public string TrangThai { get; set; }
    }
    public class AnhMatHang
    {
        public string IDMatHang { get; set; }
        public string DuongDan { get; set; }
    }
    public class ThongSoKyThuat
    {
        public string IDMatHang { get; set; }
        public string TenThongSo {  get; set; }
        public string GiaTriThongSo { get; set; }
    }
}
