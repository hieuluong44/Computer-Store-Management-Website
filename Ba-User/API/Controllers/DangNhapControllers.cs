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
    public class DangNhapControllers : ControllerBase
    {
        private readonly IDangNhapBLL dangNhapBLL;
        public DangNhapControllers(IDangNhapBLL dangNhap)
        {
            dangNhapBLL = dangNhap;
        }
        [Route("Dang_Nhap")]
        [HttpPost]
        public IActionResult DangNhap(DangNhapModel dangNhap)
        {
            try
            {
                var isSuccess = dangNhapBLL.DangNhap(dangNhap);
                if (isSuccess)
                {
                    return Ok(new { Status = "Success", Message = "Đăng nhập thành công" });
                }
                else
                {
                    return BadRequest(new { Status = "Fail", Message = "Email hoặc mật khẩu không đúng" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Status = "Error", Message = ex.Message });
            }
        }

    }
}
