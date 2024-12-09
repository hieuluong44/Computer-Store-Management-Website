using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BLL.Interfaces
{
    public interface IGiamGiaBLL
    {
        List<GiamGiaModel> GetALL();
        bool Create(GiamGiaModel giamGiaModel);
        bool Update(GiamGiaModel giamGiaModel);
        bool Delete(string IDGiamGia);
    }
}
