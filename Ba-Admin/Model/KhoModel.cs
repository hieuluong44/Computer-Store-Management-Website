using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class KhoModel
    {
        public string IDKho { get; set; }
        public string IDMatHang { get; set; }
        public int SoLuong { get; set; }
        public DateTime NgayCapNhat { get; set; }
    }
    public class GetKho
    {
        public string IDKho { get; set; }   
        public string HinhAnh1 { get; set; }
        public string TenMatHang { get; set; }
        public int SoLuong { get; set; }
        public DateTime NgayCapNhat { get; set; }
    }
}
