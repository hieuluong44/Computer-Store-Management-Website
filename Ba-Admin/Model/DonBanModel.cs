using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class DonBanModel
    {
        public string IDDonBan { get; set; }
        public string IDNguoiDung { get; set; }
        public string IDGiamGia { get; set; }
        public DateTime NgayBan { get; set; }
        public string TrangThai { get; set; }
        public string GhiChu { get; set; }
        public float TongTien { get; set; }

        public List<ChiTietBanModel> listChiTienBan { get; set; }
    }
    public class getDonBan
    {
        public string IDDonBan { get; set; }
        public string TenNguoiDung { get; set; }
        public string NoiDung { get; set; }
        public DateTime NgayBan { get; set; }
        public string TrangThai { get; set; }
        public string GhiChu { get; set; }
        public float TongTien { get; set; }

    }
}
