using BLL.Interfaces;
using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Numerics;
using System.Reflection;
using DAL;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonBanControllers : ControllerBase
    {
        private readonly IDonBanBLL donBanBLL;
        public DonBanControllers(IDonBanBLL donBan)
        {
            donBanBLL = donBan;
        }

        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<getDonBan> GetAll()
        {
            return donBanBLL.GetALL();
        }
        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] DonBanModel donBan)
        {
            donBan.IDDonBan = Guid.NewGuid().ToString();
            if (donBan.listChiTienBan != null)
            {
                foreach (var item in donBan.listChiTienBan)
                {
                    item.IDDonBan = donBan.IDDonBan;
                    item.IDChiTietDonBan = Guid.NewGuid().ToString();
                }

            }
            donBanBLL.Create(donBan);
        }

        [Route("Update_TrangThai")]
        [HttpPut]
        public ActionResult<CapNhatTrangThai> CapNhatTrangThai(CapNhatTrangThai trangThaiDonHang)
        {
            try
            {
                donBanBLL.CapNhatTrangThai(trangThaiDonHang);
                return Ok(new { message = "Cập nhật trạng thái thành công!" }); 
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Cập nhật trạng thái thất bại: " + ex.Message });
            }
        }


        [Route("Update")]
        [HttpPut]
        public void Update(DonBanModel donBan)
        {
            donBanBLL.Update(donBan);
        }

        [Route("Delete/{IDDonBan}")]
        [HttpDelete]
        public void Delete(string IDDonBan)
        {
            donBanBLL.Delete(IDDonBan);
        }

        [Route("DonBan_TrangThai/{TrangThai}")]
        [HttpGet]
        public List<TrangThaiDonHangModel> trangThaiDonHangs(string TrangThai)
        {
            return donBanBLL.trangThaiDonHangs(TrangThai);
        }

    }
}
