using BLL.Interfaces;
using DAL.Interfaces;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class DonDatHangBLL : IDonDatHangBLL
    {
        private IDonDatHangDAL donDatHangDAL;
        public DonDatHangBLL(IDonDatHangDAL donDatHang)
        {
            this.donDatHangDAL = donDatHang;
        }
        public bool CreateDonDatHang(DonDatHangModel donDatHang)
        {
            try
            {
                // Gọi phương thức DAL để tạo đơn đặt hàng và trả về kết quả
                return donDatHangDAL.CreateDonDatHang(donDatHang);
            }
            catch (Exception)
            {
                // Nếu có lỗi, trả về false
                return false;
            }
        }
    }
}
