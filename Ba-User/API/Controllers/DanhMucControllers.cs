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
    public class DanhMucControllers : ControllerBase
    {
        private readonly IDanhMucBLL danhMucBLL;
        public DanhMucControllers(IDanhMucBLL danhMuc)
        {
            danhMucBLL = danhMuc;
        }

        [Route("Get_DanhMuc")]
        [HttpGet]
        public List<DanhMucChaModel> GetDanhMuc()
        {
            return danhMucBLL.GetDanhMuc();
        }

        [Route("Get_DanhMucCon/{IDDanhMucCha}")]
        [HttpGet]
        public List<DanhMucConModel> GetDanhMucCon(string IDDanhMucCha)
        {
            return danhMucBLL.GetDanhMucCon(IDDanhMucCha);
        }

        [Route("Get_DanhMucChau/{IDDanhMucCon}")]
        [HttpGet]
        public List<DanhMucChauModel> GetDanhMucChau(string IDDanhMucCon)
        {
            return danhMucBLL.GetDanhMucChau(IDDanhMucCon);
        }

    }
}
