using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BLL.Interfaces
{
    public interface IDonBanBLL
    {
        List<TrangThaiDonHangModel> trangThaiDonHangs(string TrangThai);
        bool CapNhatTrangThai(CapNhatTrangThai trangThaiDonHangModel);

        List<getDonBan> GetALL();
        bool Create(DonBanModel donBanModel);
        bool Update(DonBanModel donBanModel);
        bool Delete(string IDDonBan);
    }
}
