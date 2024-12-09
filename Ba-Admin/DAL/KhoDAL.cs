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
    public partial class KhoDAL : IKhoDAL
    {
        private IDatabaseHelper databaseHelper;
        public KhoDAL(IDatabaseHelper database)
        {
            databaseHelper = database;
        }
        public bool Create(KhoModel khoModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Nhap_Kho",
                   "@IDKho", khoModel.IDKho,
                   "@IDMatHang", khoModel.IDMatHang,
                   "@SoLuong", khoModel.SoLuong,
                    "@NgayCapNhat", khoModel.NgayCapNhat);
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

        public bool Delete(string IDKho)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_ThongTin_Kho",
                    "@IDKho", IDKho);
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

        public List<GetKho> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetAll_Kho");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<GetKho>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public GetKho Search_ID(string IDMatHang)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_Kho_IDMH",
                    "@IDMatHang", IDMatHang);
                if (!string.IsNullOrEmpty(msgError.ToString()))
                {
                    throw new Exception(msgError.ToString());

                }
                return result.ConvertTo<GetKho>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<GetKho> Search_Name(string TenMatHang)
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "Tim_Kho_TenMH",
                    "@TenMatHang", TenMatHang);
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<GetKho>().ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(KhoModel khoModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_ThongTin_Kho",
                   "@IDKho", khoModel.IDKho,
                   "@IDMatHang", khoModel.IDMatHang,
                   "@SoLuong", khoModel.SoLuong,
                   "@NgayCapNhat", khoModel.NgayCapNhat);
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
