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
    public class MatHangControllers : ControllerBase
    {
        private readonly IMatHangBLL matHangBLL;
        public MatHangControllers(IMatHangBLL matHang)
        {
            matHangBLL = matHang;
        }
        [Route("Get_MH")]
        [HttpGet]
        public List<HienThi_MHModel> HienThi_MH()
        {
            return matHangBLL.HienThi_MH();
        }

        [Route("Search_NameDM/{TenDanhMuc}")]
        [HttpGet]
        public List<Tim_MatHang_TenDM> Tim_MH_TenDM(string TenDanhMuc)
        {
            return matHangBLL.Tim_MH_TenDM(TenDanhMuc);
        }

        [Route("Search_Gia")]
        [HttpGet]
        public List<Tim_MatHang_Gia> Tim_MatHang_Gia(float GiaMin,float GiaMax)
        {
            return matHangBLL.tim_MatHang_Gia(GiaMin, GiaMax);
        }
    }
}
