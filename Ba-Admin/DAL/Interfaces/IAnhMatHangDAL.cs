using System;
using System.Collections.Generic;
using Model;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IAnhMatHangDAL
    {
        List<AnhMatHangModel> GetAnhMatHangModels(string IDMatHang);
    }
}
