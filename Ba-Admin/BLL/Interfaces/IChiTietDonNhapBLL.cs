using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IChiTietDonNhapBLL
    {
        List<GetChiTietNhapModel> GetALL(string IDDonNhap);
        bool Create(ChiTietNhapModel chiTietNhapModel);
        bool Update(ChiTietNhapModel chiTietNhapModel);
        bool Delete(string IDChiTietDonNhap);
    }
}
