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
    public partial class DonNhapDAL : IDonNhapDAL
    {
        DatabaseHelper databaseHelper;
        public DonNhapDAL(DatabaseHelper baseHelper)
        {
            databaseHelper = baseHelper;
        }

        public bool Create(DonNhapModel donNhapModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Tao_DonNhap",
                   "@IDDonNhap", donNhapModel.IDDonNhap,
                   "@IDNhaCungCap ", donNhapModel.IDNhaCungCap,
                    "@NgayNhap", donNhapModel.NgayNhap,
                    "@TrangThai", donNhapModel.TrangThai,
                    "@GhiChu", donNhapModel.GhiChu,
                    "@TongTien", donNhapModel.TongTien);
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

        public bool Delete(string IDDonNhap)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_DonNhap",
                    "@IDDonNhap", IDDonNhap);
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

        public List<GetDonNhap> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_HoaDonNhap");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<GetDonNhap>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public bool Update(DonNhapModel donNhapModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_DonNhap",
                    "@IDDonNhap", donNhapModel.IDDonNhap,
                   "@IDNhaCungCap ", donNhapModel.IDNhaCungCap,
                    "@NgayNhap", donNhapModel.NgayNhap,
                    "@TrangThai", donNhapModel.TrangThai,
                    "@GhiChu", donNhapModel.GhiChu,
                    "@TongTien", donNhapModel.TongTien);
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
    }
}
