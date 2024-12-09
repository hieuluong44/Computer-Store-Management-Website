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
    public class ChiTietDonBanBLL : IChiTietDonBanBLL
    {
        private IChiTietDonbanDAL chiTietDonbanDAL;
        public ChiTietDonBanBLL(IChiTietDonbanDAL chiTietDonban)
        {
            this.chiTietDonbanDAL = chiTietDonban;
        }

        public bool Create(ChiTietBanModel chiTietBanModel)
        {
            return chiTietDonbanDAL.Create(chiTietBanModel);
        }

        public bool Delete(string IDChiTietDonBan)
        {
            return chiTietDonbanDAL.Delete(IDChiTietDonBan);
        }

        public List<GetChiTietBanModel> GetALL(string IDDonBan)
        {
            return chiTietDonbanDAL.GetALL(IDDonBan);
        }

        public bool Update(ChiTietBanModel chiTietBanModel)
        {
            return chiTietDonbanDAL.Update(chiTietBanModel);
        }
    }
}
