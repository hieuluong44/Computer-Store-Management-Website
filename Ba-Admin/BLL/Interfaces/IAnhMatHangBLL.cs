using System;
using System.Collections.Generic;
using Model;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IAnhMatHangBLL
    {
        List<AnhMatHangModel> GetAnhMatHangModels(string IDMatHang);
    }
}
