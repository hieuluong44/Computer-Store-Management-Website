/*------------------ TRANG QUẢN TRỊ -----------------------*/


/*-- Tạo đơn hàng --*/
CREATE PROCEDURE TaoDonHangNhapDayChuyen
    @IDNhaCungCap CHAR(10),
    @NgayNhap DATE,
    @GhiChu NVARCHAR(100),
    @TrangThai NVARCHAR(30),
    @ChiTietNhap NVARCHAR(MAX) 
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Tạo đơn hàng nhập
        DECLARE @IDDonNhap CHAR(10) = 'DN' + FORMAT((SELECT COUNT(*) FROM HoaDonNhap) + 1, '0000');
        INSERT INTO HoaDonNhap (IDDonNhap, IDNhaCungCap, NgayNhap, TrangThai, GhiChu, TongTien)
        VALUES (@IDDonNhap, @IDNhaCungCap, @NgayNhap, @TrangThai, @GhiChu, 0);

        -- Xử lý chi tiết nhập từ JSON
        DECLARE @ChiTiet TABLE (
            IDMatHang CHAR(10),
            SoLuong INT,
            GiaNhap FLOAT
        );

        INSERT INTO @ChiTiet
        SELECT *
        FROM OPENJSON(@ChiTietNhap)
        WITH (
            IDMatHang CHAR(10),
            SoLuong INT,
            GiaNhap FLOAT
        );

        -- Thêm chi tiết đơn nhập và tính tổng tiền
        DECLARE @TongTien FLOAT = 0;
        DECLARE @IDChiTietDonNhap CHAR(10);

        DECLARE cur CURSOR FOR
            SELECT IDMatHang, SoLuong, GiaNhap FROM @ChiTiet;

        OPEN cur;

        DECLARE @IDMatHang CHAR(10);
        DECLARE @SoLuong INT;
        DECLARE @GiaNhap FLOAT;

        FETCH NEXT FROM cur INTO @IDMatHang, @SoLuong, @GiaNhap;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            -- Thêm chi tiết đơn nhập
            SET @IDChiTietDonNhap = 'CTDN' + FORMAT((SELECT COUNT(*) FROM ChiTietDonNhap) + 1, '0000');
            INSERT INTO ChiTietDonNhap (IDChiTietDonNhap, IDDonNhap, IDMatHang, SoLuong, GiaNhap)
            VALUES (@IDChiTietDonNhap, @IDDonNhap, @IDMatHang, @SoLuong, @GiaNhap);

            -- Cộng dồn tổng tiền
            SET @TongTien = @TongTien + (@SoLuong * @GiaNhap);

            FETCH NEXT FROM cur INTO @IDMatHang, @SoLuong, @GiaNhap;
        END

        CLOSE cur;
        DEALLOCATE cur;

        -- Cập nhật tổng tiền trong hóa đơn nhập
        UPDATE HoaDonNhap SET TongTien = @TongTien WHERE IDDonNhap = @IDDonNhap;

        COMMIT TRANSACTION;

    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
go


/*-- 1. Quản lý danh mục --*/
-- a) GetAll
alter proc Get_ALL_DanhMuc1
as
begin
    select * from DanhMuc where IDDanhMucCha IS NULL
end;
go

alter proc Get_ALL_DanhMuc2
    @IDDanhMucCha char(10)
as
begin
    select 
        dmCon.IDDanhMuc as IDDanhMucCon,      
        dmCon.TenDanhMuc as TenDanhMucCon,	   	   
        dmCha.TenDanhMuc as TenDanhMucCha     
    from DanhMuc dmCon 
    left join DanhMuc dmCha on dmCon.IDDanhMucCha = dmCha.IDDanhMuc  
    where dmCon.IDDanhMucCha = @IDDanhMucCha;       
end;
go

alter proc Get_ALL_DanhMuc3
    @IDDanhMucCon char(10)
