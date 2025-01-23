using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface ITaiKhoanDAL
    {
        TaiKhoanModel Get_TaiKhoan(string IDNguoiDung);
        bool DangKy(TaiKhoanModel taiKhoanModel);
        TaiKhoanModel DangNhap(string Email, string MatKhau);
    }
}
