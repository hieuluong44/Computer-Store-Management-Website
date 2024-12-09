using BLL.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class MatHangBLL : IMatHangBLL
    {
        private IMatHangDAL matHangDAL;
        public MatHangBLL(IMatHangDAL matHang)
        {
            this.matHangDAL = matHang;
        }

        public List<HienThi_MHModel> HienThi_MH()
        {
            return matHangDAL.HienThi_MH();
        }

        public List<Tim_MatHang_Gia> tim_MatHang_Gia(float GiaMin, float GiaMax)
        {
            return matHangDAL.tim_MatHang_Gia(GiaMin, GiaMax);
        }

        public List<Tim_MatHang_TenDM> Tim_MH_TenDM(string TenDanhMuc)
        {
            return matHangDAL.Tim_MH_TenDM(TenDanhMuc);
        }
    }
}
