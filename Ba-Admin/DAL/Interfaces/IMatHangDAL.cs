using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public partial interface IMatHangDAL
    { 
        List<GetMatHang> GetALL();
        bool Create(MatHangModel matHangModel);
        bool CreateMatHang_ChiTiet(ThemMatHang_ChiTiet matHangModel);
        bool Update(MatHangModel matHangModel);
        bool Delete(string IDMatHang);
    }
}

