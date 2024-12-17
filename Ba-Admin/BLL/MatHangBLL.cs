using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;


namespace BLL
{
    public partial class MatHangBLL : IMatHangBLL
    {
        private IMatHangDAL matHangDAL;
        public MatHangBLL(IMatHangDAL matHangDAL)
        {
            this.matHangDAL = matHangDAL;
        }
        public List<GetMatHang> GetALL()
        {
            return matHangDAL.GetALL();
        }
        public bool Create(MatHangModel matHangModel)
        {
            return matHangDAL.Create(matHangModel);
        }

        public bool Delete(string IDMatHang)
        {
            return matHangDAL.Delete(IDMatHang);
        }

        public bool Update(MatHangModel matHangModel)
        {
            return matHangDAL.Update(matHangModel);
        }

        public bool CreateMatHang_ChiTiet(ThemMatHang_ChiTiet matHangModel)
        {
            return matHangDAL.CreateMatHang_ChiTiet(matHangModel);
        }


    }
}
