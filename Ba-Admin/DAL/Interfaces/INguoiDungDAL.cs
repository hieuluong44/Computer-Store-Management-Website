using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public partial interface INguoiDungDAL
    {
        List<NguoiDungModel> GetALL();
        bool Create(NguoiDungModel nguoiDungModel);
        bool Update(NguoiDungModel nguoiDungModel);
        bool Delete(string IDNguoiDung);
        NguoiDungModel Search_ID(string IDNguoiDung);
        List<NguoiDungModel> Search_Name(string TenNguoiDung);
    }
}
