using BLL;
using BLL.Interfaces;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System.Numerics;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhaCungCapControllers : ControllerBase
    {
        private readonly INhaCungCapBLL nhacungCapBLL;
        public NhaCungCapControllers(INhaCungCapBLL nhaCungCapBLL)
        {
            nhacungCapBLL = nhaCungCapBLL;
        }
        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<NhaCungCapModel> GetALL()
        {
           return nhacungCapBLL.GetALL();
        }

        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] NhaCungCapModel nhaCungCapModel)
        {
            nhacungCapBLL.Create(nhaCungCapModel);
        }

        [Route("Update/{IDNhaCungCap}")]
        [HttpPut]
        public void Update(NhaCungCapModel nhaCungCapModel)
        {
            nhacungCapBLL.Update(nhaCungCapModel);
        }

        [Route("Delete/{IDNhaCungCap}")]
        [HttpDelete]
        public void Delete(string IDNhaCungCap)
        {
            nhacungCapBLL.Delete(IDNhaCungCap);
        }
    }
}
