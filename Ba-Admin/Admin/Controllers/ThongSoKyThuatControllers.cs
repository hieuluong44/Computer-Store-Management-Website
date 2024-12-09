using BLL;
using BLL.Interfaces;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Numerics;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongSoKyThuatControllers : ControllerBase
    {
        private readonly IThongSoKyThuatBLL ThongSoKyThuat;
        public ThongSoKyThuatControllers(IThongSoKyThuatBLL thongSoKyThuat)
        {
            this.ThongSoKyThuat = thongSoKyThuat;
        }
        [Route("Get-All/{IDMatHang}")]
        [HttpGet]
        public IEnumerable<GetThongSoKyThuat> GetAll(string IDMatHang)
        {
            return ThongSoKyThuat.GetALL(IDMatHang);
        }
        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] ThongSoKyThuatModel ThongSo)
        {
            ThongSoKyThuat.Create(ThongSo);
        }

        [Route("Update/{IDThongSo}")]
        [HttpPut]
        public void Update(ThongSoKyThuatModel thongSo)
        {
            ThongSoKyThuat.Update(thongSo);
        }

        [Route("Delete/{IDThongSo}")]
        [HttpDelete]
        public void Delete(string IDThongSo)
        {
            ThongSoKyThuat.Delete(IDThongSo);
        }

    }
}
