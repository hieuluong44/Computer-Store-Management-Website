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
    public class GiamGiaControllers : ControllerBase
    {
        private readonly IGiamGiaBLL giamGiaBLL;
        public GiamGiaControllers(IGiamGiaBLL giamGia)
        {
            giamGiaBLL = giamGia;
        }
        [Route("Get_GiamGia")]
        [HttpGet]
        public List<HienThi_GiamGia> Hienthi_GiamGia()
        {
            return giamGiaBLL.Hienthi_GiamGia();
        }

        [Route("ApDung_GiamGia")]
        [HttpGet]
        public List<HienThi_GiamGia> ApDung_GiamGia()
        {
            return giamGiaBLL.ApDung_GiamGia();
        }

        [Route("Tim_GiamGia_ND")]
        [HttpGet]
        public List<HienThi_GiamGia> Tim_GiamGia_ND(string NoiDung)
        {
            return giamGiaBLL.Tim_GiamGia_ND(NoiDung);
        }

        [Route("Tim_GiamGia_TT")]
        [HttpGet]
        public List<HienThi_GiamGia> Tim_GiamGia_TT(string TrangThaiGiamGia)
        {
            return giamGiaBLL.Tim_GiamGia_TT(TrangThaiGiamGia);
        }

    }
}
