use [Dự án : Quản lý cửa hàng bán máy tính]
go	

-- Các trường bảng dữ liệu
create table DanhMuc (
    IDDanhMuc varchar(10) primary key not null,
    TenDanhMuc nvarchar(50) not null,
	Icon varchar(20) null,
	IDDanhMucCha varchar(10) foreign key references DanhMuc(IDDanhMuc) null,
);
go

create table GiamGia (
	IDGiamGia varchar(10) primary key not null,
	HinhAnh varchar(max) null,
	TyLeGiam float check( TyLeGiam > 0 and TyLeGiam <= 50),
	NoiDung nvarchar(max) null,
	NgayBatDau date not null,
	NgayKetThuc date not null,
	TrangThaiGiamGia nvarchar(20) check (TrangThaiGiamGia in (N'Đã kết thúc', N'Sắp bắt đầu' , N'Đang diễn ra')) not null,
);
go

create table MatHang (
    IDMatHang varchar(10) primary key not null,
    IDDanhMuc varchar(10) null,
    TenMatHang nvarchar(100) not null,
    DonGia float not null,
    BaoHanh nvarchar(10) null,
    TrangThai nvarchar(10) check (TrangThai in (N'Còn hàng', N'Số lượng dưới 5' ,N'Hết hàng')) null,
    foreign key( IDDanhMuc ) references DanhMuc( IDDanhMuc )
);
go

create table AnhMatHang (
	IDAnhMatHang varchar(10) primary key not null,
    IDMatHang varchar(10) not null,
    DuongDan varchar(MAX) not null, 
    ThuTu int not null, 
    foreign key (IDMatHang) references MatHang(IDMatHang)
);
go

create table ThongSoKyThuat (
    IDThongSo varchar(10) primary key, 
    IDMatHang varchar(10) not null, 
    TenThongSo nvarchar(100) not null, 
    GiaTriThongSo nvarchar(500) not null, 
    foreign key (IDMatHang) references MatHang(IDMatHang)
);
go

create table NguoiDung (
    IDNguoiDung varchar(10) primary key not null,
    HinhAnh varchar(Max) null,
    TenNguoiDung nvarchar(30) not null,
    SoDienThoai varchar(10) not null UNIQUE,
    Email varchar(30) not null UNIQUE,
    MatKhau nvarchar(30) not null,
	DiaChi nvarchar(200) null,
    VaiTro nvarchar(20) not null default N'Khách hàng' check (VaiTro in (N'Khách hàng', N'Quản trị viên'))
);
go

create table NhaCungCap (
    IDNhaCungCap varchar(10) primary key not null,
    TenNhaCungCap nvarchar(100) not null,
    Email varchar(30) not null UNIQUE,
    SoDienThoai varchar(10) not null UNIQUE,
    DiaChi nvarchar(200) not null
);
go

create table HoaDonNhap (
	IDDonNhap varchar(10) primary key not null,
	IDNhaCungCap varchar(10) null,
	NgayNhap date not null,
	TrangThai nvarchar(30) default N'Chờ xác nhận' check (TrangThai in (N'Chờ xác nhận', N'Chờ lấy hàng', N'Đang vận chuyển',N'Trả hàng',N'Đã giao',N'Đã huỷ')) not null,
	GhiChu nvarchar(100) not null,
	TongTien float default 0,
	foreign key(IDNhaCungCap) references NhaCungCap(IDNhaCungCap)
);
go

create table ChiTietDonNhap(
	IDChiTietDonNhap varchar(10) primary key not null,
	IDDonNhap varchar(10) null,
	IDMatHang varchar(10) null,
	SoLuong int not null,
	GiaNhap float not null,
	foreign key (IDDonNhap) references HoaDonNhap(IDDonNhap),
	foreign key (IDMatHang) references MatHang(IDMatHang)
);
go

create table HoaDonBan (
	IDDonBan varchar(10) primary key not null,
	IDNguoiDung varchar(10) not null,
	IDGiamGia varchar(10) null, 
	NgayBan date not null,
	TrangThai nvarchar(30) default N'Chờ xác nhận' check (TrangThai in (N'Chờ xác nhận', N'Chờ lấy hàng', N'Đang vận chuyển',N'Trả hàng',N'Đã giao', N'Yêu cầu huỷ hàng' ,N'Đã huỷ')) not null,
	GhiChu nvarchar(100) not null,
	TongTien float default 0,
	foreign key(IDNguoiDung) references NguoiDung(IDNguoiDung),
	foreign key(IDGiamGia) references GiamGia(IDGiamGia)
);
go

create table ChiTietDonBan (
	IDChiTietDonBan varchar(10) primary key not null,
	IDDonBan varchar(10) null,
	IDMatHang varchar(10) null,
	SoLuong int not null,
	GiaBan float not null,
	foreign key (IDDonBan) references HoaDonBan(IDDonBan),
	foreign key (IDMatHang) references MatHang(IDMatHang),
);
go

create table DanhGia (
	IDDanhGia varchar(10) primary key not null,
	IDMatHang varchar(10) not null,
	IDNguoiDung varchar(10) not null,
	SoSao int not null,
	NoiDung nvarchar(max) null,
	ThoiGianDanhGia datetime default Getdate() not null,
	foreign key(IDMatHang) references MatHang(IDMatHang),
	foreign key(IDNguoiDung) references NguoiDung(IDNguoiDung)
);
go


create table Kho (
    IDKho varchar(10) primary key not null,
    IDMatHang varchar(10) not null,
    SoLuong int NOT NULL,
    NgayCapNhat datetime default Getdate() NOT NULL,
    FOREIGN KEY (IDMatHang) REFERENCES MatHang(IDMatHang)
);
go

INSERT INTO DanhMuc (IDDanhMuc, TenDanhMuc, IDDanhMucCha, Icon) VALUES
/*-- Danh mục cha --*/
('DM00000001', N'Laptop', NULL, 'bi bi-laptop'),
('DM00000002', N'Thiết bị văn phòng', NULL, 'bi bi-printer'),
('DM00000003', N'Laptop gaming', NULL, 'bi bi-controller'),
('DM00000004', N'PC', NULL, 'bi bi-pc'),
('DM00000005', N'Màn hình', NULL, 'bi bi-display'),
('DM00000006', N'Linh kiện máy tính', NULL, 'bi bi-cpu'),
('DM00000007', N'Thiết bị lưu trữ', NULL, 'bi bi-hdd'),
('DM00000008', N'Phụ kiện', NULL, 'bi bi-gear'),
('DM00000009', N'Thiết bị mạng', NULL, 'bi bi-router'),
('DM00000010', N'Gaming Gear', NULL, 'bi bi-joystick'),

/*-- Danh mục con --*/
('DM00000011', N'Apple', 'DM00000001', NULL),
('DM00000012', N'Asus', 'DM00000001', NULL),
('DM00000013', N'Acer', 'DM00000001', NULL),
('DM00000014', N'Lenovo', 'DM00000001', NULL),
('DM00000015', N'Dell', 'DM00000001', NULL),

('DM00000016', N'Máy in', 'DM00000002', NULL),
('DM00000017', N'Máy chiếu', 'DM00000002', NULL),
('DM00000018', N'Máy photocopy', 'DM00000002', NULL),
('DM00000019', N'Phần mềm máy tính', 'DM00000002', NULL),

('DM00000020', N'LCD', 'DM00000003', NULL),
('DM00000021', N'LED', 'DM00000003', NULL),
('DM00000022', N'OLED', 'DM00000003', NULL),
('DM00000023', N'QLED', 'DM00000003', NULL),

('DM00000024', N'PC Gaming', 'DM00000004', NULL),
('DM00000025', N'Workstation', 'DM00000004', NULL),
('DM00000026', N'Mini PC', 'DM00000004', NULL),
('DM00000027', N'All-in-One PC', 'DM00000004', NULL),
('DM00000028', N'Server PC', 'DM00000004', NULL),

('DM00000029', N'LCD', 'DM00000005', NULL),
('DM00000030', N'LED', 'DM00000005', NULL),
('DM00000031', N'OLED', 'DM00000005', NULL),
('DM00000032', N'QLED', 'DM00000005', NULL),
('DM00000033', N'Plasma', 'DM00000005', NULL),

('DM00000034', N'CPU', 'DM00000006', NULL),
('DM00000035', N'SSD', 'DM00000006', NULL),
('DM00000036', N'RAM', 'DM00000006', NULL),
('DM00000037', N'GPU', 'DM00000006', NULL),

('DM00000038', N'USB', 'DM00000007', NULL),
('DM00000039', N'Ổ cứng di động', 'DM00000007', NULL),
('DM00000040', N'Thẻ nhớ SD', 'DM00000007', NULL),

('DM00000041', N'Chuột', 'DM00000008', NULL),
('DM00000042', N'Bàn phím', 'DM00000008', NULL),
('DM00000043', N'Tai nghe', 'DM00000008', NULL),
('DM00000044', N'Webcam', 'DM00000008', NULL),

('DM00000045', N'Router', 'DM00000009', NULL),
('DM00000046', N'Switch', 'DM00000009', NULL),
('DM00000047', N'Wi-Fi Extender', 'DM00000009', NULL),

