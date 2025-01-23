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

        public List<Get_MatHang_DanhMuc> get_MatHang_DanhMuc()
        {
            return matHangDAL.get_MatHang_DanhMuc();
        }

        public List<List_MatHang> list_MatHang()
        {
            return matHangDAL.list_MatHang();
        }

        public List<Tim_MatHang> tim_MatHang_Gia(float GiaMin, float GiaMax)
        {
            return matHangDAL.tim_MatHang_Gia(GiaMin, GiaMax);
        }

        public List<Tim_MatHang> tim_MatHang_Ten(string TenMatHang)
        {
            return matHangDAL.tim_MatHang_Ten(TenMatHang);
        }
    }
}
