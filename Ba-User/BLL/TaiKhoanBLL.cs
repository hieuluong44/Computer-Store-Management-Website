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
    public class TaiKhoanBLL : ITaiKhoanBLL
    {
        private ITaiKhoanDAL taiKhoanDAL;
        public TaiKhoanBLL(ITaiKhoanDAL taiKhoan)
        {
            this.taiKhoanDAL = taiKhoan;
        }

        public TaiKhoanModel DangNhap(string Email, string MatKhau)
        {
            return taiKhoanDAL.DangNhap(Email, MatKhau);
        }

        public List<TaiKhoanModel> Get_TaiKhoan(string IDNguoiDung)
        {
            return taiKhoanDAL.Get_TaiKhoan(IDNguoiDung);
        }
    }
}
