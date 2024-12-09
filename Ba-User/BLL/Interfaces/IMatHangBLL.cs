using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IMatHangBLL
    {
        List<Tim_MatHang_TenDM> Tim_MH_TenDM(string TenDanhMuc);
        List<HienThi_MHModel> HienThi_MH();
        List<Tim_MatHang_Gia> tim_MatHang_Gia(float GiaMin, float GiaMax);
    }
}
