using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using BLL;
using System.Numerics;
using DAL;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnhMatHangControllers : ControllerBase
    {
        private readonly IAnhMatHangBLL anhMatHangBLL;
        public AnhMatHangControllers(IAnhMatHangBLL AnhMatHangBLL)
        {
            anhMatHangBLL = AnhMatHangBLL;
        }
        [Route("Get-All/{IDMatHang}")]
        [HttpGet]
        public IEnumerable<AnhMatHangModel> GetAnhMatHangModels(string IDMatHang)
        {
            return anhMatHangBLL.GetAnhMatHangModels(IDMatHang);
        }
    }
}
