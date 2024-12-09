using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using BLL;
using System.Numerics;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DanhMucControllers : ControllerBase
    {
        private readonly IDanhMucBLL _danhMucBLL;
        public DanhMucControllers(IDanhMucBLL danhMucBLL)
        {
            _danhMucBLL = danhMucBLL;
        }

        [Route("Get-All")]
        [HttpGet]
        public IEnumerable<DanhMucModel> GetAll()
        {
            return _danhMucBLL.GetALL();
        }

        [Route("Get_ALL_DanhMuc2/{IDDanhMucCha}")]
        [HttpGet]
        public IEnumerable<Get_ALL_DanhMuc2> get_ALL_DanhMuc2s(string IDDanhMucCha)
        {
            return _danhMucBLL.get_ALL_DanhMuc2s(IDDanhMucCha);
        }

        [Route("Get_ALL_DanhMuc3/{IDDanhMucCon}")]
        [HttpGet] 
        public IEnumerable<Get_ALL_DanhMuc3> get_ALL_DanhMuc3s(string IDDanhMucCon)
        {
            return _danhMucBLL.get_ALL_DanhMuc3s(IDDanhMucCon);
        }

        [Route("Create")]
        [HttpPost]
        public void Create([FromBody] DanhMucModel danhMucModel)
        {
            _danhMucBLL.Create(danhMucModel);
        }

        [Route("Update")]
        [HttpPut]
        public void Update(DanhMucModel danhMucModel)
        {
            _danhMucBLL.Update(danhMucModel);
        }

        [Route("Delete/{IDDanhMuc}")]
        [HttpDelete]
        public void Delete(string IDDanhMuc)
        {
            _danhMucBLL.Delete(IDDanhMuc);
        }
    }
    
}