('DM00000048', N'Gaming Chair', 'DM00000010', NULL),
('DM00000049', N'Gamepad', 'DM00000010', NULL);


INSERT INTO DanhMuc (IDDanhMuc, TenDanhMuc, IDDanhMucCha, Icon) VALUES
/*-- Danh mục cháu thuộc danh mục con "Apple" --*/
('DM00000050', N'Macbook Air', 'DM00000011', NULL),
('DM00000051', N'Macbook Pro', 'DM00000011', NULL),
('DM00000052', N'Mac Mini', 'DM00000011', NULL),
('DM00000053', N'iMac', 'DM00000011', NULL),

/*-- Danh mục cháu thuộc danh mục con "Asus" --*/
('DM00000054', N'Vivobook', 'DM00000012', NULL),
('DM00000055', N'Zenbook', 'DM00000012', NULL),
('DM00000056', N'TUF Gaming', 'DM00000012', NULL),
('DM00000057', N'ROG Gaming', 'DM00000012', NULL),

/*-- Danh mục cháu thuộc danh mục con "Acer" --*/
('DM00000058', N'Aspire', 'DM00000013', NULL),
('DM00000059', N'Nitro', 'DM00000013', NULL),
('DM00000060', N'Predator', 'DM00000013', NULL),
('DM00000061', N'Swift', 'DM00000013', NULL),

/*-- Danh mục cháu thuộc danh mục con "Lenovo" --*/
('DM00000062', N'ThinkPad', 'DM00000014', NULL),
('DM00000063', N'IdeaPad', 'DM00000014', NULL),
('DM00000064', N'Legion', 'DM00000014', NULL),
('DM00000065', N'Yoga', 'DM00000014', NULL),

/*-- Danh mục cháu thuộc danh mục con "Dell" --*/
('DM00000066', N'Inspiron', 'DM00000015', NULL),
('DM00000067', N'XPS', 'DM00000015', NULL),
('DM00000068', N'Alienware', 'DM00000015', NULL),
('DM00000069', N'Latitude', 'DM00000015', NULL),

/*-- Các sản phẩm thuộc danh mục con "Thiết bị văn phòng" --*/
('DM00000070', N'Canon', 'DM00000016', NULL),
('DM00000071', N'Brother', 'DM00000016', NULL),
('DM00000072', N'Epson', 'DM00000016', NULL),
('DM00000073', N'Xerox', 'DM00000016', NULL),

/*-- Các sản phẩm thuộc danh mục con "Máy chiếu" --*/
('DM00000074', N'Sony', 'DM00000017', NULL),
('DM00000075', N'Panasonic', 'DM00000017', NULL),
('DM00000076', N'Optoma', 'DM00000017', NULL),
('DM00000077', N'Epson', 'DM00000017', NULL),

/*-- Các sản phẩm thuộc danh mục con "Máy photocopy" --*/
('DM00000078', N'Ricoh', 'DM00000018', NULL),
('DM00000079', N'Xerox', 'DM00000018', NULL),
('DM00000080', N'Canon', 'DM00000018', NULL),
('DM00000081', N'Konica', 'DM00000018', NULL),

/*-- Các sản phẩm thuộc danh mục con "Phần mềm máy tính" --*/
('DM00000082', N'Microsoft', 'DM00000019', NULL),
('DM00000083', N'Adobe', 'DM00000019', NULL),
('DM00000084', N'Kaspersky', 'DM00000019', NULL),
('DM00000085', N'Bitdefender', 'DM00000019', NULL),

/*-- Các sản phẩm thuộc danh mục con "Laptop Gaming" --*/
('DM00000086', N'Dell', 'DM00000020', NULL),
('DM00000087', N'HP', 'DM00000020', NULL),
('DM00000088', N'Samsung', 'DM00000020', NULL),
('DM00000089', N'LG', 'DM00000020', NULL),
('DM00000090', N'Philips', 'DM00000020', NULL),

/*-- Các sản phẩm thuộc danh mục con "LED" của Laptop Gaming --*/
('DM00000091', N'Asus', 'DM00000021', NULL),
('DM00000092', N'BenQ', 'DM00000021', NULL),
('DM00000093', N'Acer', 'DM00000021', NULL),
('DM00000094', N'ViewSonic', 'DM00000021', NULL),
('DM00000095', N'MSI', 'DM00000021', NULL),

/*-- Các sản phẩm thuộc danh mục con "OLED" của Laptop Gaming --*/
('DM00000096', N'LG', 'DM00000022', NULL),
('DM00000097', N'Sony', 'DM00000022', NULL),
('DM00000098', N'Samsung', 'DM00000022', NULL),
('DM00000099', N'Panasonic', 'DM00000022', NULL),

/*-- Các sản phẩm thuộc danh mục con "QLED" của Laptop Gaming --*/
('DM00000100', N'Samsung', 'DM00000023', NULL),
('DM00000101', N'TCL', 'DM00000023', NULL),
('DM00000102', N'Hisense', 'DM00000023', NULL),
('DM00000103', N'Vizio', 'DM00000023', NULL),

/*-- Các sản phẩm thuộc danh mục con "PC" --*/
('DM00000104', N'Alienware', 'DM00000024', NULL),
('DM00000105', N'ASUS ROG', 'DM00000024', NULL),
('DM00000106', N'MSI Gaming', 'DM00000024', NULL),
('DM00000107', N'HP OMEN', 'DM00000024', NULL),

/*-- Các sản phẩm thuộc danh mục con "Workstation" --*/
('DM00000108', N'Dell Precision', 'DM00000025', NULL),
('DM00000109', N'Lenovo ThinkStation', 'DM00000025', NULL),
('DM00000110', N'HP Z', 'DM00000025', NULL);


-- Các sản phẩm thuộc danh mục con "Mini PC"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000111', N'Intel NUC', 'DM00000026', NULL),
('DM00000112', N'ASUS PN Series', 'DM00000026', NULL),
('DM00000113', N'MSI Cubi', 'DM00000026', NULL),
('DM00000114', N'Acer Revo', 'DM00000026', NULL);

-- Các sản phẩm thuộc danh mục con "All-in-One PC"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000115', N'iMac', 'DM00000027', NULL),
('DM00000116', N'Dell Inspiron AIO', 'DM00000027', NULL),
('DM00000117', N'HP Pavilion AIO', 'DM00000027', NULL),
('DM00000118', N'Lenovo IdeaCentre', 'DM00000027', NULL);

-- Các sản phẩm thuộc danh mục con "Server PC"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000119', N'Dell PowerEdge', 'DM00000028', NULL),
('DM00000120', N'HP ProLiant', 'DM00000028', NULL),
('DM00000121', N'Lenovo ThinkSystem', 'DM00000028', NULL),
('DM00000122', N'Supermicro', 'DM00000028', NULL);

-- Các sản phẩm thuộc danh mục con "LCD" của Màn hình
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000123', N'Dell UltraSharp', 'DM00000029', NULL),
('DM00000124', N'LG UltraFine', 'DM00000029', NULL),
('DM00000125', N'BenQ PD Series', 'DM00000029', NULL),
('DM00000126', N'Samsung Smart Monitor', 'DM00000029', NULL);

-- Các sản phẩm thuộc danh mục con "LED" của Màn hình
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000127', N'Asus ProArt', 'DM00000030', NULL),
('DM00000128', N'Acer Nitro', 'DM00000030', NULL),
('DM00000129', N'MSI Optix', 'DM00000030', NULL),
('DM00000130', N'Dell Gaming', 'DM00000030', NULL);

-- Các sản phẩm thuộc danh mục con "OLED" của Màn hình
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000131', N'LG UltraGear OLED', 'DM00000031', NULL),
('DM00000132', N'Samsung OLED Monitor', 'DM00000031', NULL),
('DM00000133', N'Dell Alienware OLED', 'DM00000031', NULL),
('DM00000134', N'Asus ROG OLED', 'DM00000031', NULL);

-- Các sản phẩm thuộc danh mục con "QLED" của Màn hình
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000135', N'Samsung QLED Monitor', 'DM00000032', NULL),
('DM00000136', N'TCL Gaming Monitor', 'DM00000032', NULL),
('DM00000137', N'BenQ HDR QLED', 'DM00000032', NULL),
('DM00000138', N'Vizio Smart QLED', 'DM00000032', NULL);

-- Các sản phẩm thuộc danh mục con "Plasma"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000139', N'Panasonic Plasma', 'DM00000033', NULL),
('DM00000140', N'Samsung Plasma', 'DM00000033', NULL),
('DM00000141', N'LG Plasma', 'DM00000033', NULL),
('DM00000142', N'Sony Plasma', 'DM00000033', NULL);

-- Các sản phẩm thuộc danh mục con "Gaming Chair"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000143', N'DXRacer', 'DM00000048', NULL),
('DM00000144', N'Secretlab', 'DM00000048', NULL),
('DM00000145', N'AndaSeat', 'DM00000048', NULL),
('DM00000146', N'Noblechairs', 'DM00000048', NULL);

