/*------------------ TRANG NGƯỜI DÙNG -----------------------*/
use [Dự án : Quản lý cửa hàng bán máy tính]
go	
/*======================= MẶT HÀNG ==========================*/
alter proc Get_MatHang_User
	@IDMatHang varchar(10)
as
begin 
	 select 
        MH.IDMatHang,                                         
        MH.TenMatHang,                        
        MH.DonGia,                            
        MH.BaoHanh,  
		AMH.DuongDan,
        CASE 
            WHEN KH.SoLuong IS NULL THEN N'Chưa cập nhật'  
            WHEN KH.SoLuong = 0 THEN N'Hết hàng'
            WHEN KH.SoLuong < 5 THEN N'Số lượng dưới 5'
            ELSE N'Còn hàng'
        END as TrangThai
    from 
        MatHang MH
	inner join AnhMatHang AMH on MH.IDMatHang = AMH.IDMatHang
    left join  Kho KH on MH.IDMatHang = KH.IDMatHang 
	where MH.IDMatHang = @IDMatHang and AMH.ThuTu = 1
end;
go

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
        DM.IDDanhMuc,
        MH.TenMatHang,                  
        MH.DonGia,
        AMH.DuongDan,   
        AMH.ThuTu,
        case 
            WHEN kh.SoLuong = 0 THEN N'Liên hệ'
            WHEN kh.SoLuong < 5 THEN N'Số lượng có hạn'
            ELSE N'Còn hàng'
        end as TrangThai                 
    from MatHang MH
    inner join  DanhMuc DM on MH.IDDanhMuc = DM.IDDanhMuc    
    inner join  Kho KH on MH.IDMatHang = KH.IDMatHang  
    inner join AnhMatHang AMH on MH.IDMatHang = AMH.IDMatHang         
end;
go

select * from Kho


alter proc Tim_MatHang_Ten
	@TenMatHang nvarchar(100) 
as
begin 
	select top(10) MH.IDMatHang, MH.TenMatHang, AMH.DuongDan, MH.DonGia  from MatHang MH
	inner join AnhMatHang AMH on MH.IDMatHang = AMH.IDMatHang
	where AMH.ThuTu = 1 and MH.TenMatHang like N'%' + @TenMatHang +'%'
	ORDER BY MH.TenMatHang; 
end;
go


/*--Tìm mặt hàng bằng giá--*/
alter proc Tim_MatHang_Gia
	@GiaMin float,
	@GiaMax float
as
begin	
	select
	DM.TenDanhMuc, MH.TenMatHang, MH.DonGia, MH.BaoHanh, MH.TrangThai
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
alter proc Hien_TK
	@IDNguoiDung varchar(10)
as 
begin
	select HinhAnh, TenNguoiDung, GioiTinh, SoDienThoai, Email, MatKhau
	from NguoiDung where IDNguoiDung = @IDNguoiDung
end;
go

/*------ Sửa thông tin tài khoản ------*/
alter proc Sua_TK
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


/*Đăng nhập*/
alter proc DangNhap_NguoiDung
    @Email varchar(30),
    @MatKhau nvarchar(30)
as
begin
    select IDNguoiDung, HinhAnh, TenNguoiDung, SoDienThoai,Email, MatKhau
    from NguoiDung
    where Email = @Email and MatKhau = @MatKhau;
end;
go

-- h) Đăng ký
alter proc DangKy_NguoiDung
    @IDNguoiDung char(10),
    @HinhAnh varchar(max) null,
    @TenNguoiDung nvarchar(30),
	@GioiTinh nvarchar(10),
    @SoDienThoai varchar(10),
    @Email varchar(30),
    @MatKhau nvarchar(30)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM NguoiDung WHERE Email = @Email)
    BEGIN
        PRINT 'Email đã tồn tại.';
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM NguoiDung WHERE SoDienThoai = @SoDienThoai)
    BEGIN
        PRINT 'Số điện thoại đã tồn tại.';
        RETURN;
    END

    INSERT INTO NguoiDung (IDNguoiDung, HinhAnh, TenNguoiDung, GioiTinh, SoDienThoai, Email, MatKhau)
    VALUES (@IDNguoiDung, @HinhAnh, @TenNguoiDung, @GioiTinh, @SoDienThoai, @Email, @MatKhau);

    PRINT 'Đăng ký thành công.';
END;
go

create proc get_listMH_DM 
 @IDDanhMuc char(10)  -- Tham số ID danh mục
as
begin
    select 
        MH.IDMatHang,                    
        DMCha.TenDanhMuc AS TenDanhMucCha,  -- Tên danh mục cha
        DMCon.TenDanhMuc AS TenDanhMucCon,  -- Tên danh mục con
        DMChau.TenDanhMuc AS TenDanhMucChau, -- Tên danh mục cháu
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
    inner join DanhMuc DM on MH.IDDanhMuc = DM.IDDanhMuc  
    inner join DanhMuc DMCha on DM.IDDanhMucCha = DMCha.IDDanhMuc  
    left join DanhMuc DMCon on DMCha.IDDanhMuc = DMCon.IDDanhMucCha  
    left join DanhMuc DMChau on DMCon.IDDanhMuc = DMChau.IDDanhMucCha  
    inner join Kho KH on MH.IDMatHang = KH.IDMatHang  
    inner join AnhMatHang AMH on MH.IDMatHang = AMH.IDMatHang
    where 
        (DMCha.IDDanhMuc = 'DM00000001' OR DMCon.IDDanhMuc = 'DM00000001' OR DMChau.IDDanhMuc = 'DM00000001') AND AMH.ThuTu = '1'
    order by 
        DMCha.TenDanhMuc, DMCon.TenDanhMuc, DMChau.TenDanhMuc, MH.TenMatHang;
end;
go