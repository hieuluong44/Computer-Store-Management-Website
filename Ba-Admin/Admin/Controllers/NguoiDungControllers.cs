using BLL;
using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Numerics;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NguoiDungControllers : ControllerBase
    {
        private readonly INguoiDungBLL nguoiDungBLL;
        public NguoiDungControllers(INguoiDungBLL nguoiDung)
        {
            nguoiDungBLL = nguoiDung;
        }
        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<NguoiDungModel> GetAll()
        {
            return nguoiDungBLL.GetALL();
        }
        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] NguoiDungModel nguoiDungModel)
        {
            nguoiDungBLL.Create(nguoiDungModel);
        }

        [Route("Update")]
        [HttpPut]
        public void Update(NguoiDungModel nguoiDungModel)
        {
            nguoiDungBLL.Update(nguoiDungModel);
        }

        [Route("Delete/{IDNguoiDung}")]
        [HttpDelete]
        public void Delete(string IDNguoiDung)
        {
            nguoiDungBLL.Delete(IDNguoiDung);
        }

        [Route("Search_ID/{IDNguoiDung}")]
        [HttpGet]
        public NguoiDungModel Search_ID(string IDNguoiDung)
        {
            return nguoiDungBLL.Search_ID(IDNguoiDung);
        }

        [Route("Search_Name/{TenNguoiDung}")]
        [HttpGet]
        public List<NguoiDungModel> Search_Name(string TenNguoiDung)
        {
            return nguoiDungBLL.Search_Name(TenNguoiDung);
        }
    }
}
