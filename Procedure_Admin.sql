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
alter proc Get_ALL_MatHang
as
begin
    select 
        MH.IDMatHang,                          
        DM.TenDanhMuc,                    
        MH.TenMatHang,                        
        MH.DonGia,                            
        MH.BaoHanh,                            
        MH.HinhAnh1,     
        CASE 
            WHEN KH.SoLuong = 0 THEN N'Hết hàng'
            WHEN KH.SoLuong < 5 THEN N'Số lượng dưới 5'
            ELSE N'Còn hàng'
        END as TrangThai
    from 
        MatHang MH
    inner join 
        DanhMuc DM on MH.IDDanhMuc = DM.IDDanhMuc
    inner join 
        Kho KH on MH.IDMatHang = KH.IDMatHang
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

alter proc ThemMatHangVaThongSoJSON
    @IDMatHang CHAR(10),
    @IDDanhMuc CHAR(10),
    @IDGiamGia CHAR(10),
    @TenMatHang NVARCHAR(100),
    @DonGia FLOAT,
    @BaoHanh NVARCHAR(10),
    @HinhAnh1 VARCHAR(MAX),
    @TrangThai NVARCHAR(10),
    @ThongSoKyThuat NVARCHAR(MAX) -- Tham số JSON
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Thêm mặt hàng
        INSERT INTO MatHang (IDMatHang, IDDanhMuc, IDGiamGia, TenMatHang, DonGia, BaoHanh, HinhAnh1, TrangThai)
        VALUES (@IDMatHang, @IDDanhMuc, @IDGiamGia, @TenMatHang, @DonGia, @BaoHanh, @HinhAnh1, @TrangThai);

        -- Thêm thông số kỹ thuật từ JSON
        DECLARE @JSON NVARCHAR(MAX) = @ThongSoKyThuat;
        
        -- Thêm thông số kỹ thuật
        INSERT INTO ThongSoKyThuat (IDThongSo, IDMatHang, TenThongSo, GiaTriThongSo)
        SELECT NEWID(), @IDMatHang, 
               JSON_VALUE(value, '$.TenThongSo'), 
               JSON_VALUE(value, '$.GiaTriThongSo')
        FROM OPENJSON(@JSON) 
        WITH (value NVARCHAR(MAX) AS JSON);

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH;
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

-- Thông số kĩ thuật 
-- a) Get
alter proc Get_All_ThongSo 
	@IDMatHang char(10)
as
begin
	select TS.IDThongSo, MH.TenMatHang, TS.TenThongSo, TS.GiaTriThongSo from ThongSoKyThuat TS 
	inner join MatHang MH on TS.IDMatHang = MH.IDMatHang where TS.IDMatHang = @IDMatHang
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
