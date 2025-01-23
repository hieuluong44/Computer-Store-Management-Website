using BLL.Interfaces;
using DAL.Interfaces;
using Model;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BLL
{
    public class TaiKhoanBLL : ITaiKhoanBLL
    {
        private ITaiKhoanDAL taiKhoanDAL;

        public TaiKhoanBLL(ITaiKhoanDAL taiKhoan)
        {
            this.taiKhoanDAL = taiKhoan;
        }

        public bool DangKy(TaiKhoanModel taiKhoanModel)
        {
            return taiKhoanDAL.DangKy(taiKhoanModel);
        }

        public TaiKhoanModel DangNhap(string Email, string MatKhau)
        {
            return taiKhoanDAL.DangNhap(Email, MatKhau);
        }


        public TaiKhoanModel Get_TaiKhoan(string IDNguoiDung)
        {
            return taiKhoanDAL.Get_TaiKhoan(IDNguoiDung);
        }
    }
}
