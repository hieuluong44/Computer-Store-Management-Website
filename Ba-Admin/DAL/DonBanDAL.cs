using DAL.Helper;
using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public partial class DonBanDAL : IDonBanDAL
    {
        DatabaseHelper databaseHelper;
        public DonBanDAL(DatabaseHelper baseHelper)
        {
            databaseHelper = baseHelper;
        }
        public bool Create(DonBanModel donBanModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Tao_HoaDonBan_ChiTietBan",
                    "@IDDonBan", donBanModel.IDDonBan,
                    "@IDNguoiDung ", donBanModel.IDNguoiDung,
                    "@IDGiamGia" , donBanModel.IDGiamGia,
                    "@Ngayban", donBanModel.NgayBan,
                    "@TrangThai", donBanModel.TrangThai,
                    "@GhiChu", donBanModel.GhiChu,
                    "@TongTien", donBanModel.TongTien,
                    "@listChiTienBan", donBanModel.listChiTienBan != null ? MessageConvert.SerializeObject(donBanModel.listChiTienBan) : null);
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

        public bool Delete(string IDDonBan)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_HoaDonBan",
                    "@IDDonBan", IDDonBan);
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

        public List<getDonBan> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_HoaDonBan");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<getDonBan>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public bool Update(DonBanModel donBanModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_HoaDonBan",
                     "@IDDonBan", donBanModel.IDDonBan,
                   "@IDNguoiDung ", donBanModel.IDNguoiDung,
                    "@Ngayban", donBanModel.NgayBan,
                    "@TrangThai", donBanModel.TrangThai,
                    "@GhiChu", donBanModel.GhiChu,
                     "@TongTien", donBanModel.TongTien);
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
