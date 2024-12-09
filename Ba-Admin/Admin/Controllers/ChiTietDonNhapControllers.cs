using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using BLL;
using System.Numerics;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietDonNhapControllers : ControllerBase
    {
        private readonly IChiTietDonNhapBLL chiTietDonNhap;
        public ChiTietDonNhapControllers(IChiTietDonNhapBLL chiTietDonNhapBLL)
        {
            chiTietDonNhap = chiTietDonNhapBLL;
        }

        [Route("Get-All/{IDDonNhap}")]
        [HttpGet]
        public IEnumerable<GetChiTietNhapModel> GetAll(string IDDonNhap)
        {
            return chiTietDonNhap.GetALL(IDDonNhap);
        }

        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] ChiTietNhapModel chiTietNhapModel)
        {
            chiTietDonNhap.Create(chiTietNhapModel);
        }

        [Route("Update")]
        [HttpPut]
        public void Update(ChiTietNhapModel chiTietNhapModel)
        {
            chiTietDonNhap.Update(chiTietNhapModel);
        }

        [Route("Delete/{IDchiTietDonNhap}")]
        [HttpDelete]
        public void Delete(string IDchiTietDonNhap)
        {
            chiTietDonNhap.Delete(IDchiTietDonNhap);
        }
    }
}
