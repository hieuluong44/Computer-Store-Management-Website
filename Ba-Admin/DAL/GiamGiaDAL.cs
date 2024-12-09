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
    public partial class GiamGiaDAL : IGiamGiaDAL
    {
        DatabaseHelper databaseHelper;
        public GiamGiaDAL(DatabaseHelper baseHelper)
        {
            databaseHelper = baseHelper;
        }
        public bool Create(GiamGiaModel giamGiaModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Them_GiamGia",
                   "@IDGiamGia", giamGiaModel.IDGiamGia,
                   "@HinhAnh" , giamGiaModel.HinhAnh,
                   "@TyLeGiam ", giamGiaModel.TyLeGiam,
                    "@NoiDung", giamGiaModel.NoiDung,
                    "@NgayBatDau", giamGiaModel.NgayBatDau,
                    "@NgayKetThuc", giamGiaModel.NgayKetThuc,
                    "@TrangThaiGiamGia", giamGiaModel.TrangThaiGiamGia);
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

        public bool Delete(string IDGiamGia)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Xoa_GiamGia",
                    "@IDGiamGia", IDGiamGia);
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

        public List<GiamGiaModel> GetALL()
        {
            string msgError = "";
            try
            {
                var result = databaseHelper.ExecuteSProcedureReturnDataTable(out msgError, "GetALL_GiamGia");
                if (!string.IsNullOrEmpty(msgError))
                {
                    throw new Exception(msgError);
                }
                return result.ConvertTo<GiamGiaModel>().ToList();
            }
            catch (Exception ex)
            {
                throw new Exception();
            }
        }

        public bool Update(GiamGiaModel giamGiaModel)
        {
            try
            {
                var result = databaseHelper.ExecuteSProcedure("Sua_GiamGia",
                    "@IDGiamGia", giamGiaModel.IDGiamGia,
                    "@HinhAnh", giamGiaModel.HinhAnh,
                    "@TyLeGiam ", giamGiaModel.TyLeGiam,
                    "@NoiDung", giamGiaModel.NoiDung,
                    "@NgayBatDau", giamGiaModel.NgayBatDau,
                    "@NgayKetThuc", giamGiaModel.NgayKetThuc,
                    "@TrangThaiGiamGia", giamGiaModel.TrangThaiGiamGia);
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
