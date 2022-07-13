let content = document.getElementById('content')

function showCityHome() {
    let html = `
        <div class="col-12" >
        <h2 style="text-align: center" >Danh sách thanh pho</h2>
        
        <h4 style="text-align: center; cursor: pointer; color: blue" onclick="showAddForm()">Thêm mới</h4>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Thanh pho</th>
                  <th scope="col">Quoc gia</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody id="list-city">
               
              </tbody>
            </table>
        </div>`
    loadList();
    content.innerHTML = html
}

function loadList(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blog",
        success: function (data) {
            let html1 = "";
            for (let i = 0; i < data.length; i++) {
                html1 += `<tr><th scope="row">${i+1}</th>
                        
                          <td><a onclick="viewDetail(${data[i].id})">${data[i].name}</a></td>
                          <td>${data[i].country.name}</td>
                          <td><button class="btn btn-outline-secondary mr-2" onclick="showEdit(${data[i].id})">Sửa</button>
                          <Button class="btn btn-outline-danger" onclick="delete(${data[i].id},'${data[i].name}')">Xoá</Button></td></tr>`
            }
            document.getElementById('list-city').innerHTML = html1;
        }, error: function (error) {
            console.log(error);
        }
    })
}