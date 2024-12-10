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
        public List<Get_MatHang_DanhMuc> get_MatHang_DanhMuc()
        {
            return matHangBLL.get_MatHang_DanhMuc();
        }

        [Route("List_MH")]
        [HttpGet]
        public List<List_MatHang> list_MatHang()
        {
            return matHangBLL.list_MatHang();
        }


        [Route("Search_Gia")]
        [HttpGet]
        public List<Tim_MatHang_Gia> Tim_MatHang_Gia(float GiaMin,float GiaMax)
        {
            return matHangBLL.tim_MatHang_Gia(GiaMin, GiaMax);
        }
    }
}
