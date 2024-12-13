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
    public class DangNhapBLL : IDangNhapBLL
    {
        private IDangNhapDAL dangNhap;
        public DangNhapBLL(IDangNhapDAL DangNhaps)
        {
            this.dangNhap = DangNhaps;
        }

        public bool DangNhap(DangNhapModel dangNhapModel)
        {
            return dangNhap.dangNhap(dangNhapModel);
        }
    }
}
