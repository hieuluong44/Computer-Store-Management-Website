using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class DangNhapModel
    {
        public string Email { get; set; }
        public string MatKhau { get; set; }
    }
    public class DangKyModel
    {
        public string IDNguoiDung { get; set; }       
        public string TenNguoiDung { get; set; }      
        public string SoDienThoai { get; set; }        
        public string Email { get; set; }              
        public string MatKhau { get; set; }            
        public string HinhAnh { get; set; }            
        public string VaiTro { get; set; }            
    }

}
