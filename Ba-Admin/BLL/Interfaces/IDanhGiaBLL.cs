using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;


namespace BLL.Interfaces
{
    public interface IDanhGiaBLL
    {
        List<GetDanhGia> GetALL();
        bool Delete(string IDDanhGia);
    }
}
