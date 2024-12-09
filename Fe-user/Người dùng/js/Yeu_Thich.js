// Danh sách sản phẩm mẫu
const products = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Sản phẩm ${i + 1}`,
    price: `${(i + 1) * 10},000 VND`,
  }));
  
  let currentPage = 1; // Trang hiện tại
  const itemsPerPage = 10; // Số sản phẩm mỗi trang
  
  // Hiển thị dữ liệu lên bảng
  function renderTable() {
    const tableBody = document.getElementById('table-body');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
  
    tableBody.innerHTML = ""; // Xóa dữ liệu cũ
    const currentItems = products.slice(startIndex, endIndex);
  
    currentItems.forEach((product, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${startIndex + index + 1}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
      `;
      tableBody.appendChild(row);
    });
  
    updatePagination();
  }
  
  // Cập nhật thông tin phân trang
  function updatePagination() {
    const pageInfo = document.getElementById('page-info');
    const totalPages = Math.ceil(products.length / itemsPerPage);
  
    pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;
  
    // Vô hiệu hóa nút khi ở trang đầu hoặc cuối
    document.getElementById('prev-btn').disabled = currentPage === 1;
    document.getElementById('next-btn').disabled = currentPage === totalPages;
  }
  
  // Chuyển trang
  function changePage(direction) {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if ((currentPage === 1 && direction === -1) || (currentPage === totalPages && direction === 1)) {
      return;
    }
  
    currentPage += direction;
    renderTable();
  }
  
  // Khởi tạo
  renderTable();
  