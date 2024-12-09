using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IDanhMucDAL
    {
        List<DanhMucChaModel> GetDanhMuc();
        List<DanhMucConModel> GetDanhMucCon(string IDDanhMucCha);
        List<DanhMucChauModel> GetDanhMucChau(string IDDanhMucCon);
    }
}
