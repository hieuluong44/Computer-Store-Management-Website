using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BLL.Interfaces
{
    public interface IThongSoKyThuatBLL
    {
        List<ThongSoKyThuatModel> GetALL(string IDMatHang);
        bool Create(ThongSoKyThuatModel thongSoKyThuatModel);
        bool Update(ThongSoKyThuatModel thongSoKyThuatModel);
        bool Delete(string IDThongSo);
    }
}
