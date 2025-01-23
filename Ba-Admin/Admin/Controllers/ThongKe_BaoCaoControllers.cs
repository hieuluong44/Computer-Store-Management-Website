using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using System;
using System.Collections.Generic;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThongKe_BaoCaoControllers : ControllerBase
    {
        private readonly IThongKe_BaoCaoBLL _thongKe_BaoCaoBLL;

        public ThongKe_BaoCaoControllers(IThongKe_BaoCaoBLL thongKe_BaoCao)
        {
            _thongKe_BaoCaoBLL = thongKe_BaoCao;
        }

        [Route("DoanhThu")]
        [HttpGet]
        public IActionResult GetThongKeDoanhThu(DateTime? tuNgay = null, DateTime? denNgay = null)
        {
            try
            {
                
                var doanhThu = _thongKe_BaoCaoBLL.GetThongKeDoanhThu(tuNgay, denNgay);
                if (doanhThu == null || doanhThu.Count == 0)
                {
                    return NotFound("Không có dữ liệu thống kê doanh thu.");
                }
                return Ok(doanhThu);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Lỗi khi lấy thống kê doanh thu: {ex.Message}");
            }
        }

        [Route("TonKho")]
        [HttpGet]
        public IActionResult GetThongKeTonKho()
        {
            try
            {
               
                var tonKho = _thongKe_BaoCaoBLL.GetThongKeTonKho();
                if (tonKho == null || tonKho.Count == 0)
                {
                    return NotFound("Không có dữ liệu thống kê tồn kho.");
                }
                return Ok(tonKho);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Lỗi khi lấy thống kê tồn kho: {ex.Message}");
            }
        }

        [Route("Top10MatHangBanChay")]
        [HttpGet]
        public List<MatHangBanChayModel> ThongKeTop10MatHangBanChay()
        {
            return _thongKe_BaoCaoBLL.ThongKeTop10MatHangBanChay();
        }
    }
}
