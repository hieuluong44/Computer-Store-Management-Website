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
    public class DanhGiaControllers : ControllerBase
    {
        private readonly IDanhGiaBLL danhGiaBLL;
        public DanhGiaControllers(IDanhGiaBLL danhGia)
        {
            danhGiaBLL = danhGia;
        }

        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<GetDanhGia> GetAll()
        {
            return danhGiaBLL.GetALL();
        }

        [Route("Delete/{IDDanhGia}")]
        [HttpDelete]
        public void Delete(string IDDanhGia)
        {
            danhGiaBLL.Delete(IDDanhGia);
        }
    }
}
