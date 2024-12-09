using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public partial class DanhMucBLL : IDanhMucBLL
    {
        private IDanhMucDAL danhMucDAL;
        public DanhMucBLL(IDanhMucDAL danhMucDAL)
        {
            this.danhMucDAL = danhMucDAL;
        }
        

        public bool Create(DanhMucModel danhMucModel)
        {
            return danhMucDAL.Create(danhMucModel);
        }
        public bool Update(DanhMucModel danhMucModel)
        {
            return danhMucDAL.Update(danhMucModel);
        }

        public bool Delete(string IDDanhMuc)
        {
            return danhMucDAL.Delete(IDDanhMuc);
        }

        public List<DanhMucModel> GetALL()
        {
            return danhMucDAL.GetALL();
        }

        public List<Get_ALL_DanhMuc2> get_ALL_DanhMuc2s(string IDDanhMucCha)
        {
            return danhMucDAL.get_ALL_DanhMuc2s(IDDanhMucCha);
        }

        public List<Get_ALL_DanhMuc3> get_ALL_DanhMuc3s(string IDDanhMucCon)
        {
            return danhMucDAL.get_ALL_DanhMuc3s(IDDanhMucCon);
        }

    }
}
