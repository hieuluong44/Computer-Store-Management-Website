using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;


namespace BLL
{
    public partial class DanhGiaBLL : IDanhGiaBLL
    {
        private IDanhGiaDAL danhGiaDAL;
        public DanhGiaBLL(IDanhGiaDAL danhGia)
        {
            this.danhGiaDAL = danhGia;
        }
        public bool Delete(string IDDanhGia)
        {
            return danhGiaDAL.Delete(IDDanhGia);
        }

        public List<GetDanhGia> GetALL()
        {
            return danhGiaDAL.GetALL();
        }
    }
}
