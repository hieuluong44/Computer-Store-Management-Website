using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ThongSoKyThuatModel
    {
        public string IDThongSo {  get; set; }
        public string IDMatHang { get; set; }
        public string TenThongSo { get; set; }
        public string GiaTriThongSo { get; set; }
    }
    public class GetThongSoKyThuat
    {
        public string IDThongSo { get; set; }
        public string TenMatHang { get; set; }
        public string TenThongSo { get; set; }
        public string GiaTriThongSo { get; set; }
    }
}
