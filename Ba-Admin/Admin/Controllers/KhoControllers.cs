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
    public class KhoControllers : ControllerBase
    {
        private readonly IKhoBLL khoBLL;
        public KhoControllers(IKhoBLL kho)
        {
            khoBLL = kho;
        }
        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<GetKho> GetAll()
        {
            return khoBLL.GetALL();
        }
        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] KhoModel khoModel)
        {
            khoBLL.Create(khoModel);
        }
        [Route("Update")]
        [HttpPut]
        public void Update(KhoModel khoModel)
        {
            khoBLL.Update(khoModel);
        }

        [Route("Delete/{IDMatHang}")]
        [HttpDelete]
        public void Delete(string IDMatHang)
        {
            khoBLL.Delete(IDMatHang);
        }

        [Route("Search_ID/{IDMatHang}")]
        [HttpGet]
        public GetKho Search_ID(string IDMatHang)
        {
            return khoBLL.Search_ID(IDMatHang);
        }
        [Route("Search_Name/{TenMatHang}")]
        [HttpGet]
        public List<GetKho> Search_Name(string TenMatHang)
        {
            return khoBLL.Search_Name(TenMatHang);
        }
    }
}
