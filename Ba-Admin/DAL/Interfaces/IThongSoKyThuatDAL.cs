using System;
using System.Collections.Generic;
using System.Text;
using Model;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface  IThongSoKyThuatDAL
    {
        List<GetThongSoKyThuat> GetALL(string IDMatHang);
        bool Create(ThongSoKyThuatModel thongSoKyThuatModel);
        bool Update(ThongSoKyThuatModel thongSoKyThuatModel);
        bool Delete(string IDThongSo);
    }
}
