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
        [Route("get-img/{fileName}")]
        [HttpGet]
        public IActionResult getImg(string fileName)
        {
            try
            {
                string path = Path.Combine("F:\\DoAn2_LuongCongHieu_10122166\\Fe-Admin\\Quản trị\\Item", fileName);

                if (!System.IO.File.Exists(path))
                {
                    throw new FileNotFoundException("File không tồn tại.");
                }
                var memoryStream = new MemoryStream();
                using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read))
                {
                    stream.CopyTo(memoryStream);
                }
                memoryStream.Position = 0;
                IFormFile formFile = new FormFile(memoryStream, 0, memoryStream.Length, fileName, fileName)
                {
                    Headers = new HeaderDictionary(),
                    ContentType = "application/octet-stream"
                };
                return File(formFile.OpenReadStream(), formFile.ContentType, formFile.FileName);
            }
            catch
            {
                return null;
            }
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

        [Route("createMatHang_ChiTiet")]
        [HttpPost]
        public ThemMatHang_ChiTiet CreateMatHang_ChiTiet([FromBody] ThemMatHang_ChiTiet matHangModel)
        {
            matHangModel.IDMatHang = Guid.NewGuid().ToString();
            if (matHangModel.ThongSoKyThuat != null)
            {
                foreach (var item in matHangModel.ThongSoKyThuat)
                {
                    item.IDMatHang = matHangModel.IDMatHang;
                    item.IDThongSo = Guid.NewGuid().ToString();
                }
            }
            mathangBLL.CreateMatHang_ChiTiet(matHangModel);
            return matHangModel;
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
