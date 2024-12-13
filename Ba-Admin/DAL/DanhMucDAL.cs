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
    public partial class DanhMucDAL : IDanhMucDAL
    {
        private IDatabaseHelper databaseHelper;
        public DanhMucDAL (IDatabaseHelper database)
        {
            databaseHelper = database;
        }
        public List<DanhMucModel> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_DanhMuc1");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<DanhMucModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }
        public bool Create(DanhMucModel danhMucModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Them_DanhMuc",
                    "@IDDanhMuc", danhMucModel.IDDanhMuc,
                    "@TenDanhMuc", danhMucModel.TenDanhMuc,
                    "@icon", danhMucModel.Icon,
                    "@IDDanhMucCha", danhMucModel.IDDanhMucCha);
                if (result != null && !string.IsNullOrEmpty(result.ToString()))
                {
                    throw new Exception(result.ToString() );
                }
                return true;
            }
            catch (Exception ex) 
            {
               throw ex;
            }
        }
        public bool Delete(string IDDanhMuc)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_DanhMuc", 
                    "@IDDanhMuc", IDDanhMuc);
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
        public bool Update(DanhMucModel danhMucModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_DanhMuc", 
                    "@IDDanhMuc" , danhMucModel.IDDanhMuc,
                    "@TenDanhMuc", danhMucModel.TenDanhMuc,
                    "@icon", danhMucModel.Icon,
                     "@IDDanhMucCha", danhMucModel.IDDanhMucCha);
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

        public List<Get_ALL_DanhMuc2> get_ALL_DanhMuc2s(string IDDanhMucCha)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_DanhMuc2",
                    "@IDDanhMucCha", IDDanhMucCha);
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<Get_ALL_DanhMuc2>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh mục con", ex);
            }
        }

        public List<Get_ALL_DanhMuc3> get_ALL_DanhMuc3s(string IDDanhMucCon)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Get_ALL_DanhMuc2",
                    "@IDDanhMucCha", IDDanhMucCon);
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<Get_ALL_DanhMuc3>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi lấy danh mục cháu", ex);
            }
        }

    }
}
