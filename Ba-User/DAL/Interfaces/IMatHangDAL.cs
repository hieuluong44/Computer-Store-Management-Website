using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public interface IMatHangDAL
    {
        List<Tim_MatHang_TenDM> Tim_MH_TenDM(string TenDanhMuc);
        List<HienThi_MHModel> HienThi_MH();
        List<Tim_MatHang_Gia> tim_MatHang_Gia(float GiaMin, float GiaMax);
    }
}
