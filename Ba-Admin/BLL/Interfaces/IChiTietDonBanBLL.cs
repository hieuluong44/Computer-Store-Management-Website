using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IChiTietDonBanBLL
    {
        List<GetChiTietBanModel> GetALL(string IDDonBan);
        bool Create(ChiTietBanModel chiTietBanModel);
        bool Update(ChiTietBanModel chiTietBanModel);
        bool Delete(string IDChiTietDonBan);
    }
}
