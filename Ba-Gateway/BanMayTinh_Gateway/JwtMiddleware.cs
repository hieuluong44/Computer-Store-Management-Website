using BanMayTinh_Gateway.Helper;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace BanOto_Gateway
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly AppSettings _appSettings;
        private BanOtoContext db = null;

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings, IConfiguration configuration)
        {
            _next = next;
            _appSettings = appSettings.Value;
            db = new BanOtoContext();
        }

        public Task Invoke(HttpContext context)
        {
            context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            context.Response.Headers.Add("Access-Control-Expose-Headers", "*");

            if (!context.Request.Path.Equals("/api/token", StringComparison.Ordinal))
            {
                return _next(context);
            }

            if (context.Request.Method.Equals("POST") && context.Request.HasFormContentType)
            {
                return GenerateToken(context);
            }

            context.Response.StatusCode = 400;
            return context.Response.WriteAsync("Bad request.");
        }

        private async Task GenerateToken(HttpContext context)
{
    try
    {
        var taikhoan = context.Request.Form["Taikhoan"].ToString();
        var matkhau = context.Request.Form["Matkhau"].ToString();

        User user = null;

        // Truy vấn thủ công thay vì dùng LINQ
        foreach (var u in _db.Users)
        {
            if (u.Taikhoan == taikhoan)
            {
                user = u;
                break;
            }
        }

        // Kiểm tra tài khoản và mật khẩu
        if (user == null || !BCrypt.Net.BCrypt.Verify(matkhau, user.Matkhau))
        {
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            await context.Response.WriteAsync(JsonSerializer.Serialize(new
            {
                code = (int)HttpStatusCode.Unauthorized,
                error = "Tài khoản hoặc mật khẩu không đúng"
            }));
            return;
        }

        // Tạo token như trước
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_secretKey);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.TenNguoiDung),
                new Claim(ClaimTypes.Role, user.VaiTro),
                new Claim("IDNguoiDung", user.IDNguoiDung)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        context.Response.ContentType = "application/json";
        await context.Response.WriteAsync(JsonSerializer.Serialize(new
        {
            HoTen = user.TenNguoiDung,
            Token = tokenHandler.WriteToken(token)
        }));
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        await context.Response.WriteAsync(JsonSerializer.Serialize(new
        {
            code = (int)HttpStatusCode.InternalServerError,
            error = ex.Message
        }));
    }
}

    }
}
