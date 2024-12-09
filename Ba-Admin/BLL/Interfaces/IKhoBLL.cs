using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace BLL.Interfaces
{
    public interface IKhoBLL
    {
        List<GetKho> GetALL();
        bool Create(KhoModel khoModel);
        bool Update(KhoModel khoModel);
        bool Delete(string IDKho);
        GetKho Search_ID(string IDMatHang);
        List<GetKho> Search_Name(string TenMatHang);
    }
}
