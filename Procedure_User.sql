/*------------------ TRANG NGƯỜI DÙNG -----------------------*/

/*======================= MẶT HÀNG ==========================*/

/* Danh mục nổi bật */
alter proc DanhMucHot 
as
begin 
	SELECT TOP 6
    DMCha.TenDanhMuc AS DanhMucCha, 
    SUM(CTDB.SoLuong) AS TongSoLuongBan
	FROM  DanhMuc DMCha
	inner join DanhMuc DMCon ON DMCha.IDDanhMuc = DMCon.IDDanhMucCha  
	inner join MatHang MH ON DMCon.IDDanhMuc = MH.IDDanhMuc           
	inner join ChiTietDonBan CTDB ON MH.IDMatHang = CTDB.IDMatHang     
	inner JOIN HoaDonBan HDB ON HDB.IDDonBan = CTDB.IDDonBan               
	WHERE DMCha.IDDanhMucCha IS NULL 
	GROUP BY DMCha.TenDanhMuc
	ORDER BY TongSoLuongBan DESC;
end;
go


alter proc Get_MatHang_DanhMuc
as
begin
    select 
        MH.IDMatHang,                    
        DMCha.TenDanhMuc AS TenDanhMucCha, 
        MH.TenMatHang,                  
        MH.DonGia,
        AMH.DuongDan,   
		AMH.ThuTu,
        case 
            WHEN kh.SoLuong = 0 THEN N'Liên hệ'
            WHEN kh.SoLuong < 5 THEN N'Số lượng có hạn'
            ELSE N'Còn hàng'
        end as TrangThai                 
    from 
        MatHang MH
    inner join  DanhMuc DM on MH.IDDanhMuc = DM.IDDanhMuc  
    left join  DanhMuc DMCha on DM.IDDanhMucCha = DMCha.IDDanhMuc  
    inner join  Kho KH on MH.IDMatHang = KH.IDMatHang  
	inner join AnhMatHang AMH on MH.IDMatHang = AMH.IDMatHang
    where  DMCha.IDDanhMuc IS NOT NULL and KH.SoLuong > 5        
    order by  DMCha.TenDanhMuc, MH.TenMatHang;                  
end;
go


/*-- Chi tiết mặt hàng --*/
create proc Get_ChiTietMatHang
	@IDMatHang char(10)
as
begin
	select * from MatHang MH
	inner join ThongSoKyThuat KT on MH.IDMatHang = KT.IDMatHang
end;
go

/*--Tìm mặt hàng bằng giá--*/
alter proc Tim_MatHang_Gia
	@GiaMin float,
	@GiaMax float
as
begin	
	select
	DM.TenDanhMuc, MH.TenMatHang, MH.DonGia, MH.BaoHanh, MH.HinhAnh1, MH.TrangThai
	from MatHang MH Inner join  DanhMuc DM on DM.IDDanhMuc = MH.IDDanhMuc
	where @GiaMin <= DonGia and DonGia <= @GiaMax
end;
go


/*Mặt hàng bán chạy*/
alter proc MatHang_BanChay
as
begin
   SELECT TOP 10 
    MH.IDMatHang,
    MH.TenMatHang,
    MH.DonGia AS GiaBan,
    AMH.DuongDan,
    CASE 
        WHEN KH.SoLuong = 0 THEN N'Liên hệ'
        WHEN KH.SoLuong < 5 THEN N'Số lượng có hạn'
        ELSE N'Còn hàng'
    END AS TrangThai,
    SUM(CTDB.SoLuong) AS TongSoLuongBan
FROM MatHang MH
JOIN ChiTietDonBan CTDB ON MH.IDMatHang = CTDB.IDMatHang
JOIN HoaDonBan HDB ON CTDB.IDDonBan = HDB.IDDonBan
INNER JOIN Kho KH ON KH.IDMatHang = MH.IDMatHang
LEFT JOIN ( SELECT IDMatHang, DuongDan FROM AnhMatHang WHERE ThuTu = 1 ) AMH ON MH.IDMatHang = AMH.IDMatHang
GROUP BY 
    MH.IDMatHang, MH.TenMatHang, MH.DonGia, AMH.DuongDan, KH.SoLuong
