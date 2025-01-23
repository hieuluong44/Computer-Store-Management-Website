using BLL.Interfaces;
using BLL;
using DAL.Helper.Interfaces;
using DAL.Helper;
using DAL.Interfaces;
using DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.WithOrigins("http://127.0.0.1:5501")
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Đăng ký dịch vụ
builder.Services.AddControllers();
builder.Services.AddSingleton<DatabaseHelper>(); // Chỉ chọn một trong hai AddSingleton hoặc AddScoped
builder.Services.AddScoped<DatabaseHelper>();    // Nếu muốn mỗi request một đối tượng mới
builder.Services.AddTransient<IDatabaseHelper, DatabaseHelper>();
builder.Services.AddTransient<IMatHangDAL, MatHangDAL>();
builder.Services.AddTransient<IMatHangBLL, MatHangBLL>();
builder.Services.AddTransient<IGiamGiaDAL, GiamGiaDAL>();
builder.Services.AddTransient<IGiamGiaBLL, GiamGiaBLL>();
builder.Services.AddTransient<IDanhMucBLL, DanhMucBLL>();
builder.Services.AddTransient<IDanhMucDAL, DanhMucDAL>();
builder.Services.AddTransient<ITaiKhoanBLL, TaiKhoanBLL>();
builder.Services.AddTransient<ITaiKhoanDAL, TaiKhoanDAL>();
builder.Services.AddTransient<IChiTietMatHangBLL, ChiTietMatHangBLL>();
builder.Services.AddTransient<IChiTietMatHangDAL, ChiTietMatHangDAL>();
builder.Services.AddTransient<IDonDatHangBLL, DonDatHangBLL>();
builder.Services.AddTransient<IDonDatHangDAL, DonDatHangDAL>();

// Cấu hình Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Cấu hình AppSettings
var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);
var appSettings = appSettingsSection.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);

// Cấu hình xác thực JWT
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Build ứng dụng
var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.UseHttpsRedirection();

app.MapControllers();
app.Run();
