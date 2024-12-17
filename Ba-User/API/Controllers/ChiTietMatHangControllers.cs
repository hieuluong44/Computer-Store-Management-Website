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
    public class ChiTietMatHangControllers : ControllerBase
    {
        private readonly IChiTietMatHangBLL chiTietMatHangBLL;
        public ChiTietMatHangControllers(IChiTietMatHangBLL chiTietMatHang)
        {
            chiTietMatHangBLL = chiTietMatHang;
        }
        [Route("GetChiTiet_MatHangs/{IDMatHang}")]
        [HttpGet]
        public ChiTietMatHangModel GetChiTietMatHangs(string IDMatHang)
        {
            return chiTietMatHangBLL.GetChiTietMatHangs(IDMatHang);
        }
        [Route("Get_AnhMH/{IDMatHang}")]
        [HttpGet]
        public List<AnhMatHang> GetAnhMatHangs(string IDMatHang)
        {
            return chiTietMatHangBLL.GetAnhMatHangs(IDMatHang);
        }
        [Route("Get_ThongSo/{IDMatHang}")]
        [HttpGet]
        public List<ThongSoKyThuat> GetThongSoKyThuats(string IDMatHang)
        {
            return chiTietMatHangBLL.GetThongSoKyThuats(IDMatHang);
        }
    }
}