-- Các sản phẩm thuộc danh mục con "Gamepad"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000147', N'Xbox Controller', 'DM00000049', NULL),
('DM00000148', N'PlayStation Controller', 'DM00000049', NULL),
('DM00000149', N'Razer Wolverine', 'DM00000049', NULL),
('DM00000150', N'Logitech F310', 'DM00000049', NULL);

-- Các sản phẩm thuộc danh mục con "CPU"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000151', N'Intel Core i9', 'DM00000034', NULL),
('DM00000152', N'Intel Core i7', 'DM00000034', NULL),
('DM00000153', N'AMD Ryzen 9', 'DM00000034', NULL),
('DM00000154', N'AMD Ryzen 7', 'DM00000034', NULL);

-- Các sản phẩm thuộc danh mục con "SSD"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000155', N'Samsung 980 Pro', 'DM00000035', NULL),
('DM00000156', N'WD Black SN850X', 'DM00000035', NULL),
('DM00000157', N'Kingston NV2', 'DM00000035', NULL),
('DM00000158', N'Crucial P5 Plus', 'DM00000035', NULL);

-- Các sản phẩm thuộc danh mục con "RAM"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000159', N'Corsair Vengeance 16GB', 'DM00000036', NULL),
('DM00000160', N'G.SKILL Trident Z RGB 32GB', 'DM00000036', NULL),
('DM00000161', N'Kingston Fury Beast 16GB', 'DM00000036', NULL),
('DM00000162', N'ADATA XPG Spectrix D50', 'DM00000036', NULL);

-- Các sản phẩm thuộc danh mục con "GPU"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000163', N'NVIDIA GeForce RTX 4090', 'DM00000037', NULL),
('DM00000164', N'NVIDIA GeForce RTX 4080', 'DM00000037', NULL),
('DM00000165', N'AMD Radeon RX 7900 XTX', 'DM00000037', NULL),
('DM00000166', N'AMD Radeon RX 7600', 'DM00000037', NULL);

-- Các sản phẩm thuộc danh mục con "USB"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000167', N'USB 3.0 32GB Kingston', 'DM00000038', NULL),
('DM00000168', N'USB 3.1 64GB SanDisk', 'DM00000038', NULL),
('DM00000169', N'USB-C 128GB Samsung', 'DM00000038', NULL),
('DM00000170', N'USB 2.0 16GB Toshiba', 'DM00000038', NULL);

-- Các sản phẩm thuộc danh mục con "Ổ cứng di động"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000171', N'WD My Passport 1TB', 'DM00000039', NULL),
('DM00000172', N'Seagate Backup Plus 2TB', 'DM00000039', NULL),
('DM00000173', N'LaCie Rugged 4TB', 'DM00000039', NULL),
('DM00000174', N'Transcend StoreJet 1TB', 'DM00000039', NULL);

-- Các sản phẩm thuộc danh mục con "Thẻ nhớ SD"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000175', N'SanDisk Extreme 128GB', 'DM00000040', NULL),
('DM00000176', N'Lexar Professional 64GB', 'DM00000040', NULL),
('DM00000177', N'Samsung EVO Plus 256GB', 'DM00000040', NULL),
('DM00000178', N'Kingston Canvas Select Plus 32GB', 'DM00000040', NULL);

-- Các sản phẩm thuộc danh mục con "Chuột"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000179', N'Logitech G502 HERO', 'DM00000041', NULL),
('DM00000180', N'Razer DeathAdder V3', 'DM00000041', NULL),
('DM00000181', N'SteelSeries Rival 5', 'DM00000041', NULL),
('DM00000182', N'Corsair Sabre RGB Pro', 'DM00000041', NULL);

-- Các sản phẩm thuộc danh mục con "Bàn phím"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000183', N'Keychron K8 Pro', 'DM00000042', NULL),
('DM00000184', N'Razer BlackWidow V4', 'DM00000042', NULL),
('DM00000185', N'Logitech MX Keys', 'DM00000042', NULL),
('DM00000186', N'Corsair K70 RGB MK.2', 'DM00000042', NULL);

-- Các sản phẩm thuộc danh mục con "Tai nghe"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000187', N'Razer Kraken X', 'DM00000043', NULL),
('DM00000188', N'Logitech G733', 'DM00000043', NULL),
('DM00000189', N'SteelSeries Arctis 7', 'DM00000043', NULL),
('DM00000190', N'Corsair HS70 Pro', 'DM00000043', NULL);

-- Các sản phẩm thuộc danh mục con "Webcam"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000191', N'Logitech C920 HD', 'DM00000044', NULL),
('DM00000192', N'Razer Kiyo Pro', 'DM00000044', NULL),
('DM00000193', N'AverMedia PW315', 'DM00000044', NULL),
('DM00000194', N'Elgato Facecam', 'DM00000044', NULL);

-- Các sản phẩm thuộc danh mục con "Router"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000195', N'TP-Link Archer AX50', 'DM00000045', NULL),
('DM00000196', N'Asus RT-AX86U', 'DM00000045', NULL),
('DM00000197', N'Netgear Nighthawk AX12', 'DM00000045', NULL),
('DM00000198', N'D-Link DIR-2150', 'DM00000045', NULL);

-- Các sản phẩm thuộc danh mục con "Switch"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000199', N'Cisco Catalyst 2960', 'DM00000046', NULL),
('DM00000200', N'Netgear GS108', 'DM00000046', NULL),
('DM00000201', N'TP-Link TL-SG105', 'DM00000046', NULL),
('DM00000202', N'D-Link DGS-1016D', 'DM00000046', NULL);

-- Các sản phẩm thuộc danh mục con "Wi-Fi Extender"
INSERT INTO DanhMuc (idDanhMuc, tenDanhMuc, idDanhMucCha, icon) VALUES
('DM00000203', N'TP-Link RE650', 'DM00000047', NULL),
('DM00000204', N'Netgear EX7300', 'DM00000047', NULL),
('DM00000205', N'Asus RP-AC55', 'DM00000047', NULL),
('DM00000206', N'D-Link DAP-1610', 'DM00000047', NULL);



insert into GiamGia (IDGiamGia, HinhAnh, TyLeGiam, NoiDung, NgayBatDau, NgayKetThuc, TrangThaiGiamGia)
values
('GG19283740','NamMoi.jpg', 30, N'Giảm giá mừng năm mới', '2025-01-01', '2025-01-10', N'Sắp bắt đầu'),
('GG38492010','LeTinhNhan.jpg', 25, N'Giảm giá ngày lễ tình nhân', '2025-02-10', '2025-02-15', N'Sắp bắt đầu'),
('GG49502390','NgayPhuNu.jpg', 35, N'Giảm giá Quốc tế Phụ nữ', '2025-03-08', '2025-03-10', N'Sắp bắt đầu'),
('GG10293840','MuaHe.jpg', 40, N'Giảm giá mùa hè', '2025-06-01', '2025-06-15', N'Sắp bắt đầu'),
('GG57392040','GiuaThang.jpg', 10, N'Giảm giá giữa tháng', '2024-11-15', '2024-12-15', N'Đang diễn ra'),
('GG84920380','KhachVIP.jpg', 45, N'Giảm giá cho khách hàng VIP', '2024-12-15', '2024-12-20', N'Đang diễn ra'),
('GG48291020','CyberDay.jpg', 40, N'Giảm giá cho ngày Cyber Monday', '2024-12-02', '2024-12-03', N'Sắp bắt đầu'),
('GG20394850','QuocKhanh.jpg', 15, N'Giảm giá mừng Quốc khánh', '2024-09-01', '2024-09-05', N'Đã kết thúc'),
('GG74839200','XaHang.jpg', 50, N'Giảm giá xả hàng cuối năm', '2024-12-25', '2025-01-05', N'Sắp bắt đầu');
go