as
begin
    select 
        dmChau.IDDanhMuc as IDDanhMucChau,      
        dmChau.TenDanhMuc as TenDanhMucChau,	   	   
        dmCon.TenDanhMuc as TenDanhMucCon
    from DanhMuc dmChau
    left join DanhMuc dmCon on dmChau.IDDanhMucCha = dmCon.IDDanhMuc
    where dmChau.IDDanhMucCha = @IDDanhMucCon;       
end;
go



-- b) Thêm danh mục
alter proc Them_DanhMuc
    @IDDanhMuc char(10),
    @TenDanhMuc nvarchar(50),
	@IDDanhMucCha char(10)
as
begin
    insert into DanhMuc (IDDanhMuc, TenDanhMuc, IDDanhMucCha )
    values (@IDDanhMuc, @TenDanhMuc, @IDDanhMucCha);
end;
go

-- c) Sửa danh mục
alter proc Sua_DanhMuc
    @IDDanhMuc char(10),
    @TenDanhMuc nvarchar(50),
	@IDDanhMucCha char(10)
as
begin
    update DanhMuc
    set TenDanhMuc = @TenDanhMuc,
	IDDanhMucCha = @IDDanhMucCha
    where IDDanhMuc = @IDDanhMuc
end;
go

-- d) Xóa danh mục
alter proc Xoa_DanhMuc
    @IDDanhMuc char(10)
as
begin
    delete from DanhMuc where IDDanhMuc = @IDDanhMuc
end;
go

/*-- 2. Quản lý mặt hàng --*/
-- a) Get ALL
create proc Get_ALL_MatHang_Admin
as
begin
    select 
        MH.IDMatHang,                          
        DM.TenDanhMuc,                    
        MH.TenMatHang,                        
        MH.DonGia,                            
        MH.BaoHanh,  
		AMH.DuongDan,
        CASE 
            WHEN KH.SoLuong IS NULL THEN N'Chưa cập nhật'  -- Nếu không có bản ghi kho
            WHEN KH.SoLuong = 0 THEN N'Hết hàng'
            WHEN KH.SoLuong < 5 THEN N'Số lượng dưới 5'
            ELSE N'Còn hàng'
        END as TrangThai
    from 
        MatHang MH
    inner join 
        DanhMuc DM on MH.IDDanhMuc = DM.IDDanhMuc
	inner join AnhMatHang AMH on MH.IDMatHang = AMH.IDMatHang
    left join 
        Kho KH on MH.IDMatHang = KH.IDMatHang  
		where AMH.ThuTu = 1
end;
go

-- b) Thêm mặt hàng
alter proc Them_MatHang 
    @IDMatHang char(10),
    @IDDanhMuc char(10),
    @TenMatHang nvarchar(100),
    @DonGia float,
    @BaoHanh nvarchar(10),
    @HinhAnh1 varchar(30),
    @TrangThai nvarchar(10)
as
begin    
    insert into MatHang (IDMatHang, IDDanhMuc, TenMatHang, DonGia, BaoHanh, HinhAnh1, TrangThai)
    values (@IDMatHang, @IDDanhMuc, @TenMatHang, @DonGia, @BaoHanh, @HinhAnh1, @TrangThai)
end;
go

create proc ThemMatHang_ChiTiet
    @IDMatHang CHAR(10),
    @IDDanhMuc CHAR(10),
    @TenMatHang NVARCHAR(100),
    @DonGia FLOAT,
    @BaoHanh NVARCHAR(10),
    @TrangThai NVARCHAR(10),
    @ThongSoKyThuat NVARCHAR(MAX), -- JSON thông số kỹ thuật
    @AnhMatHang NVARCHAR(MAX) -- JSON ảnh mặt hàng
