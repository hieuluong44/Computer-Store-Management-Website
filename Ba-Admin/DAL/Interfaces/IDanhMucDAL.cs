using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public partial interface IDanhMucDAL
    {
        List<DanhMucModel> GetALL();
        List<Get_ALL_DanhMuc2> get_ALL_DanhMuc2s( string IDDanhMucCha);
        List<Get_ALL_DanhMuc3> get_ALL_DanhMuc3s( string IDDanhMucCon);
        bool Create(DanhMucModel danhMucModel);
        bool Update(DanhMucModel danhMucModel);
        bool Delete(string IDDanhMuc);

    }
}
