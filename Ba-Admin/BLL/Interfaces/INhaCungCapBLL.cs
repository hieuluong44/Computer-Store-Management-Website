using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Interfaces
{
    public interface INhaCungCapBLL
    {
        List<NhaCungCapModel> GetALL();
        bool Create(NhaCungCapModel nhaCungCapModel);
        bool Update(NhaCungCapModel nhaCungCapModel);
        bool Delete(string IDNhaCungCap);
    }
}
