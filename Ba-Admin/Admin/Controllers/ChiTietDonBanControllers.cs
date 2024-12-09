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
    public class ChiTietDonBanControllers : ControllerBase
    {
        private readonly IChiTietDonBanBLL chiTietDonBan;
        public ChiTietDonBanControllers(IChiTietDonBanBLL ChiTietDonBan)
        {
            chiTietDonBan = ChiTietDonBan;
        }

        [Route("Get-All/{IDDonBan}")]
        [HttpGet]
        public IEnumerable<GetChiTietBanModel> GetAll(string IDDonBan)
        {
            return chiTietDonBan.GetALL(IDDonBan);
        }

        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] ChiTietBanModel chiTietBanModel)
        {
            chiTietDonBan.Create(chiTietBanModel);
        }

        [Route("Update")]
        [HttpPut]
        public void Update(ChiTietBanModel chiTietBanModel)
        {
            chiTietDonBan.Update(chiTietBanModel);
        }

        [Route("Delete/{IDChiTietDonBan}")]
        [HttpDelete]
        public void Delete(string IDChiTietDonBan)
        {
            chiTietDonBan.Delete(IDChiTietDonBan);
        }
    }
}
