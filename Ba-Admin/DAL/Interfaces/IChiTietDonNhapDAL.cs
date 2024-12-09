using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public interface IChiTietDonNhapDAL
    {
        List<GetChiTietNhapModel> GetALL(string IDDonNhap);
        bool Create(ChiTietNhapModel chiTietNhapModel);
        bool Update(ChiTietNhapModel chiTietNhapModel);
        bool Delete(string IDChiTietDonNhap);
    }
}
