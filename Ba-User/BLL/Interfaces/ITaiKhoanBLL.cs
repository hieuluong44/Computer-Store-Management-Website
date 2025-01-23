using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ITaiKhoanBLL
    {
        
        TaiKhoanModel Get_TaiKhoan(string IDNguoiDung);
        bool DangKy(TaiKhoanModel taiKhoanModel);
        TaiKhoanModel DangNhap(string Email, string MatKhau);
    }
}
