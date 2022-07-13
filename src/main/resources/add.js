
function showAddForm() {
    let str = "<input type=\"text\" id=\"name\">\n" +
        "      <input type=\"text\" id=\"price\">\n" +
        "      <input type=\"text\" id=\"category\">\n" +
        "      <button onclick='save()'>Thêm</button>"
    show.innerHTML = str;
}
function save() {
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let categoryId = document.getElementById("category").value;
    let pro = {
        name: name, //name trước: là tên thuộc tính của đtượng pro , sau :là giá trị được lấy ở trên
        price: price,
        category: {
            id: categoryId
        }
    }
    console.log(pro)
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: 'http://localhost:8000/products',
        data: JSON.stringify(pro),
        success: function () {
            findAll()
        },
        error: function (error) {
            console.log(error)
            alert("Bạn không vào được trang này ")

        }

    })
}