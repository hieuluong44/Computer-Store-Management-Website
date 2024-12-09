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
    public class ChiTietDonNhapDAL : IChiTietDonNhapDAL
    {
        private IDatabaseHelper databaseHelper;
        public ChiTietDonNhapDAL(IDatabaseHelper database)
        {
            databaseHelper = database;
        }
        public bool Create(ChiTietNhapModel chiTietNhapModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Them_ChiTietDonNhap",
                    "@IDChiTietDonNhap", chiTietNhapModel.@IDChiTietDonNhap,
                   "@IDDonNhap ", chiTietNhapModel.IDDonNhap,
                    "@IDMatHang", chiTietNhapModel.@IDMatHang,
                    "@SoLuong", chiTietNhapModel.@SoLuong,
                    "@GiaNhap", chiTietNhapModel.GiaNhap);
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

        public bool Delete(string IDChiTietDonNhap)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_ChiTietDonNhap",
                    "@IDChiTietDonNhap", IDChiTietDonNhap);
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

        public List<GetChiTietNhapModel> GetALL(string IDDonNhap)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_All_ChiTietDonNhap",
                    "@IDDonNhap", IDDonNhap);
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<GetChiTietNhapModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public bool Update(ChiTietNhapModel chiTietNhapModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_ChiTietDonNhap",
                    "@IDChiTietDonNhap", chiTietNhapModel.@IDChiTietDonNhap,
                   "@IDDonNhap ", chiTietNhapModel.IDDonNhap,
                    "@IDMatHang", chiTietNhapModel.@IDMatHang,
                    "@SoLuong", chiTietNhapModel.@SoLuong,
                    "@GiaNhap", chiTietNhapModel.GiaNhap);
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
