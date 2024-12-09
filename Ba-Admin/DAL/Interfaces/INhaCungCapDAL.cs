using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;


namespace DAL.Interfaces
{
    public partial interface INhaCungCapDAL
    {
        List<NhaCungCapModel> GetALL();
        bool Create(NhaCungCapModel nhaCungCapModel);
        bool Update(NhaCungCapModel nhaCungCapModel);
        bool Delete(string IDNhaCungCap);
    }
}
