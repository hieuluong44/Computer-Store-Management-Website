using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface ITaiKhoanBLL
    {
        List<TaiKhoanModel> Get_TaiKhoan(string IDNguoiDung);
        TaiKhoanModel DangNhap(string Email, string MatKhau);
    }
}
