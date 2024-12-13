using System.Collections.Generic;
using Model;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class DangKyBLL : IDangKyBLL
    {
        private IDangKyDAL dangKyDAL;
        public DangKyBLL(IDangKyDAL dangKy)
        {
            this.dangKyDAL = dangKy;
        }
        public bool DangKyNguoiDung(DangKyModel model)
        {
            return dangKyDAL.DangKyNguoiDung(model);
        }
    }
}