AS
BEGIN
	insert into MatHang (IDMatHang, IDDanhMuc, TenMatHang, DonGia, BaoHanh, TrangThai)
	values (@IDMatHang, @IDDanhMuc, @TenMatHang, @DonGia, @BaoHanh, @TrangThai);
	if( @ThongSoKyThuat is not null)
		begin 
			insert into ThongSoKyThuat ( IDThongSo, IDMatHang, TenThongSo, GiaTriThongSo)
				select JSON_VALUE(p.value, '$.IDThongSo'),
						@IDMatHang,
						JSON_VALUE(p.value, '$TenThongSo'),
						JSON_VALUE(p.value, '$GiaTriThongSo')  
				from OPENJSON(@ThongSoKyThuat) as p;
		end;


		if( @AnhMatHang is not null)
		begin 
			insert into AnhMatHang( IDAnhMatHang, IDMatHang, DuongDan, ThuTu)
				select JSON_VALUE(p.value, '$.IDAnhMatHang'),
						@IDMatHang,
						JSON_VALUE(p.value, 'DuongDan'),
						ROW_NUMBER() OVER (ORDER BY (SELECT NULL))  
				from OPENJSON(@ThongSoKyThuat) as p;
		end;
	select '';
END;
GO


alter proc XoaMatHangVaThongSo
    @IDMatHang CHAR(10)
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Xóa thông số kỹ thuật
        DELETE FROM ThongSoKyThuat
        WHERE IDMatHang = @IDMatHang;

        -- Xóa mặt hàng
        DELETE FROM MatHang
        WHERE IDMatHang = @IDMatHang;

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
END;
GO


-- c) Sửa mặt hàng
alter proc Sua_ThongTin_MatHang 
    @IDMatHang char(10),
    @IDDanhMuc char(10),
    @TenMatHang nvarchar(100),
    @DonGia float,
    @BaoHanh nvarchar(10),
    @HinhAnh1 varchar(30),
    @TrangThai nvarchar(10)
as
begin    
    update MatHang 
    set IDDanhMuc = @IDDanhMuc,
        TenMatHang = @TenMatHang,
        DonGia = @DonGia,
        BaoHanh = @BaoHanh,
        HinhAnh1 = @HinhAnh1,
        TrangThai = @TrangThai
    where IDMatHang = @IDMatHang
end;
go

-- d) Xoá mặt hàng
alter proc Xoa_MatHang 
    @IDMatHang char(10)
as
begin    
    delete from MatHang where IDMatHang = @IDMatHang
end;
go

create proc getThongSoKyThuat
    @IDMatHang char(10)
as
begin 
    select 
        TS.IDThongSo, 
        TS.TenThongSo, 
        TS.GiaTriThongSo
    from ThongSoKyThuat TS
    inner join MatHang MH on TS.IDMatHang = MH.IDMatHang
    where MH.IDMatHang = @IDMatHang
end;
go

create proc getAnhMatHang
    @IDMatHang char(10)
as
begin 
    select 
        AMH.IDAnhMatHang, 
        AMH.DuongDan, 
        AMH.ThuTu
    from AnhMatHang AMH
    inner join MatHang MH on AMH.IDMatHang = MH.IDMatHang
    where MH.IDMatHang = @IDMatHang
    order by AMH.ThuTu;
end;
go

-- b) ADD 
alter procedure Them_ThongSo	
	@IDThongSo char(10),
    @IDMatHang char(10),
    @TenThongSo nvarchar(100),
    @GiaTriThongSo nvarchar(500)
as
begin
    insert into ThongSoKyThuat (IDThongSo, IDMatHang, TenThongSo, GiaTriThongSo)
    values (@IDThongSo, @IDMatHang, @TenThongSo, @GiaTriThongSo);
    end;
go

-- b) ADD 
alter procedure Sua_ThongSo
    @IDThongSo char(10),
    @IDMatHang char(10),
    @TenThongSo nvarchar(100),
    @GiaTriThongSo nvarchar(500)
as
begin
    update ThongSoKyThuat
    set
        IDMatHang = @IDMatHang,
        TenThongSo = @TenThongSo,
        GiaTriThongSo = @GiaTriThongSo
    where IDThongSo = @IDThongSo;
end;
go

--c) delete
alter procedure Xoa_ThongSo
    @IDThongSo char(10)
