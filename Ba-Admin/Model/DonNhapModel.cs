using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class DonNhapModel
    {
        public string IDDonNhap { get; set; }
        public string IDNhaCungCap { get; set; }
        public DateTime NgayNhap { get; set; }
        public string TrangThai { get; set; }
        public string GhiChu { get; set; }
        public float TongTien { get; set; }
    }
    public class GetDonNhap
    {
        public string IDDonNhap { get; set; }
        public string TenNhaCungCap { get; set; }
        public DateTime NgayNhap { get; set; }
        public string TrangThai { get; set; }
        public string GhiChu { get; set; }
        public float TongTien { get;set; }
    }

}
