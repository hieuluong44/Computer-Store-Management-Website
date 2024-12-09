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
    public class GiamGiaControllers : ControllerBase
    {
        private readonly IGiamGiaBLL giamGiaBLL;
        public GiamGiaControllers(IGiamGiaBLL giamGia)
        {
            giamGiaBLL = giamGia;
        }
        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<GiamGiaModel> GetAll()
        {
            return giamGiaBLL.GetALL();
        }

        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] GiamGiaModel giamGiaModel)
        {
            giamGiaBLL.Create(giamGiaModel);
        }

        [Route("Update")]
        [HttpPut]
        public void Update(GiamGiaModel giamGiaModel)
        {
            giamGiaBLL.Update(giamGiaModel);
        }

        [Route("Delete/{IDGiamGia}")]
        [HttpDelete]
        public void Delete(string IDGiamGia)
        {
            giamGiaBLL.Delete(IDGiamGia);
        }
    }
}
