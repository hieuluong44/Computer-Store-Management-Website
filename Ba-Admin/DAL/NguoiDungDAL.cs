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
    public partial class NguoiDungDAL : INguoiDungDAL
    {
        private IDatabaseHelper databaseHelper;
        public NguoiDungDAL(IDatabaseHelper database)
        {
            databaseHelper = database;
        }
        public List<NguoiDungModel> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_NguoiDung");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<NguoiDungModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public bool Create(NguoiDungModel NguoiDungModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Them_NguoiDung",
                   "@IDNguoiDung", NguoiDungModel.IDNguoiDung,
                   "@HinhAnh", NguoiDungModel.HinhAnh,
                   "@TenNguoiDung", NguoiDungModel.TenNguoiDung,
                   "@SoDienThoai", NguoiDungModel.SoDienThoai,
                    "@Email", NguoiDungModel.Email,
                    "@MatKhau", NguoiDungModel.MatKhau,
                    "@VaiTro", NguoiDungModel.VaiTro);
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
        public bool Update(NguoiDungModel NguoiDungModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_NguoiDung",
                   "@IDNguoiDung", NguoiDungModel.IDNguoiDung,
                   "@HinhAnh", NguoiDungModel.HinhAnh,
                   "@TenNguoiDung", NguoiDungModel.TenNguoiDung,
                   "@SoDienThoai", NguoiDungModel.SoDienThoai,
                    "@Email", NguoiDungModel.Email,
                    "@MatKhau", NguoiDungModel.MatKhau,
                    "@VaiTro", NguoiDungModel.VaiTro);
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

        public bool Delete(string IDNguoiDung)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_NguoiDung",
                    "@IDNguoiDung", IDNguoiDung);
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

        public NguoiDungModel Search_ID(string IDNguoiDung)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_NguoiDung_ID",
                    "@IDNguoiDung", IDNguoiDung);
                if (!string.IsNullOrEmpty(msgError.ToString()))
                {
                    throw new Exception(msgError.ToString());

                }
                return result.ConvertTo<NguoiDungModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<NguoiDungModel> Search_Name(string TenNguoiDung)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_NguoiDung_Ten",
                    "@TenNguoiDung", TenNguoiDung);
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<NguoiDungModel>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
