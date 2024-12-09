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
    public class MatHangControllers : ControllerBase
    {
        private readonly IMatHangBLL mathangBLL;
        public MatHangControllers(IMatHangBLL matHangBLL)
        {
            mathangBLL = matHangBLL;
        }

        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<GetMatHang> GetAll()
        {
            return mathangBLL.GetALL();
        }
        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] MatHangModel matHangModel)
        {
            mathangBLL.Create(matHangModel);
        }

        [Route("Update")]
        [HttpPut]
        public void Update(MatHangModel matHangModel)
        {
            mathangBLL.Update(matHangModel);
        }

        [Route("Delete/{IDMatHang}")]
        [HttpDelete]
        public void Delete(string IDMatHang)
        {
            mathangBLL.Delete(IDMatHang);
        }
    }
}
