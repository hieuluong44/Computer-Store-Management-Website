using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;
using DAL;
namespace BLL
{
    public partial class GiamGiaBLL : IGiamGiaBLL
    {
        private IGiamGiaDAL giamGiaDAL;
        public GiamGiaBLL(IGiamGiaDAL giamGia)
        {
            this.giamGiaDAL = giamGia;
        }
        public bool Create(GiamGiaModel giamGiaModel)
        {
            return giamGiaDAL.Create(giamGiaModel);
        }

        public bool Delete(string IDGiamGia)
        {
            return giamGiaDAL.Delete(IDGiamGia);
        }

        public List<GiamGiaModel> GetALL()
        {
            return giamGiaDAL.GetALL();
        }

        public bool Update(GiamGiaModel giamGiaModel)
        {
            return giamGiaDAL.Update(giamGiaModel);
        }
    }
}
