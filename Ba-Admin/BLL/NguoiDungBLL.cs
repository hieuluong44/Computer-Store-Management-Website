using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.Net.Sockets;
using System.Security.Claims;

namespace BLL
{
    public partial class NguoiDungBLL : INguoiDungBLL
    {
        private INguoiDungDAL nguoiDungDAL;
        public NguoiDungBLL(INguoiDungDAL nguoiDung)
        {
            this.nguoiDungDAL = nguoiDung;
        }
        public bool Create(NguoiDungModel nguoiDungModel)
        {
            return nguoiDungDAL.Create(nguoiDungModel);
        }

        public bool Delete(string IDNguoiDung)
        {
            return nguoiDungDAL.Delete(IDNguoiDung);
        }

        public List<NguoiDungModel> GetALL()
        {
            return nguoiDungDAL.GetALL();
        }

        public NguoiDungModel Search_ID(string IDNguoiDung)
        {
            return nguoiDungDAL.Search_ID(IDNguoiDung);
        }

        public List<NguoiDungModel> Search_Name(string TenNguoiDung)
        {
           return nguoiDungDAL.Search_Name(TenNguoiDung);
        }

        public bool Update(NguoiDungModel nguoiDungModel)
        {
           return nguoiDungDAL.Equals(nguoiDungModel);
        }
    }
}
