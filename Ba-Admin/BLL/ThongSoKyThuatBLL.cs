using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public class ThongSoKyThuatBLL : IThongSoKyThuatBLL
    {
        private IThongSoKyThuatDAL thongSoKyThuatDAL;
        public ThongSoKyThuatBLL(IThongSoKyThuatDAL thongSoKyThuat)
        {
            this.thongSoKyThuatDAL = thongSoKyThuat;
        }

        public bool Create(ThongSoKyThuatModel thongSoKyThuatModel)
        {
            return thongSoKyThuatDAL.Create(thongSoKyThuatModel);
        }

        public bool Delete(string IDThongSo)
        {
           return thongSoKyThuatDAL.Delete(IDThongSo);
        }

        public List<GetThongSoKyThuat> GetALL(string IDMatHang)
        {
            return thongSoKyThuatDAL.GetALL(IDMatHang);
        }

        public bool Update(ThongSoKyThuatModel thongSoKyThuatModel)
        {
            return thongSoKyThuatDAL.Update(thongSoKyThuatModel);
        }
    }
}
