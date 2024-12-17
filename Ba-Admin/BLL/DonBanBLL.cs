using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;
using DAL;

namespace BLL
{
    public partial class DonBanBLL : IDonBanBLL
    {
        private IDonBanDAL donBanDAL;
        public DonBanBLL(IDonBanDAL donBan)
        {
            this.donBanDAL = donBan;
        }

        public bool Create(DonBanModel donBanModel)
        {
            return donBanDAL.Create(donBanModel);
        }

        public bool Delete(string IDDonBan)
        {
            return donBanDAL.Delete(IDDonBan);
        }

        public List<getDonBan> GetALL()
        {
            return donBanDAL.GetALL();
        }

        public bool Update(DonBanModel donBanModel)
        {
            return donBanDAL.Update(donBanModel);
        }
        public List<TrangThaiDonHangModel> trangThaiDonHangs(string TrangThai)
        {
            return donBanDAL.trangThaiDonHangs(TrangThai);
        }

        public bool CapNhatTrangThai(CapNhatTrangThai trangThaiDonHangModel)
        {
            return donBanDAL.CapNhatTrangThai(trangThaiDonHangModel);
        }
    }
}