/*-- Các sản phẩm thuộc danh mục con "Laptop" --*/
INSERT INTO MatHang (IDMatHang, IDDanhMuc, TenMatHang, DonGia, BaoHanh, TrangThai) VALUES
-- Macbook Air
('MH00000017', 'DM00000011',  N'Macbook Air M2 2023', 28000000, N'12 tháng', NULL),
-- Macbook Pro
('MH00000018', 'DM00000011', N'Macbook Pro M1 2022', 32000000, N'12 tháng', NULL),
-- Mac Mini
('MH00000019', 'DM00000011', N'Mac Mini M1 2023', 12000000, N'12 tháng', NULL),
-- iMac
('MH00000020', 'DM00000011',  N'iMac 24-inch 2023', 25000000, N'12 tháng', NULL),
-- Asus Vivobook
('MH00000021', 'DM00000012',  N'Asus Vivobook X 2023', 15000000, N'24 tháng', NULL),
-- Asus Zenbook
('MH00000022', 'DM00000012',N'Asus Zenbook OLED 2023', 18000000, N'24 tháng', NULL),
-- Asus TUF Gaming
('MH00000023', 'DM00000012',  N'Asus TUF Gaming F15 2023', 20000000, N'24 tháng', NULL),
-- Asus ROG Gaming
('MH00000024', 'DM00000012', N'Asus ROG Strix 2023', 25000000, N'24 tháng', NULL),
-- Acer Aspire
('MH00000025', 'DM00000013',  N'Acer Aspire 5 2023', 13000000, N'18 tháng', NULL),
-- Acer Nitro
('MH00000026', 'DM00000013',  N'Acer Nitro 5 2023', 16000000, N'24 tháng', NULL),
-- Acer Predator
('MH00000027', 'DM00000013', N'Acer Predator Helios 2023', 22000000, N'24 tháng', NULL),
-- Acer Swift
('MH00000028', 'DM00000013', N'Acer Swift 3 2023', 14000000, N'24 tháng', NULL),
-- Lenovo ThinkPad
('MH00000029', 'DM00000014',  N'Lenovo ThinkPad X1 2023', 20000000, N'36 tháng', NULL),
-- Lenovo IdeaPad
('MH00000030', 'DM00000014', N'Lenovo IdeaPad 5 2023', 13000000, N'24 tháng', NULL),
-- Lenovo Legion
('MH00000031', 'DM00000014',  N'Lenovo Legion 5 2023', 18000000, N'24 tháng', NULL),
-- Lenovo Yoga
('MH00000032', 'DM00000014', N'Lenovo Yoga Slim 2023', 17000000, N'24 tháng', NULL),
-- Dell Inspiron
('MH00000033', 'DM00000015', N'Dell Inspiron 15 2023', 14000000, N'24 tháng', NULL),
-- Dell XPS
('MH00000034', 'DM00000015', N'Dell XPS 13 2023', 22000000, N'36 tháng', NULL),
-- Dell Alienware
('MH00000035', 'DM00000015',N'Dell Alienware M15 2023', 30000000, N'36 tháng', NULL),
-- Dell Latitude
('MH00000036', 'DM00000015',  N'Dell Latitude 7420 2023', 19000000, N'24 tháng', NULL);

/*-- Các sản phẩm thuộc danh mục con "Thiết bị văn phòng" --*/
INSERT INTO MatHang (IDMatHang, IDDanhMuc, TenMatHang, DonGia, BaoHanh, TrangThai) VALUES
-- Canon (Thiết bị văn phòng)
('MH00000037', 'DM00000016', N'Máy in Canon LBP2900', 3500000, N'12 tháng', NULL),
-- Brother (Thiết bị văn phòng)
('MH00000038', 'DM00000017',  N'Máy in Brother HL-L2321D', 4000000, N'12 tháng', NULL),
-- Epson (Thiết bị văn phòng)
('MH00000039', 'DM00000018', N'Máy in phun màu Epson L805', 7500000, N'12 tháng', NULL),
-- Xerox (Thiết bị văn phòng)
('MH00000040', 'DM00000019',N'Máy in Xerox Phaser 3020', 4500000, N'12 tháng', NULL),
-- Sony (Máy chiếu)
('MH00000041', 'DM00000020',  N'Máy chiếu Sony VPL-DX220', 15000000, N'24 tháng', NULL),
-- Panasonic (Máy chiếu)
('MH00000042', 'DM00000021',N'Máy chiếu Panasonic PT-VX430', 22000000, N'24 tháng', NULL),
-- Optoma (Máy chiếu)
('MH00000043', 'DM00000022', N'Máy chiếu Optoma HD27e', 18000000, N'24 tháng', NULL),
-- Epson (Máy chiếu)
('MH00000044', 'DM00000023', N'Máy chiếu Epson EB-X41', 14000000, N'24 tháng', NULL),
-- Ricoh (Máy photocopy)
('MH00000045', 'DM00000024', N'Máy photocopy Ricoh MP 2001L', 35000000, N'36 tháng', NULL),
-- Xerox (Máy photocopy)
('MH00000046', 'DM00000025', N'Máy photocopy Xerox WorkCentre 3025', 28000000, N'36 tháng', NULL),
-- Canon (Máy photocopy)
('MH00000047', 'DM00000026',  N'Máy photocopy Canon IR 2004', 30000000, N'36 tháng', NULL),
-- Konica (Máy photocopy)
('MH00000048', 'DM00000027',  N'Máy photocopy Konica Minolta Bizhub 185e', 27000000, N'36 tháng', NULL),
-- Microsoft (Phần mềm máy tính)
('MH00000049', 'DM00000028',N'Phần mềm Microsoft Office 365', 1500000, N'12 tháng', NULL),
-- Adobe (Phần mềm máy tính)
('MH00000050', 'DM00000029', N'Phần mềm Adobe Photoshop CC 2023', 12000000, N'12 tháng', NULL),
-- Kaspersky (Phần mềm máy tính)
('MH00000051', 'DM00000030', N'Phần mềm diệt virus Kaspersky Anti-Virus 2023', 500000, N'12 tháng', NULL),
-- Bitdefender (Phần mềm máy tính)
('MH00000052', 'DM00000031', N'Phần mềm diệt virus Bitdefender Total Security 2023', 700000, N'12 tháng', NULL);
go

-- Các sản phẩm thuộc danh mục con "Linh kiện máy tính"
INSERT INTO MatHang (IDMatHang, IDDanhMuc, TenMatHang, DonGia, BaoHanh, TrangThai) VALUES
('MH00000053', 'DM00000032',  N'Dell G15 Gaming', 28000000, N'12 tháng', NULL),
('MH00000054', 'DM00000033',  N'Asus ROG Strix G15', 32000000, N'24 tháng', NULL),
('MH00000055', 'DM00000034',  N'LG OLED48C1', 42000000, N'36 tháng', NULL),
('MH00000056', 'DM00000035', N'Samsung QLED Q80T', 40000000, N'36 tháng', NULL),
('MH00000057', 'DM00000036',N'Alienware Aurora R10', 45000000, N'24 tháng', NULL),
('MH00000058', 'DM00000037', N'Dell Precision 7550', 65000000, N'36 tháng', NULL),
('MH00000059', 'DM00000038', N'Intel NUC 11', 15000000, N'12 tháng', NULL),
('MH00000060', 'DM00000039', N'HP All-in-One 24', 22000000, N'24 tháng', NULL),
('MH00000061', 'DM00000040', N'Dell PowerEdge T40', 30000000, N'36 tháng', NULL),
('MH00000062', 'DM00000041',  N'Dell UltraSharp U2720Q', 18000000, N'12 tháng', NULL),
('MH00000063', 'DM00000042',  N'Asus ROG Swift PG259QN', 23000000, N'24 tháng', NULL),
('MH00000064', 'DM00000043', N'Sony A8H OLED', 40000000, N'36 tháng', NULL),
('MH00000065', 'DM00000044', N'Samsung QLED Q80T', 55000000, N'36 tháng', NULL),
('MH00000066', 'DM00000045', N'LG Plasma 55PV450', 28000000, N'24 tháng', NULL);
go

INSERT INTO MatHang (IDMatHang, IDDanhMuc, TenMatHang, DonGia, BaoHanh, TrangThai) VALUES
('MH00000067', 'DM00000064', N'Lenovo Legion Y7000P 2024 (Core i7-14650HX, 16GB, 1TB,RTX 4050 6GB, 16'' 2K+ 165Hz)', '29490000', N'12 tháng', NULL);
go

