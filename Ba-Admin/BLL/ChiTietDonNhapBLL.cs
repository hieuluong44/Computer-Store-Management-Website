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
    public class ChiTietDonNhapBLL : IChiTietDonNhapBLL
    {
        private IChiTietDonNhapDAL chiTietDonNhap;
        public ChiTietDonNhapBLL(IChiTietDonNhapDAL ChiTietDonNhap)
        {
            this.chiTietDonNhap = ChiTietDonNhap;
        }

        public bool Create(ChiTietNhapModel chiTietNhapModel)
        {
            return chiTietDonNhap.Create(chiTietNhapModel);
        }

        public bool Delete(string IDChiTietDonNhap)
        {
            return chiTietDonNhap.Delete(IDChiTietDonNhap);
        }

        public List<GetChiTietNhapModel> GetALL(string IDDonNhap)
        {
            return chiTietDonNhap.GetALL(IDDonNhap);
        }

        public bool Update(ChiTietNhapModel chiTietNhapModel)
        {
            return chiTietDonNhap.Update(chiTietNhapModel);
        }
    }
}
