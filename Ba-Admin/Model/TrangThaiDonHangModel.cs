using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class TrangThaiDonHangModel
    {
        public string IDDonBan { get; set; }
        public string TenNguoiDung {  get; set; }
        public string NoiDung {  get; set; }
        public float TyLeGiam { get;set; }
        public DateTime NgayBan { get; set; }
        public string GhiChu {  get; set; }
        public float TongTien {  get; set; }
        public string TrangThai {  get; set; }
    }
    public class CapNhatTrangThai
    {
        public string IDDonBan { get; set; }
        public string TrangThai { get; set; }

    }
}
