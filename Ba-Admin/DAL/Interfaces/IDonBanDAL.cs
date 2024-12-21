using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public partial interface IDonBanDAL
    {
        List<getDonBan> GetALL();
        List<TrangThaiDonHangModel> trangThaiDonHangs(string TrangThai);
        bool CapNhatTrangThai(CapNhatTrangThai trangThaiDonHangModel);
        bool Update(DonBanModel donBanModel);
        bool Delete(string IDDonBan);
    }
}
