using DAL.Helper.Interfaces;
using DAL.Interfaces;
using Model;
using System;

namespace DAL
{
    public class DonDatHangDAL : IDonDatHangDAL
    {
        private readonly IDatabaseHelper _databaseHelper;

            public DonDatHangDAL(IDatabaseHelper databaseHelper)
        {
            _databaseHelper = databaseHelper;
        }

        public bool CreateDonDatHang(DonDatHangModel donDatHang)
        {
            try
            {
                var result = _databaseHelper.ExecuteSProcedure("Tao_HoaDonBan_ChiTietBan",
                    "@IDDonBan", donDatHang.IDDonBan,
                    "@IDNguoiDung", donDatHang.IDNguoiDung ?? (object)DBNull.Value, 
                    "@HoTenNguoiNhan", donDatHang.HoTenNguoiNhan,
                    "@SoDienThoaiNguoiNhan", donDatHang.SoDienThoaiNguoiNhan,
                    "@DiaChiNguoiNhan", donDatHang.DiaChiNguoiNhan,
                    "@NgayBan", donDatHang.NgayBan,
                    "@GhiChu", donDatHang.GhiChu ?? (object)DBNull.Value, 
                    "@TongTien", donDatHang.TongTien,
                    "@listChiTietBan", donDatHang.ListChiTietBan?.Count > 0
                        ? MessageConvert.SerializeObject(donDatHang.ListChiTietBan)
                        : null);

                // Kiểm tra kết quả trả về có lỗi
                if (result != null && !string.IsNullOrEmpty(result.ToString()))
                {
                    throw new Exception($"Lỗi khi thực thi stored procedure: {result.ToString()}");
                }

                return true;
            }
            catch (Exception ex)
            {
                throw new Exception($"Có lỗi khi tạo đơn đặt hàng với IDDonBan: {donDatHang.IDDonBan}", ex);
            }
        }
    }
}
