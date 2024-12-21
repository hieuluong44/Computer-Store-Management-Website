using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonDatHangControllers : ControllerBase
    {
        private readonly IDonDatHangBLL donDatHangBLL;

        // Constructor để Dependency Injection
        public DonDatHangControllers(IDonDatHangBLL donDatHang)
        {
            donDatHangBLL = donDatHang;
        }
        [Route("Create")]
        [HttpPost]
        public ActionResult<DonDatHangModel> CreateDonDatHang([FromBody] DonDatHangModel donBan)
        {

            if (donBan.ListChiTietBan != null)
            {
                foreach (var item in donBan.ListChiTietBan)
                {
                    item.IDDonBan = donBan.IDDonBan;
                }
            }

            try
            {
                // Gọi BLL để tạo đơn đặt hàng
                var result = donDatHangBLL.CreateDonDatHang(donBan);
    
                if (result)
                {
                    return Ok(donBan);
                }
                else
                {
                    // Trả về BadRequest nếu không thành công
                    return BadRequest("Không thể tạo đơn đặt hàng. Vui lòng thử lại.");
                }
            }
            catch (Exception ex)
            {
                // Trả về lỗi nếu gặp vấn đề
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
