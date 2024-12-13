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
    public class AnhMatHangBLL : IAnhMatHangBLL
    {
        private IAnhMatHangDAL anhMatHangDAL;
        public AnhMatHangBLL(IAnhMatHangDAL AnhMatHangDAL)
        {
            this.anhMatHangDAL = AnhMatHangDAL;
        }

        public List<AnhMatHangModel> GetAnhMatHangModels(string IDMatHang)
        {
            return anhMatHangDAL.GetAnhMatHangModels(IDMatHang);
        }
    }
}
