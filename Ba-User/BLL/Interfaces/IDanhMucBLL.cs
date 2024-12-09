using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IDanhMucBLL
    {
        List<DanhMucChaModel> GetDanhMuc();
        List<DanhMucConModel> GetDanhMucCon(string IDDanhMucCha);
        List<DanhMucChauModel> GetDanhMucChau(string IDDanhMucCon);


    }
}
