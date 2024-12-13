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
    public class DangKyControllers : ControllerBase
    {
        private readonly IDangKyBLL dangKyBLL;
        public DangKyControllers(IDangKyBLL dangKy) 
        { 
        }
    }
}
