using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface IDangNhapBLL
    {
        bool DangNhap(DangNhapModel dangNhapModel);
    }
}
