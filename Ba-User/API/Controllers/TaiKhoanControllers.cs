using BLL.Interfaces;
using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Numerics;
using DAL;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaiKhoanControllers : ControllerBase
    {
        private readonly ITaiKhoanBLL dangNhapBLL;
        public TaiKhoanControllers(ITaiKhoanBLL dangNhap)
        {
            dangNhapBLL = dangNhap;
        }
        [Route("Dang_Nhap")]
        [HttpPost]
        public IActionResult DangNhap(string Email, string MatKhau)
        {
            // Gọi phương thức DangNhap để lấy kết quả
            var isSuccess = dangNhapBLL.DangNhap(Email, MatKhau);

            // Kiểm tra nếu isSuccess là null
            if (isSuccess == null)
            {
                // Trả về thông báo lỗi nếu đăng nhập thất bại
                return BadRequest(new { message = "Đăng nhập không thành công. Kiểm tra lại thông tin tài khoản." });
            }

            // Trả về thông tin người dùng nếu đăng nhập thành công
            return Ok(new { ID = isSuccess.IDNguoiDung, name = isSuccess.TenNguoiDung, Anh = isSuccess.HinhAnh });
        }


        [Route("Get_TaiKhoan/{IDNguoiDung}")]
        [HttpGet]
        public List<TaiKhoanModel> Get_TaiKhoan(string IDNguoiDung)
        {
            return dangNhapBLL.Get_TaiKhoan(IDNguoiDung);
        }
    }
}