INSERT INTO AnhMatHang (IDAnhMatHang, IDMatHang, DuongDan, ThuTu) values
('AMH0000068', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.1.jpg', 1),
('AMH0000069', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.2.jpg', 2),
('AMH0000070', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.3.jpg', 3),
('AMH0000071', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.4.jpg', 4),
('AMH0000072', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.5.jpg', 5),
('AMH0000073', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.6.jpg', 6),
('AMH0000074', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.7.jpg', 7),
('AMH0000075', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.8.jpg', 8),
('AMH0000076', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.9.jpg', 9),
('AMH0000077', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.10.jpg', 10),
('AMH0000078', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.11.jpg', 11),
('AMH0000079', 'MH00000067', 'Lenovo_Legion_Y7000P_2024.12.jpg', 12);

INSERT INTO ThongSoKyThuat (IDThongSo, IDMatHang, TenThongSo, GiaTriThongSo) VALUES
('TS00000042', 'MH00000067', N'CPU', N'Intel® Core™ i7-13620H Processor 2.4 GHz (24M Cache, up to 4.9 GHz, 10 cores: 6 P-cores and 4 E-cores)'),
('TS00000043', 'MH00000067', N'RAM', N'16GB (1x16GB) DDR5 4800MHz (2x SO-DIMM socket, up to 32GB SDRAM)'),
('TS00000044', 'MH00000067', N'Ổ cứng', N'1TB PCIe® 4.0 NVMe™ M.2 SSD (Còn trống 1 khe SSD M.2 PCIE)'),
('TS00000045', 'MH00000067', N'Card đồ họa', N'NVIDIA® GeForce RTX™ 4060 8GB GDDR6, Up to 2420MHz* at 140W (2370MHz Boost Clock+50MHz OC, 115W+25W Dynamic Boost)'),
('TS00000046', 'MH00000067', N'Màn hình', N'15.6" FHD (1920 x 1080) IPS, 144Hz, Wide View, 250nits, Narrow Bezel, Non-Glare with 72% NTSC, 100% sRGB, 75.35% Adobe RGB, G-Sync'),
('TS00000047', 'MH00000067', N'Cổng giao tiếp', N'1x Thunderbolt™ 4 support DisplayPort™\n1x USB 3.2 Gen 2 Type-C support DisplayPort™ / power delivery / G-SYNC\n2x USB 3.2 Gen 1 Type-A\n1x RJ45 LAN port\n1x HDMI 2.1 FRL\n1x 3.5mm Combo Audio Jack'),
('TS00000048', 'MH00000067', N'Audio', N'2-speaker system, Dolby Atmos'),
('TS00000049', 'MH00000067', N'Bàn phím', N'Backlit Chiclet Keyboard RGB'),
('TS00000050', 'MH00000067', N'Chuẩn LAN', N'10/100/1000/Gigabits Base T'),
('TS00000051', 'MH00000067', N'Chuẩn WIFI', N'802.11AX (2X2)'),
('TS00000052', 'MH00000067', N'Bluetooth', N'v5.2'),
('TS00000053', 'MH00000067', N'Webcam', N'HD 720p'),
('TS00000054', 'MH00000067', N'Hệ điều hành', N'Windows 11 Home'),
('TS00000055', 'MH00000067', N'Pin', N'4 Cell 90WHr'),
('TS00000056', 'MH00000067', N'Trọng lượng', N'2.2 kg'),
('TS00000057', 'MH00000067', N'Màu sắc', N'Jaeger Gray'),
('TS00000058', 'MH00000067', N'Kích thước', N'35.4 x 25.1 x 2.24 ~ 2.49 cm');
go


-- Ảnh cho Macbook Air M2 2023
INSERT INTO AnhMatHang (IDAnhMatHang, IDMatHang, DuongDan, ThuTu) VALUES
('AMH0000001', 'MH00000017', 'macbook_air_m2_2023_1.png', 1),
('AMH0000002', 'MH00000017', 'macbook_air_m2_2023_2.png', 2),
('AMH0000003', 'MH00000017', 'macbook_air_m2_2023_3.png', 3),
('AMH0000004', 'MH00000017', 'macbook_air_m2_2023_4.png', 4),
('AMH0000005', 'MH00000017', 'macbook_air_m2_2023_5.png', 5),
('AMH0000006', 'MH00000017', 'macbook_air_m2_2023_6.png', 6),
('AMH0000007', 'MH00000017', 'macbook_air_m2_2023_7.png', 7),
('AMH0000008', 'MH00000017', 'macbook_air_m2_2023_8.png', 8),
('AMH0000009', 'MH00000017', 'macbook_air_m2_2023_9.png', 9),
('AMH0000010', 'MH00000017', 'macbook_air_m2_2023_10.png',10);

-- Ảnh cho Macbook Pro M1 2022
INSERT INTO AnhMatHang (IDAnhMatHang, IDMatHang, DuongDan, ThuTu) VALUES
('AMH0000011', 'MH00000018', 'macbook_pro_m1_2022_1.png', 1),
('AMH0000012', 'MH00000018', 'macbook_pro_m1_2022_2.png', 2),
('AMH0000013', 'MH00000018', 'macbook_pro_m1_2022_3.png', 3),
('AMH0000014', 'MH00000018', 'macbook_pro_m1_2022_4.png', 4),
('AMH0000015', 'MH00000018', 'macbook_pro_m1_2022_5.png', 5),
('AMH0000016', 'MH00000018', 'macbook_pro_m1_2022_6.png', 6),
('AMH0000017', 'MH00000018', 'macbook_pro_m1_2022_7.png', 7),
('AMH0000018', 'MH00000018', 'macbook_pro_m1_2022_8.png', 8),
('AMH0000019', 'MH00000018', 'macbook_pro_m1_2022_9.png', 9),
('AMH0000020', 'MH00000018', 'macbook_pro_m1_2022_10.png',10);

-- Các sản phẩm khác
INSERT INTO AnhMatHang (IDAnhMatHang, IDMatHang, DuongDan, ThuTu) VALUES
('AMH0000021', 'MH00000019', 'mac_mini_2023.jpg', 1),
('AMH0000022', 'MH00000020', 'imac_2023.jpg', 1),
('AMH0000023', 'MH00000021', 'asus_vivobook_x_2023.jpg', 1),
('AMH0000024', 'MH00000022', 'asus_zenbook_oled_2023.jpg', 1),
('AMH0000025', 'MH00000024', 'asus_rog_strix_2023.jpg', 1),
('AMH0000026', 'MH00000025', 'acer_aspire_5_2023.jpg', 1),
('AMH0000027', 'MH00000026', 'acer_nitro_5_2023.jpg', 1),
('AMH0000028', 'MH00000027', 'acer_predator_helios_2023.jpg', 1),
('AMH0000029', 'MH00000028', 'acer_swift_3_2023.jpg', 1),
('AMH0000030', 'MH00000029', 'lenovo_thinkpad_x1_2023.jpg', 1),
('AMH0000031', 'MH00000030', 'lenovo_ideapad_5_2023.jpg', 1),
('AMH0000032', 'MH00000031', 'lenovo_legion_5_2023.jpg', 1),
('AMH0000033', 'MH00000032', 'lenovo_yoga_slim_2023.jpg', 1),
('AMH0000034', 'MH00000033', 'dell_inspiron_15_2023.jpg', 1),
('AMH0000035', 'MH00000034', 'dell_xps_13_2023.jpg', 1),
('AMH0000036', 'MH00000035', 'dell_alienware_m15_2023.jpg', 1),
('AMH0000037', 'MH00000036', 'dell_latitude_7420_2023.jpg', 1),
('AMH0000038', 'MH00000037', 'canon_lbp2900.jpg', 1),
('AMH0000039', 'MH00000038', 'brother_hl_l2321d.jpg', 1),
('AMH0000040', 'MH00000039', 'epson_l805.jpg', 1);

INSERT INTO AnhMatHang (IDAnhMatHang, IDMatHang, DuongDan, ThuTu) VALUES
('AMH0000041', 'MH00000040', 'xerox_phaser_3020.jpg', 1),
('AMH0000042', 'MH00000041', 'sony_vpl_dx220.jpg', 1),
('AMH0000043', 'MH00000042', 'panasonic_pt_vx430.jpg', 1),
('AMH0000044', 'MH00000043', 'optoma_hd27e.jpg', 1),
('AMH0000045', 'MH00000044', 'epson_eb_x41.jpg', 1),
('AMH0000046', 'MH00000045', 'ricoh_mp_2001l.jpg', 1),
('AMH0000047', 'MH00000046', 'xerox_workcentre_3025.jpg', 1),
('AMH0000048', 'MH00000047', 'canon_ir_2004.jpg', 1),
('AMH0000049', 'MH00000048', 'konica_minolta_bizhub_185e.jpg', 1),
('AMH0000050', 'MH00000049', 'microsoft_office_365.jpg', 1),
('AMH0000051', 'MH00000050', 'adobe_photoshop_cc_2023.jpg', 1),
('AMH0000052', 'MH00000051', 'kaspersky_anti_virus_2023.jpg', 1),
('AMH0000053', 'MH00000052', 'bitdefender_total_security_2023.jpg', 1);

INSERT INTO AnhMatHang (IDAnhMatHang, IDMatHang, DuongDan, ThuTu) VALUES
('AMH0000054', 'MH00000053', 'dell_g15_gaming.jpg', 1),
('AMH0000055', 'MH00000054', 'asus_rog_strix_g15.jpg', 1),
('AMH0000056', 'MH00000055', 'lg_oled48c1.jpg', 1),
('AMH0000057', 'MH00000056', 'samsung_qled_q80t.jpg', 1),
('AMH0000058', 'MH00000057', 'alienware_aurora_r10.jpg', 1),
('AMH0000059', 'MH00000058', 'dell_precision_7550.jpg', 1),
('AMH0000060', 'MH00000059', 'intel_nuc_11.jpg', 1),
('AMH0000061', 'MH00000060', 'hp_all_in_one_24.jpg', 1),
('AMH0000062', 'MH00000061', 'dell_poweredge_t40.jpg', 1),
('AMH0000063', 'MH00000062', 'dell_ultrasharp_u2720q.jpg', 1),
('AMH0000064', 'MH00000063', 'asus_rog_swift_pg259qn.jpg', 1),
('AMH0000065', 'MH00000064', 'sony_a8h_oled.jpg', 1),
('AMH0000066', 'MH00000065', 'samsung_qled_q80t_2.jpg', 1),
('AMH0000067', 'MH00000066', 'lg_plasma_55pv450.jpg', 1);



INSERT INTO ThongSoKyThuat (IDThongSo, IDMatHang, TenThongSo, GiaTriThongSo) VALUES
('TS00000001', 'MH00000023', N'CPU', N'Intel® Core™ i7-13620H Processor 2.4 GHz (24M Cache, up to 4.9 GHz, 10 cores: 6 P-cores and 4 E-cores)'),
('TS00000002', 'MH00000023', N'RAM', N'16GB (1x16GB) DDR5 4800MHz (2x SO-DIMM socket, up to 32GB SDRAM)'),
('TS00000003', 'MH00000023', N'Ổ cứng', N'1TB PCIe® 4.0 NVMe™ M.2 SSD (Còn trống 1 khe SSD M.2 PCIE)'),
('TS00000004', 'MH00000023', N'Card đồ họa', N'NVIDIA® GeForce RTX™ 4060 8GB GDDR6, Up to 2420MHz* at 140W (2370MHz Boost Clock+50MHz OC, 115W+25W Dynamic Boost)'),
('TS00000005', 'MH00000023', N'Màn hình', N'15.6" FHD (1920 x 1080) IPS, 144Hz, Wide View, 250nits, Narrow Bezel, Non-Glare with 72% NTSC, 100% sRGB, 75.35% Adobe RGB, G-Sync'),
('TS00000006', 'MH00000023', N'Cổng giao tiếp', N'1x Thunderbolt™ 4 support DisplayPort™\n1x USB 3.2 Gen 2 Type-C support DisplayPort™ / power delivery / G-SYNC\n2x USB 3.2 Gen 1 Type-A\n1x RJ45 LAN port\n1x HDMI 2.1 FRL\n1x 3.5mm Combo Audio Jack'),
('TS00000007', 'MH00000023', N'Audio', N'2-speaker system, Dolby Atmos'),
('TS00000008', 'MH00000023', N'Bàn phím', N'Backlit Chiclet Keyboard RGB'),
('TS00000009', 'MH00000023', N'Chuẩn LAN', N'10/100/1000/Gigabits Base T'),
('TS00000010', 'MH00000023', N'Chuẩn WIFI', N'802.11AX (2X2)'),
('TS00000011', 'MH00000023', N'Bluetooth', N'v5.2'),
('TS00000012', 'MH00000023', N'Webcam', N'HD 720p'),
('TS00000013', 'MH00000023', N'Hệ điều hành', N'Windows 11 Home'),
('TS00000014', 'MH00000023', N'Pin', N'4 Cell 90WHr'),
('TS00000015', 'MH00000023', N'Trọng lượng', N'2.2 kg'),
('TS00000016', 'MH00000023', N'Màu sắc', N'Jaeger Gray'),
('TS00000017', 'MH00000023', N'Kích thước', N'35.4 x 25.1 x 2.24 ~ 2.49 cm');
go

INSERT INTO ThongSoKyThuat (IDThongSo, IDMatHang, TenThongSo, GiaTriThongSo) VALUES
('TS00000018', 'MH00000017', N'CPU', N'Apple M2 chip with 8-core CPU and 8-core GPU'),
('TS00000019', 'MH00000017', N'RAM', N'8GB unified memory'),
('TS00000020', 'MH00000017', N'Ổ cứng', N'256GB SSD'),
('TS00000021', 'MH00000017', N'Màn hình', N'13.6" Liquid Retina display with True Tone'),
('TS00000022', 'MH00000017', N'Cổng giao tiếp', N'Two Thunderbolt/USB 4 ports'),
('TS00000023', 'MH00000017', N'Camera', N'1080p FaceTime HD camera'),
('TS00000024', 'MH00000017', N'Audio', N'Four-speaker sound system with Spatial Audio'),
('TS00000025', 'MH00000017', N'Bàn phím', N'Magic Keyboard with Touch ID'),
('TS00000026', 'MH00000017', N'Chuẩn WIFI', N'802.11ax Wi-Fi 6'),
('TS00000027', 'MH00000017', N'Bluetooth', N'v5.0'),
('TS00000028', 'MH00000017', N'Pin', N'Up to 18 hours of battery life'),
('TS00000029', 'MH00000017', N'Màu sắc', N'Space Gray, Silver, Midnight, Starlight');
go

INSERT INTO ThongSoKyThuat (IDThongSo, IDMatHang, TenThongSo, GiaTriThongSo) VALUES
('TS00000030', 'MH00000018', N'CPU', N'Apple M1 chip with 8-core CPU and 8-core GPU'),
('TS00000031', 'MH00000018', N'RAM', N'8GB unified memory'),
('TS00000032', 'MH00000018', N'Ổ cứng', N'256GB SSD'),
('TS00000033', 'MH00000018', N'Màn hình', N'13.3" Retina display with True Tone'),
('TS00000034', 'MH00000018', N'Cổng giao tiếp', N'Two Thunderbolt/USB 4 ports'),
('TS00000035', 'MH00000018', N'Camera', N'720p FaceTime HD camera'),
('TS00000036', 'MH00000018', N'Audio', N'Stereo speakers with high dynamic range'),
('TS00000037', 'MH00000018', N'Bàn phím', N'Magic Keyboard with Touch Bar and Touch ID'),
('TS00000038', 'MH00000018', N'Chuẩn WIFI', N'802.11ax Wi-Fi 6'),
('TS00000039', 'MH00000018', N'Bluetooth', N'v5.0'),
('TS00000040', 'MH00000018', N'Pin', N'Up to 20 hours of battery life'),
('TS00000041', 'MH00000018', N'Màu sắc', N'Space Gray, Silver');
go

-- Bảng người dùng
insert into NguoiDung (IDNguoiDung, HinhAnh, TenNguoiDung, SoDienThoai, Email, MatKhau, VaiTro) values
('ND00000000','hieu.jpg', N'Lương Công Hiếu', 0123912811, 'Hieuluong@gmail.com','123', N'Quản trị viên'),
('ND00000001','Minh.jpg', N'Lý Văn Minh', 0282431812, 'LyMinh@gmail.com', '123', N'Khách hàng'),
('ND00000002','Quynh.jpg', N'Đỗ Thị Quỳnh', 0182123813, 'Quynh@gmail.com','456', N'Khách hàng'),
('ND00000003','Xuan.jpg', N'Đỗ Thị Xuân', 0431912814, 'DoXuan@gmail.com','p789', N'Khách hàng'),
('ND00000004','PLinh.jpg', N'Nguyễn Phương Linh', 0212912815, 'PLinh@gmail.com','abc123', N'Khách hàng'),
('ND00000005','DLinh.jpg', N'Bùi Diệu Linh', 02812912816, 'DieuLinh@gmail.com', 'xyz123', N'Khách hàng'),
('ND00000006', 'Truong.jpg' , N'Đinh Thiên Trường', 0281912817, 'Truong@gmail.com','qwe123', N'Khách hàng'),
('ND00000007','TrangDinh.jpg', N'Đinh Thị Huyển Trang', 04932912528, 'TrangDinh@gmail.com','ert123', N'Khách hàng'),
('ND00000008','Quan.jpg', N'Đào Anh Quân', 0182412819, 'Quan@gmail.com','yui123', N'Khách hàng'),
('ND00000009','HieuNguyen.jpg', N'Nguyễn Văn Hiếu', 0182831242, 'HieuNguyen@gmail.com', 'poi123', N'Khách hàng'),
('ND00000010','TrangNguyen.jpg', N'Nguyễn Thị Huyền Trang', 0181441242, 'Trang@gmail.com','3123', N'Khách hàng');
go

-- Bảng nhà cung
insert into NhaCungCap (IDNhaCungCap, TenNhaCungCap, Email, SoDienThoai, DiaChi) values
('NCC0000001', N'TPCOM', 'contact@tpcom.vn', 012345679, N'123 Đường Nguyễn Thị Minh Khai, Quận 1, TP.HCM'),
('NCC0000002', N'Phuc Thanh', 'info@phucthanh.com', 0987654321, N'456 Đường Lê Lợi, Quận 1, TP.HCM'),
('NCC0000003', N'DigiMart', 'support@digimart.vn', 0234567890, N'789 Đường Lê Văn Sỹ, Quận 3, TP.HCM'),
('NCC0000004', N'An Phát', 'sales@anphat.com.vn', 0345678901, N'101 Đường Võ Văn Tần, Quận 3, TP.HCM'),
('NCC0000005', N'Viettech', 'contact@viettech.vn', 0456789012, N'102 Đường Trần Hưng Đạo, Quận 5, TP.HCM'),
('NCC0000006', N'Nguyên Phát', 'info@nguyenphat.com', 0567890123, N'202 Đường Nguyễn Hữu Cảnh, Quận Bình Thạnh, TP.HCM'),
('NCC0000007', N'Smart Solutions', 'sales@smartsolutions.vn', 0678901234, N'303 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM'),
('NCC0000008', N'GameZone', 'contact@gamezone.vn', 0789012345, N'404 Đường Đinh Tiên Hoàng, Quận Bình Thạnh, TP.HCM'),
('NCC0000009', N'Office Supplies', 'support@officesupplies.vn', 0890123456, N'505 Đường Huỳnh Thúc Kháng, Quận 1, TP.HCM'),
('NCC0000010', N'TechPro', 'info@techpro.vn', 0901234567, N'606 Đường Nguyễn Thái Học, Quận 1, TP.HCM'),
('NCC0000011', N'GigaCom', 'contact@gigacom.vn', 0912345678, N'707 Đường Hoàng Văn Thụ, Hà Nội'),
('NCC0000012', N'Tin Học Huy Hoàng', 'info@huyhoang.com.vn', 0823456789, N'808 Đường Phạm Văn Đồng, Đà Nẵng'),
('NCC0000013', N'VietNamTech', 'support@vietnamtech.vn', 0734567890, N'909 Đường 2/9, Đà Nẵng'),
('NCC0000014', N'Thế Giới Di Động', 'sales@thegioididong.com', 0645678901, N'100 Đường Lê Duẩn, Huế'),
('NCC0000015', N'ABC Computer', 'contact@abccomputer.vn', 0556789012, N'200 Đường Trần Hưng Đạo, Cần Thơ');
go

-- Bảng đơn nhập
insert into HoaDonNhap (IDDonNhap, IDNhaCungCap, NgayNhap, TrangThai, GhiChu, TongTien) values
('HDN0000001', 'NCC0000001', '2024-01-15', N'Đã giao', N'Nhập hàng tháng 1',0),
('HDN0000002', 'NCC0000002', '2024-01-20', N'Chờ xác nhận', N'Nhập hàng tháng 1',0),
('HDN0000003', 'NCC0000003', '2024-02-05', N'Đã giao', N'Nhập hàng tháng 2',0),
('HDN0000004', 'NCC0000004', '2024-02-10', N'Đã giao', N'Nhập hàng tháng 2',0),
('HDN0000005', 'NCC0000005', '2024-03-01', N'Chờ xác nhận', N'Nhập hàng tháng 3',0),
('HDN0000006', 'NCC0000006', '2024-03-05', N'Trả hàng', N'Nhập hàng tháng 3',0),
('HDN0000007', 'NCC0000007', '2024-04-01', N'Đã huỷ', N'Nhập hàng tháng 4',0),
('HDN0000008', 'NCC0000008', '2024-04-10', N'Chờ xác nhận', N'Nhập hàng tháng 4',0),
('HDN0000009', 'NCC0000009', '2024-05-01', N'Đã giao', N'Nhập hàng tháng 5',0),
('HDN0000010', 'NCC0000010', '2024-05-15', N'Chờ xác nhận', N'Nhập hàng tháng 5',0);
go

-- Bảng chi tiết đơn nhập
insert into ChiTietDonNhap (IDChiTietDonNhap, IDDonNhap, IDMatHang, SoLuong, GiaNhap) values
('CTN0000001', 'HDN0000001', 'MH00000021', 10, 500000),
('CTN0000002', 'HDN0000001', 'MH00000059', 5, 300000),
('CTN0000003', 'HDN0000002', 'MH00000032', 8, 700000),
('CTN0000004', 'HDN0000002', 'MH00000023', 12, 450000),
('CTN0000005', 'HDN0000003', 'MH00000053', 6, 250000),
('CTN0000006', 'HDN0000004', 'MH00000055', 15, 350000),
('CTN0000007', 'HDN0000005', 'MH00000050', 9, 800000),
('CTN0000008', 'HDN0000006', 'MH00000043', 4, 600000),
('CTN0000009', 'HDN0000007', 'MH00000044', 11, 900000),
('CTN0000010', 'HDN0000008', 'MH00000063', 7, 1200000);
go

-- Bảng đơn bán
insert into HoaDonBan (IDDonBan, IDNguoiDung, IDGiamGia,  NgayBan, TrangThai, GhiChu, TongTien) values
('DB00000001', 'ND00000001',null,  '2024-10-01', N'Chờ xác nhận', N'Đơn hàng đầu tiên',0),
('DB00000002', 'ND00000002','GG19283740', '2024-10-02', N'Chờ lấy hàng', N'Khách hàng đã thanh toán',0),
('DB00000003', 'ND00000003','GG84920380', '2024-10-03', N'Đang vận chuyển', N'Đang trên đường giao hàng',0),
('DB00000004', 'ND00000004', 'GG10293840', '2024-10-04', N'Trả hàng', N'Khách hàng đã yêu cầu trả hàng',0),
('DB00000005', 'ND00000005', 'GG10293840', '2024-10-05', N'Đã giao', N'Đơn hàng đã được giao thành công',0),
('DB00000006', 'ND00000006', null, '2024-10-06', N'Chờ xác nhận', N'Chờ xác nhận từ người bán',0),
('DB00000007', 'ND00000007','GG20394850', '2024-10-07', N'Chờ lấy hàng', N'Khách hàng đã sẵn sàng lấy hàng',0),
('DB00000008', 'ND00000008','GG38492010', '2024-10-08', N'Đang vận chuyển', N'Vận chuyển đang trong quá trình',0),
('DB00000009', 'ND00000009','GG48291020', '2024-10-09', N'Đã giao', N'Đơn hàng đã được nhận',0),
('DB00000010', 'ND00000009', 'GG49502390','2024-10-10', N'Đã huỷ', N'Khách hàng đã hủy đơn hàng',0),
('DB00000011', 'ND00000005', null,'2024-10-10', N'Yêu cầu huỷ hàng', N'Không còn nhu cầu mua',0),
('DB00000012', 'ND00000006', 'GG49502390','2024-10-10', N'Yêu cầu huỷ hàng', N'Muốn mua thêm',0),
('DB00000013', 'ND00000002', 'GG49502390','2024-10-10', N'Yêu cầu huỷ hàng', N'Không thích',0);
go

-- Bảng chi tiết đơn bán
insert into ChiTietDonBan (IDChiTietDonBan, IDDonBan, IDMatHang, SoLuong, GiaBan) values
('CTDB000001', 'DB00000001', 'MH00000018', 1, 32000000),
('CTDB000002', 'DB00000001', 'MH00000042', 2, 12000000),
('CTDB000003', 'DB00000002', 'MH00000051', 3, 4500000),
('CTDB000004', 'DB00000003', 'MH00000043',1, 22000000),
('CTDB000005', 'DB00000003', 'MH00000062',2, 18000000),
('CTDB000006', 'DB00000004', 'MH00000040',5, 32000000),
('CTDB000007', 'DB00000005', 'MH00000019', 1, 300000),
('CTDB000008', 'DB00000006', 'MH00000054',3, 800000),
('CTDB000009', 'DB00000007', 'MH00000024', 2, 1000000),
('CTDB000010', 'DB00000008', 'MH00000056', 4, 1500000);
go

-- Chèn dữ liệu vào bảng DanhGia
INSERT INTO DanhGia (IDDanhGia, IDMatHang, IDNguoiDung, SoSao, NoiDung,  ThoiGianDanhGia) VALUES
-- Đánh giá cho Macbook Air
('DG00000001', 'MH00000017', 'ND00000001', 5, N'Rất hài lòng với hiệu năng của máy.', GETDATE()),
-- Đánh giá cho Macbook Pro
('DG00000002', 'MH00000018', 'ND00000002', 4, N'Màn hình đẹp, rất ấn tượng.', GETDATE()),
-- Đánh giá cho Mac Mini
('DG00000003', 'MH00000019', 'ND00000003', 4, N'Máy chạy ổn định, rất thích.', GETDATE()),
-- Đánh giá cho iMac
('DG00000004', 'MH00000020', 'ND00000004', 5, N'Thiết kế đẹp, phù hợp với công việc thiết kế.', GETDATE()),
-- Đánh giá cho Asus Vivobook
('DG00000005', 'MH00000021', 'ND00000005', 4, N'Hiệu năng tốt trong tầm giá.', GETDATE()),
-- Đánh giá cho Asus Zenbook
('DG00000006', 'MH00000022', 'ND00000006', 4, N'Máy nhẹ, mỏng và di động.',  GETDATE()),
-- Đánh giá cho Asus TUF Gaming
('DG00000007', 'MH00000023', 'ND00000007', 5, N'Tuyệt vời cho game thủ.', GETDATE()),
-- Đánh giá cho Asus ROG Gaming
('DG00000008', 'MH00000024', 'ND00000008', 5, N'Máy có cấu hình cao, chơi game mượt mà.', GETDATE()),
-- Đánh giá cho Acer Aspire
('DG00000009', 'MH00000025', 'ND00000009', 4, N'Tốt cho công việc văn phòng.',  GETDATE()),
-- Đánh giá cho Acer Nitro
('DG00000010', 'MH00000026', 'ND00000010', 3, N'Chơi game tốt, nhưng hơi nóng.', GETDATE()),
-- Đánh giá cho Acer Predator
('DG00000011', 'MH00000027', 'ND00000002', 5, N'Chất lượng gaming tuyệt vời.',GETDATE()),
-- Đánh giá cho Acer Swift
('DG00000012', 'MH00000028', 'ND00000001', 4, N'Máy mỏng nhẹ và nhanh chóng.',  GETDATE()),
-- Đánh giá cho Lenovo ThinkPad
('DG00000013', 'MH00000029', 'ND00000009', 5, N'Tuyệt vời cho công việc doanh nhân.', GETDATE()),
-- Đánh giá cho Lenovo IdeaPad
('DG00000014', 'MH00000030', 'ND00000009', 4, N'Thích hợp cho học sinh sinh viên.',GETDATE()),
-- Đánh giá cho Lenovo Legion
('DG00000015', 'MH00000031', 'ND00000002', 5, N'Chơi game cực chất.',  GETDATE()),
-- Đánh giá cho Lenovo Yoga
('DG00000016', 'MH00000032', 'ND00000010', 4, N'Màn hình cảm ứng rất nhạy.',GETDATE()),
-- Đánh giá cho Dell Inspiron
('DG00000017', 'MH00000033', 'ND00000010', 4, N'Tốt cho văn phòng, giá hợp lý.',  GETDATE()),
-- Đánh giá cho Dell XPS
('DG00000018', 'MH00000034', 'ND00000004', 5, N'Máy chạy nhanh, thiết kế đẹp.', GETDATE()),
-- Đánh giá cho Dell Alienware
('DG00000019', 'MH00000035', 'ND00000004', 5, N'Chất lượng gaming hàng đầu.',  GETDATE()),
-- Đánh giá cho Dell Latitude
('DG00000020', 'MH00000036', 'ND00000008', 4, N'Máy nhẹ, hiệu năng tốt.',  GETDATE()),
-- Đánh giá cho máy in Canon
('DG00000021', 'MH00000037', 'ND00000008', 4, N'Máy in rất ổn, giá tốt.',  GETDATE()),
-- Đánh giá cho máy in Brother
('DG00000022', 'MH00000038', 'ND00000005', 4, N'Chất lượng in tốt.',  GETDATE()),
-- Đánh giá cho máy in Epson
('DG00000023', 'MH00000039', 'ND00000002', 5, N'Máy in phun màu tuyệt đẹp.', GETDATE()),
-- Đánh giá cho máy in Xerox
('DG00000024', 'MH00000040', 'ND00000003', 4, N'Máy in bền bỉ, chất lượng tốt.',GETDATE()),
-- Đánh giá cho máy chiếu Sony
('DG00000025', 'MH00000041', 'ND00000003', 5, N'Độ phân giải tuyệt vời, hình ảnh sắc nét.', GETDATE()),
-- Đánh giá cho máy chiếu Panasonic
('DG00000026', 'MH00000042', 'ND00000007', 4, N'Dễ sử dụng, hình ảnh rõ nét.',  GETDATE()),
-- Đánh giá cho máy chiếu Optoma
('DG00000027', 'MH00000043', 'ND00000001', 5, N'Chất lượng hình ảnh xuất sắc.', GETDATE()),
-- Đánh giá cho máy chiếu Epson
('DG00000028', 'MH00000044', 'ND00000009', 4, N'Máy chiếu tốt trong tầm giá.', GETDATE()),
-- Đánh giá cho máy photocopy Ricoh
('DG00000029', 'MH00000045', 'ND00000002', 5, N'Máy photocopy nhanh, chất lượng cao.',  GETDATE()),
-- Đánh giá cho máy photocopy Xerox
('DG00000030', 'MH00000046', 'ND00000001', 4, N'Phù hợp với văn phòng nhỏ.', GETDATE()),
-- Đánh giá cho máy photocopy Canon
('DG00000031', 'MH00000047', 'ND00000006', 4, N'Máy photocopy bền bỉ.', GETDATE()),
-- Đánh giá cho máy photocopy Konica
('DG00000032', 'MH00000048', 'ND00000002', 5, N'Chất lượng tốt, đáng đồng tiền.', GETDATE()),
-- Đánh giá cho phần mềm Microsoft
('DG00000033', 'MH00000049', 'ND00000001', 5, N'Phần mềm rất hữu ích.', GETDATE()),
-- Đánh giá cho phần mềm Adobe
('DG00000034', 'MH00000050', 'ND00000005', 5, N'Chất lượng tuyệt vời cho chỉnh sửa ảnh.', GETDATE()),
-- Đánh giá cho phần mềm Kaspersky
('DG00000035', 'MH00000051', 'ND00000007', 4, N'Chống virus tốt, dễ sử dụng.', GETDATE()),
-- Đánh giá cho phần mềm Bitdefender
('DG00000036', 'MH00000052', 'ND00000006', 5, N'Phần mềm bảo mật rất hiệu quả.', GETDATE()),
-- Đánh giá cho Dell G15 Gaming
('DG00000037', 'MH00000053', 'ND00000006', 4, N'Máy chơi game tốt với giá hợp lý.', GETDATE()),
-- Đánh giá cho Asus ROG Strix G15
('DG00000038', 'MH00000054', 'ND00000008', 5, N'Chất lượng hình ảnh và âm thanh tuyệt vời.',GETDATE()),
-- Đánh giá cho màn hình LG OLED48C1
('DG00000039', 'MH00000055', 'ND00000009', 5, N'Màn hình đẹp, hiển thị màu sắc chính xác.', GETDATE()),
-- Đánh giá cho màn hình Samsung QLED Q80T
('DG00000040', 'MH00000056', 'ND00000010', 5, N'Màn hình lớn, chất lượng tuyệt vời.', GETDATE());
go

--Bảng Kho 
insert into Kho (IDKho, IDMatHang, SoLuong, NgayCapNhat) values
('KHO0000001', 'MH00000017', 10, '2024-10-31'),
('KHO0000002', 'MH00000018', 5, '2024-10-31'),
('KHO0000003', 'MH00000019', 20, '2024-10-31'),
('KHO0000004', 'MH00000020', 15, '2024-10-31'),
('KHO0000005', 'MH00000021', 8, '2024-10-31'),
('KHO0000006', 'MH00000022', 12, '2024-10-31'),
('KHO0000007', 'MH00000023', 6, '2024-10-31'),
('KHO0000008', 'MH00000024', 9, '2024-10-31'),
('KHO0000009', 'MH00000025', 11, '2024-10-31'),
('KHO0000010', 'MH00000026', 14, '2024-10-31'),
('KHO0000011', 'MH00000027', 4, '2024-10-31'),
('KHO0000012', 'MH00000028', 7, '2024-10-31'),
('KHO0000013', 'MH00000029', 13, '2024-10-31'),
('KHO0000014', 'MH00000030', 3, '2024-10-31'),
('KHO0000015', 'MH00000031', 17, '2024-10-31'),
('KHO0000016', 'MH00000032', 19, '2024-10-31'),
('KHO0000017', 'MH00000033', 2, '2024-10-31'),
('KHO0000018', 'MH00000034', 1, '2024-10-31'),
('KHO0000019', 'MH00000035', 22, '2024-10-31'),
('KHO0000020', 'MH00000036', 16, '2024-10-31'),
('KHO0000021', 'MH00000037', 10, '2024-10-31'),
('KHO0000022', 'MH00000038', 5, '2024-10-31'),
('KHO0000023', 'MH00000039', 20, '2024-10-31'),
('KHO0000024', 'MH00000040', 15, '2024-10-31'),
('KHO0000025', 'MH00000041', 8, '2024-10-31'),
('KHO0000026', 'MH00000042', 12, '2024-10-31'),
('KHO0000027', 'MH00000043', 6, '2024-10-31'),
('KHO0000028', 'MH00000044', 9, '2024-10-31'),
('KHO0000029', 'MH00000045', 11, '2024-10-31'),
('KHO0000030', 'MH00000046', 14, '2024-10-31'),
('KHO0000031', 'MH00000047', 4, '2024-10-31'),
('KHO0000032', 'MH00000048', 7, '2024-10-31'),
('KHO0000033', 'MH00000049', 13, '2024-10-31'),
('KHO0000034', 'MH00000050', 3, '2024-10-31'),
('KHO0000035', 'MH00000051', 17, '2024-10-31'),
('KHO0000036', 'MH00000052', 19, '2024-10-31'),
('KHO0000037', 'MH00000053', 10, '2024-10-31'),
('KHO0000038', 'MH00000054', 5, '2024-10-31'),
('KHO0000039', 'MH00000055', 20, '2024-10-31'),
('KHO0000040', 'MH00000056', 15, '2024-10-31'),
('KHO0000041', 'MH00000057', 8, '2024-10-31'),
('KHO0000042', 'MH00000058', 12, '2024-10-31'),
('KHO0000043', 'MH00000059', 6, '2024-10-31'),
('KHO0000044', 'MH00000060', 9, '2024-10-31'),
('KHO0000045', 'MH00000061', 11, '2024-10-31'),
('KHO0000046', 'MH00000062', 14, '2024-10-31'),
('KHO0000047', 'MH00000063', 4, '2024-10-31'),
('KHO0000048', 'MH00000064', 7, '2024-10-31'),
('KHO0000049', 'MH00000065', 13, '2024-10-31'),
('KHO0000050', 'MH00000066', 3, '2024-10-31');
go

drop table if exists Kho;
drop table if exists ChiTietDonBan;
drop table if exists HoaDonBan;
drop table if exists DanhGia;
drop table if exists ChiTietDonNhap;
drop table if exists HoaDonNhap;
drop table if exists NhaCungCap;
drop table if exists NguoiDung;
drop table if exists ChiTietMatHang;
drop table if exists ThongSoKyThuat
drop table if exists AnhMatHang;
drop table if exists MatHang;
drop table if exists LoaiMatHang;
drop table if exists GiamGia;
drop table if exists DanhMuc;

