using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class ChiTietDonBanDAL : IChiTietDonbanDAL
    {
        private IDatabaseHelper databaseHelper;
        public ChiTietDonBanDAL(IDatabaseHelper database)
        {
            databaseHelper = database;
        }
        public bool Create(ChiTietBanModel chiTietBanModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Them_ChiTietDonBan",
                    "@IDChiTietDonBan", chiTietBanModel.@IDChiTietDonBan,
                   "@IDDonBan ", chiTietBanModel.IDDonBan,
                    "@IDMatHang", chiTietBanModel.@IDMatHang,
                    "@SoLuong", chiTietBanModel.@SoLuong,
                    "@GiaBan", chiTietBanModel.GiaBan);
                if (result != null && !string.IsNullOrEmpty(result.ToString()))
                {
                    throw new Exception(result.ToString());
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(string IDChiTietDonBan)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_ChiTietDonBan",
                    "@IDChiTietDonBan", IDChiTietDonBan);
                if (result != null && !string.IsNullOrEmpty(result.ToString()))
                {
                    throw new Exception(result.ToString());
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GetChiTietBanModel> GetALL(string IDDonBan)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_ChiTietDonBan",
                    "@IDDonBan", IDDonBan);
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<GetChiTietBanModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public bool Update(ChiTietBanModel chiTietBanModel)
        {
            throw new NotImplementedException();
        }
    }
}
