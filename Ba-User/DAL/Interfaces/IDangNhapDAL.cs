﻿using Model;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interfaces
{
    public interface IDangNhapDAL
    {
        bool dangNhap(DangNhapModel dangNhapModel);
    }
}
