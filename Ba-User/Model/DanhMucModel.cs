using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    // Lớp chứa danh mục cha
    public class DanhMucChaModel
    {
        public string IDDanhMuc {  get; set; }
        public string TenDanhMuc { get; set; }
        public string Icon { get; set; }
        public string IDDanhMucCha {  set; get; }
    }

    // Lớp chứa danh mục con
    public class DanhMucConModel
    {
        public string IDDanhMucCon { get; set; }
        public string TenDanhMucCon { get; set; }
        public string TenDanhMucCha { set; get; }
    }

    // Lớp chứa danh mục con
    public class DanhMucChauModel
    {
        public string IDDanhMucCon { get; set; }
        public string TenDanhMucCon { get; set; }
        public string TenDanhMucCha { set; get; }
    }
}
