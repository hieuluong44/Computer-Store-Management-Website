using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BLL.Interfaces
{
    public interface IDonNhapBLL
    {
        List<GetDonNhap> GetALL();
        bool Create(DonNhapModel donNhapModel);
        bool Update(DonNhapModel donNhapModel);
        bool Delete(string IDDonNhap);
    }
}