as
begin
    delete from ThongSoKyThuat where IDThongSo = @IDThongSo;
end;
go

-- Sửa hóa đơn bán
alter proc Sua_HoaDonBan
    @IDDonBan char(10),
    @IDNguoiDung char(10),
    @NgayBan date,
    @TrangThai nvarchar(30),
    @GhiChu nvarchar(100)
as
begin
    update HoaDonBan
    set IDNguoiDung = @IDNguoiDung,
        NgayBan = @NgayBan,
        TrangThai = @TrangThai,
        GhiChu = @GhiChu
    where IDDonBan = @IDDonBan
end;
go

--Cập nhật trạng thái hoá đơn
create proc CapNhat_TrangThai_DonBan
    @IDDonBan char(10),
	@TrangThai nvarchar(30)
as
begin
	update HoaDonBan set TrangThai = @TrangThai
    where IDDonBan = @IDDonBan
end;
go

-- Xóa hóa đơn bán
alter proc Xoa_HoaDonBan
    @IDDonBan char(10)
as
begin
    delete from HoaDonBan where IDDonBan = @IDDonBan
end;

/*----------Chi tiết bán---------*/
-- GetAll
alter proc Get_All_ChiTietDonBan
as
begin
    select * from ChiTietDonBan
end;
go

-- Thêm chi tiết hóa đơn bán
alter proc Them_ChiTietDonBan
    @IDChiTietDonBan char(10),
    @IDDonBan char(10),
    @IDMatHang char(10),
	@IDGiamGia char(10),
    @SoLuong int,
    @GiaBan float
as
begin
    insert into ChiTietDonBan (IDChiTietDonBan, IDDonBan, IDMatHang, IDGiamGia, SoLuong, GiaBan)
    values (@IDChiTietDonBan, @IDDonBan, @IDMatHang, @IDGiamGia,@SoLuong, @GiaBan);
end;

-- Sửa chi tiết hóa đơn bán
create proc Sua_ChiTietDonBan
    @IDChiTietDonBan char(10),
    @IDDonBan char(10),
    @IDMatHang char(10),
    @SoLuong int,
    @GiaBan float
as
begin
    update ChiTietDonBan
    set IDDonBan = @IDDonBan,
        IDMatHang = @IDMatHang,
        SoLuong = @SoLuong,
        GiaBan = @GiaBan
    where IDChiTietDonBan = @IDChiTietDonBan
end;
select * from GiamGia
-- Xóa chi tiết hóa đơn bán
create proc Xoa_ChiTietDonBan
    @IDChiTietDonBan char(10)
as
begin
    delete from ChiTietDonBan where IDChiTietDonBan = @IDChiTietDonBan
end;

/*----------Đánh giá ---------*/
-- GetAll
create proc Get_All_DanhGia
as
begin
    select DG.IDDanhGia, MH.TenMatHang, ND.TenNguoiDung, DG.NoiDung, DG.SoSao, DG.ThoiGianDanhGia from DanhGia DG 
	inner join MatHang MH on DG.IDMatHang = MH.IDMatHang
	inner join NguoiDung ND on DG.IDNguoiDung = ND.IDNguoiDung
end;

-- Xóa đánh giá
create proc Xoa_DanhGia
    @IDDanhGia char(10)
as
begin
    delete from DanhGia where IDDanhGia = @IDDanhGia;
end;
go


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


create proc Donban_TheoTrangThai
    @TrangThai NVARCHAR(50)
as
begin
    select HDB.IDDonBan, ND.TenNguoiDung, GG.NoiDung, GG.TyLeGiam, 
           HDB.NgayBan, HDB.GhiChu, HDB.TongTien, HDB.TrangThai
    from HoaDonBan HDB
    inner join NguoiDung ND on HDB.IDNguoiDung = ND.IDNguoiDung
    left join GiamGia GG on HDB.IDGiamGia = GG.IDGiamGia
    where HDB.TrangThai LIKE '%' + @TrangThai + '%'
end;
go
