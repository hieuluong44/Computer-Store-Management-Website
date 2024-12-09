using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public partial class DonNhapBLL : IDonNhapBLL
    {
        private IDonNhapDAL donNhapDAL;
        public DonNhapBLL(IDonNhapDAL DonNhapDAL)
        {
            this.donNhapDAL = DonNhapDAL;
        }
        public List<GetDonNhap> GetALL()
        {
            return donNhapDAL.GetALL();
        }
        public bool Create(DonNhapModel donNhapModel)
        {
            return donNhapDAL.Create(donNhapModel);
        }

        public bool Delete(string IDDonNhap)
        {
            return donNhapDAL.Delete(IDDonNhap);
        }
        public bool Update(DonNhapModel donNhapModel)
        {
            return donNhapDAL.Update(donNhapModel);
        }
    }
}