ORDER BY TongSoLuongBan DESC;
end;
go

select * from ChiTietDonBan

/*======================= GIẢM GIÁ ==========================*/
/*----Hiển thị giảm giá----*/
alter proc HienThi_GiamGia
as
begin
	select 
	TyLeGiam,
	NoiDung,
	NgayBatDau,
	NgayKetThuc,
	TrangThaiGiamGia
	from GiamGia
	where TrangThaiGiamGia like N'Đang diễn ra'
end
go

/*----Tìm giảm giá bằng nội dung-----*/
create proc Tim_GiamGia_ND
	@NoiDung nvarchar(max)
as
begin
	select CONCAT(TyLeGiam, '%') as TyLeGiam, NoiDung, NgayBatDau, NgayKetThuc, TrangThaiGiamGia from GiamGia
	where NoiDung like N'%' + @NoiDung + '%'
end;
go

/*----Tìm giảm giá bằng trạng thái-----*/
create proc Tim_GiamGia_TT
	@TrangThaiGiamGia nvarchar(20)
as
begin
	select CONCAT(TyLeGiam, '%') as TyLeGiam, NoiDung, NgayBatDau, NgayKetThuc, TrangThaiGiamGia from GiamGia
	where TrangThaiGiamGia like N'%' + @TrangThaiGiamGia + '%'
end;
go

/*======================= NGƯỜI DÙNG ==========================*/
/*-------Xem thông tin tài khoản ---------*/
create proc Hien_TK
as 
begin
	select TenNguoiDung, SoDienThoai, Email, DiaChi, MatKhau
	from NguoiDung
end;
go

/*------ Sửa thông tin tài khoản ------*/
create proc Sua_TK
	@IDNguoiDung char(10),
    @TenNguoiDung nvarchar(30),
    @SoDienThoai int,
    @Email varchar(30),
    @DiaChi nvarchar(200),
    @MatKhau nvarchar(30)
as
begin
	update NguoiDung
	set TenNguoiDung = @TenNguoiDung,
        SoDienThoai = @SoDienThoai,
        Email = @Email,
        DiaChi = @DiaChi,
        MatKhau = @MatKhau
    where IDNguoiDung = @IDNguoiDung
end;
go

-- g) Đăng nhập
CREATE PROCEDURE sp_DangNhapNguoiDung
    @Email VARCHAR(30),
    @MatKhau NVARCHAR(30)
AS
BEGIN
    -- Kiểm tra tài khoản với email và mật khẩu
    IF EXISTS (SELECT 1 FROM NguoiDung WHERE Email = @Email AND MatKhau = @MatKhau)
    BEGIN
        -- Đăng nhập thành công
        SELECT 1 AS Result;
    END
    ELSE
    BEGIN
        -- Đăng nhập thất bại
        SELECT 0 AS Result;
    END
END;
GO

-- h) Đăng ký
CREATE PROCEDURE sp_DangKyNguoiDung
    @IDNguoiDung CHAR(10),
    @TenNguoiDung NVARCHAR(30),
    @SoDienThoai INT,
    @Email VARCHAR(30),
    @DiaChi NVARCHAR(200),
    @MatKhau NVARCHAR(30),
    @VaiTro NVARCHAR(20)
AS
BEGIN
    -- Kiểm tra email đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM NguoiDung WHERE Email = @Email)
    BEGIN
        RETURN;
    END

    -- Kiểm tra số điện thoại đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM NguoiDung WHERE SoDienThoai = @SoDienThoai)
    BEGIN
        RETURN;
    END

    -- Thêm người dùng mới
    INSERT INTO NguoiDung (IDNguoiDung, TenNguoiDung, SoDienThoai, Email, DiaChi, MatKhau, VaiTro)
    VALUES (@IDNguoiDung, @TenNguoiDung, @SoDienThoai, @Email, @DiaChi, @MatKhau, @VaiTro);
END;
GO
