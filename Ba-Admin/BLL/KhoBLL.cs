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
    public partial class KhoBLL : IKhoBLL
    {
        private IKhoDAL KhoDAL;
        public KhoBLL(IKhoDAL khoDAL)
        {
            this.KhoDAL = khoDAL;
        }
        public bool Create(KhoModel khoModel)
        {
            return KhoDAL.Create(khoModel);
        }

        public bool Delete(string IDKho)
        {
            return KhoDAL.Delete(IDKho);
        }

        public List<GetKho> GetALL()
        {
            return KhoDAL.GetALL();
        }

        public GetKho Search_ID(string IDMatHang)
        {
            return KhoDAL.Search_ID(IDMatHang);
        }

        public List<GetKho> Search_Name(string TenMatHang)
        {
            return KhoDAL.Search_Name(TenMatHang);
        }

        public bool Update(KhoModel khoModel)
        {
           return KhoDAL.Update(khoModel);
        }
    }
}
