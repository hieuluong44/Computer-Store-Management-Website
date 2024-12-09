using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class GiamGiaModel
    {
        public string IDGiamGia { get; set; }
        public string HinhAnh { get; set; }
        public float TyLeGiam { get; set; }
        public string NoiDung { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc {  get; set; }
        public string TrangThaiGiamGia { get; set; }
    }
}
