using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class HienThi_GiamGia
    {
        public string IDGiamGia { get; set; }
        public string HinhAnh { get; set; }
        public string TyLeGiam {  get; set; }
        public string NoiDung { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
        public string TrangThaiGiamGia { get; set; }
    }
}
