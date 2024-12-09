using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using BLL.Interfaces;
using DAL.Interfaces;

namespace BLL
{
    public partial class NhaCungCapBLL : INhaCungCapBLL
    {
        private INhaCungCapDAL nhaCungCapDAL;
        public NhaCungCapBLL(INhaCungCapDAL nhaCungCapDAL)
        {
            this.nhaCungCapDAL = nhaCungCapDAL;
        }

        public bool Create(NhaCungCapModel nhaCungCapModel)
        {
            return nhaCungCapDAL.Create(nhaCungCapModel);
        }

        public bool Delete(string IDNhaCungCap)
        {
            return nhaCungCapDAL.Delete(IDNhaCungCap);
        }

        public List<NhaCungCapModel> GetALL()
        {
            return nhaCungCapDAL.GetALL();
        }
        public bool Update(NhaCungCapModel nhaCungCapModel)
        {
            return nhaCungCapDAL.Update(nhaCungCapModel);
        }
    }
}
