using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public partial class DanhMucModel
    {
        public string IDDanhMuc { get; set; }
        public string TenDanhMuc { get; set; }
        public string Icon { get; set; }
        public string IDDanhMucCha { get; set; }
    }

    public partial class Get_ALL_DanhMuc2
    {
        public string IDDanhMucCon { get; set; }
        public string TenDanhMucCon { get; set; }
        public string TenDanhMucCha { get; set; }
    }

    public partial class Get_ALL_DanhMuc3
    {
        public string IDDanhMucCon { get; set; }
        public string TenDanhMucCon { get; set; }
        public string TenDanhMucCha { set; get; }
    }
}


