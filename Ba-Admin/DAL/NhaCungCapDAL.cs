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
    public partial class NhaCungCapDAL : INhaCungCapDAL
    {
        private IDatabaseHelper databaseHelper;
        public NhaCungCapDAL(IDatabaseHelper database)
        {
            databaseHelper = database;
        }
        public bool Create(NhaCungCapModel nhaCungCapModel)
        {
            try
            {
                //nhaCungCapModel.IDNhaCungCap = IDAuto.ID("NCC");
                var result = databaseHelper.ExecuteSProcedure("Them_NhaCungCap",
                   "@IDNhaCungCap", nhaCungCapModel.IDNhaCungCap,
                   "@TenNhaCungCap", nhaCungCapModel.TenNhaCungCap,
                    "@Email", nhaCungCapModel.Email,
                    "@SoDienThoai", nhaCungCapModel.SoDienThoai,
                    "@DiaChi", nhaCungCapModel.DiaChi);
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

        public bool Delete(string IDNhaCungCap)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_NhaCungCap",
                    "@IDNhaCungCap", IDNhaCungCap);
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

        public List<NhaCungCapModel> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_NhaCungCap");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<NhaCungCapModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        public bool Update(NhaCungCapModel nhaCungCapModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_NhaCungCap",
                    "@IDNhaCungCap", nhaCungCapModel.IDNhaCungCap,
                   "@TenNhaCungCap", nhaCungCapModel.TenNhaCungCap,
                    "@Email", nhaCungCapModel.Email,
                    "@SoDienThoai", nhaCungCapModel.SoDienThoai,
                    "@DiaChi", nhaCungCapModel.DiaChi);
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
