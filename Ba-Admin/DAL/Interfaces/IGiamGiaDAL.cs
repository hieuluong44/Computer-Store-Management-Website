using System;
using System.Collections.Generic;
using Model;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IGiamGiaDAL
    {
        List<GiamGiaModel> GetALL();
        bool Create(GiamGiaModel giamGiaModel);
        bool Update(GiamGiaModel giamGiaModel);
        bool Delete(string IDGiamGia);
    }
}
