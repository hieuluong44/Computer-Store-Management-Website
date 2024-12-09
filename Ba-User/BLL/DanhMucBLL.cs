using System;
using System.Collections.Generic;
using Model;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class DanhMucBLL : IDanhMucBLL
    {
        private IDanhMucDAL danhMucDAL;
        public DanhMucBLL(IDanhMucDAL danhMuc)
        {
            this.danhMucDAL = danhMuc;
        }
        public List<DanhMucChaModel> GetDanhMuc()
        {
            return danhMucDAL.GetDanhMuc();
        }

        public List<DanhMucChauModel> GetDanhMucChau(string IDDanhMucCon)
        {
            return danhMucDAL.GetDanhMucChau(IDDanhMucCon);
        }

        public List<DanhMucConModel> GetDanhMucCon(string IDDanhMucCha)
        {
            return danhMucDAL.GetDanhMucCon(IDDanhMucCha);
        }
    }
}
