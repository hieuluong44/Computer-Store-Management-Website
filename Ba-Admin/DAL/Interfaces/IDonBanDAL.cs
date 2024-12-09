using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Model;

namespace DAL.Interfaces
{
    public partial interface IDonBanDAL
    {
        List<getDonBan> GetALL();
        bool Create(DonBanModel donBanModel);
        bool Update(DonBanModel donBanModel);
        bool Delete(string IDDonBan);
    }
}
