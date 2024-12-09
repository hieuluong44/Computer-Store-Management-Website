using BLL.Interfaces;
using BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Numerics;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonNhapControllers : ControllerBase
    {
        private readonly IDonNhapBLL donNhapBLL;
        public DonNhapControllers(IDonNhapBLL DonNhapBLL)
        {
            donNhapBLL = DonNhapBLL;
        }

        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<GetDonNhap> GetAll()
        {
            return donNhapBLL.GetALL();
        }
        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] DonNhapModel donNhapModel)
        {
            donNhapBLL.Create(donNhapModel);
        }

        [Route("Update")]
        [HttpPut]
        public void Update(DonNhapModel donNhapModel)
        {
            donNhapBLL.Update(donNhapModel);
        }

        [Route("Delete/{IDDonNhap}")]
        [HttpDelete]
        public void Delete(string IDDonNhap)
        {
            donNhapBLL.Delete(IDDonNhap);
        }
    }
}
