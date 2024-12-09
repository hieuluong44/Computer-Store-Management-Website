/*------------------ TRANG NGƯỜI DÙNG -----------------------*/

/*======================= MẶT HÀNG ==========================*/
/*--- Thống kê mặt hàng bán chạy --*/
alter proc ThongKeTop10MatHangBanChay
as
begin
    -- Lấy top 10 mặt hàng bán chạy nhất dựa trên tổng số lượng đã bán
    select top 10 
        mh.IDMatHang, 
        mh.TenMatHang, 
        SUM(ctdb.SoLuong) AS TongSoLuongBan,
        mh.DonGia,
        mh.BaoHanh,
		kh.SoLuong AS SoLuongTrongKho,
        CASE 
            WHEN kh.SoLuong = 0 THEN N'Hết hàng'
            WHEN kh.SoLuong < 5 THEN N'Số lượng dưới 5'
            ELSE N'Còn hàng'
        END as TrangThai
    from ChiTietDonBan ctdb
    inner join MatHang mh on ctdb.IDMatHang = mh.IDMatHang
	inner join Kho kh on mh.IDMatHang = kh.IDMatHang
    group by mh.IDMatHang, mh.TenMatHang, mh.DonGia, mh.BaoHanh, kh.SoLuong, mh.TrangThai
    order by TongSoLuongBan desc; -- Sắp xếp theo tổng số lượng bán giảm dần
end;
go


/* Danh mục nổi bật */
alter proc exec DanhMucHot 
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


/*---Lấy thông tin mặt hàng---*/
alter PROCEDURE  GetAllMatHang
AS
BEGIN
    SELECT 
        m.IDMatHang,
        dm.TenDanhMuc AS TenDanhMuc,  -- Tên danh mục cháu
        m.TenMatHang,   -- Tên mặt hàng
        m.DonGia,       -- Đơn giá
        m.BaoHanh,      -- Bảo hành
        m.HinhAnh1,     -- Hình ảnh
        m.TrangThai     -- Trạng thái
    FROM 
        MatHang m
    LEFT JOIN 
        DanhMuc dm ON m.IDDanhMuc = dm.IDDanhMuc   -- Join bảng DanhMuc để lấy tên danh mục cháu
END;
GO


/*-- Chi tiết mặt hàng --*/
create proc Get_ChiTietMatHang
	@IDMatHang char(10)
as
begin
	select from MatHang MH
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
	DM.TenDanhMuc, MH.TenMatHang, MH.DonGia, MH.BaoHanh, MH.HinhAnh1, MH.TrangThai, CONCAT(GG.TyLeGiam, '%') as TyLeGiam, GG.NoiDung, GG.TrangThaiGiamGia
	from MatHang MH Inner join  DanhMuc DM on DM.IDDanhMuc = MH.IDDanhMuc
	inner join GiamGia GG on GG.IDGiamGia = MH.IDGiamGia
	where @GiaMin <= DonGia and DonGia <= @GiaMax
end;
go

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
