using DAL.Interfaces;
using DAL;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BLL.Interfaces;
using BLL;
using DAL.Helper.Interfaces;
using DAL.Helper;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin() // Cho phép tất cả các domain
              .AllowAnyMethod()
              .AllowAnyHeader();
    });

});

builder.Services.AddControllers();
builder.Services.AddSingleton<DatabaseHelper>(); 
builder.Services.AddScoped<DatabaseHelper>();

builder.Services.AddControllers();
builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>(); 
builder.Services.AddTransient<IDanhMucBLL, DanhMucBLL>();
builder.Services.AddTransient<IDanhMucDAL, DanhMucDAL>();
builder.Services.AddTransient<IMatHangDAL, MatHangDAL>();
builder.Services.AddTransient<IMatHangBLL, MatHangBLL>();
builder.Services.AddTransient<INguoiDungBLL, NguoiDungBLL>();
builder.Services.AddTransient<INguoiDungDAL, NguoiDungDAL>();
builder.Services.AddTransient<INhaCungCapBLL, NhaCungCapBLL>();
builder.Services.AddTransient<INhaCungCapDAL, NhaCungCapDAL>();
builder.Services.AddTransient<IKhoBLL, KhoBLL>();
builder.Services.AddTransient<IKhoDAL, KhoDAL>();
builder.Services.AddTransient<IDonNhapDAL, DonNhapDAL>();
builder.Services.AddTransient<IDonNhapBLL, DonNhapBLL>();
builder.Services.AddTransient<IDonBanBLL, DonBanBLL>();
builder.Services.AddTransient<IDonBanDAL, DonBanDAL>();
builder.Services.AddTransient<IChiTietDonNhapDAL, ChiTietDonNhapDAL>();
builder.Services.AddTransient<IChiTietDonNhapBLL, ChiTietDonNhapBLL>();
builder.Services.AddTransient<IChiTietDonBanBLL, ChiTietDonBanBLL>();
builder.Services.AddTransient<IChiTietDonbanDAL, ChiTietDonBanDAL>();
builder.Services.AddTransient<IDanhGiaBLL, DanhGiaBLL>();
builder.Services.AddTransient<IDanhGiaDAL, DanhGiaDAL>();
builder.Services.AddTransient<IGiamGiaDAL, GiamGiaDAL>();
builder.Services.AddTransient<IGiamGiaBLL, GiamGiaBLL>();
builder.Services.AddTransient<IThongSoKyThuatBLL, ThongSoKyThuatBLL>();
builder.Services.AddTransient<IThongSoKyThuatDAL, ThongSoKyThuatDAL>();
builder.Services.AddTransient<IAnhMatHangBLL, AnhMatHangBLL>();
builder.Services.AddTransient<IAnhMatHangDAL, AnhMatHangDAL>();
builder.Services.AddTransient<IThongKe_BaoCaoDAL, ThongKe_BaoCaoDAL>();
builder.Services.AddTransient<IThongKe_BaoCaoBLL, ThongKe_BaoCaoBLL>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
