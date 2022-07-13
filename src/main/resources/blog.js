let view = document.getElementById("content");

function show() {
    let str = ` <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" onclick="loginForm()">Login</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
              <a class="nav-link" onclick="loadList()" ">hien tat ca</a>
              <a class="nav-link" onclick="addForm()">add</a>
              <a class="nav-link" onclick="logout()">Logout</a>
            </div>
          </div>
        </nav> 
        <div id="blog"></div>`
    view.innerHTML = str;

}

function loginForm() {
    let str = `
       <input type="text" id="username" name="username" placeholder="Username">
        <input type="password" id="password" name="password" placeholder="Password">
        <button type="submit" onclick="login()">Login</button>
        <button onclick="registerForm()">register</button>

`
    content.innerHTML = str

}

function login() {

    let usn = document.getElementById("username").value;
    let pw = document.getElementById("password").value;
    let user = {
        username: usn,
        password: pw,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'POST',
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            show()
            console.log(data)
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('id', data.id)
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function registerForm() {
    let str = `
        <input type="text" id="usn" name="username" placeholder="Username">
         <input type="password" id="pw" name="password" placeholder="Password">
         <input type="password" id="pwc" name="confirmPassword" placeholder="Confirm Password">
         <button type="submit" onclick="register()">Register</button>
`
    content.innerHTML = str
}

function register() {
    let username = document.getElementById('usn').value;
    let password = document.getElementById('pw').value;
    let confirmPassword = document.getElementById('pwc').value;
    let data = {
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }
    console.log(data)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: "POST",
        url: "http://localhost:8080/register",
        data: JSON.stringify(data),
        success: function () {
            alert("Register done!")
        },
        error: function (error) {
            show()
            console.log(error)
        }
    })
}

function logout() {
    localStorage.removeItem('token');

}

function loadList() {
    let html1 = `<div>
                        <table>
                            <tr>
                                <td>#</td>
                                <td>Content</td>
                                <td>Description</td>
                                <td>Title</td>
                                <td>Action</td>
                            </tr>
                                <tbody id="list-blog"></tbody>
                        </table>
                        </div>`
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blogs",
        success: function (data) {
            console.log(data)
            let str = ""
            for (let i = 0; i < data.length; i++) {
                str += `<tr><td scope="row">${i}</td>
                          <td><a onclick="viewDetail(${data[i].id})">${data[i].content}</a></td>
                          <td>${data[i].description}</td>
                          <td>${data[i].title}</td>
                          <td><button class="btn btn-outline-secondary mr-2" onclick="showEdit(${data[i].id})">Sửa</button>
                          <Button class="btn btn-outline-danger" onclick="dlt(${data[i].id},'${data[i].content}')">Xoá</Button></td></tr>`
            }
            document.getElementById('list-blog').innerHTML = str;
        }, error: function (error) {
            console.log(error);
        }
    })
    document.getElementById('blog').innerHTML = html1
}

function viewDetail(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blogs/" + id,
        success: function (data) {
            console.log(data)
            let str = `<h1>Bai viet ${data.name}</h1>
    <button onclick="loadList()">Xem danh sach bai viet</button>
    <p>noi dung: ${data.name}</p>
    <p>mo ta: ${data.description}</p>
    <p>tieu de: ${data.title}</p>
    <button onclick="showEdit(${data.id})">Chinh sua</button>
    <button onclick="dlt(${data.id})">Xoa</button>`
            view.innerHTML = str
        }
    })
}


function dlt(id) {
    if (confirm("Bạn có chắc chắn muốn xoá  ko ???")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/blogs/' + id,
            success: function () {
                loadList()
            },
            error: function (error) {
                console.log(error)
            }
        })
    }
}
function showEdit(id){
    let edit=`
                 <div>
                        <table>
                            <tr>
                                <input type="hidden" id="id">
                                <td><input type="text" id="titleEdit"> nhap id</td>
                                <td><input type="text" id="contentEdit"> nhap id</td>
                                <td><input type="text" id="descriptionEdit"> nhap id</td>
                                <td><input type="hidden" id="statusEdit"> </td>
                              
                            </tr>
                                <button onclick="edit()">Sua</button>
                        </table>
                 </div>  `
    view.innerHTML = edit
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blogs/" + id,
        success: function (blog) {
            document.getElementById("id").value = blog.id
            document.getElementById("titleEdit").value = blog.title
            document.getElementById("descriptionEdit").value = blog.description
            document.getElementById("contentEdit").value = blog.content
            document.getElementById("statusEdit").value = blog.status
            console.log(blog)
        }
    })
}

function edit() {
    let id = document.getElementById('id').value;
    let title = document.getElementById("titleEdit").value;
    let content = document.getElementById("contentEdit").value;
    let description = document.getElementById("descriptionEdit").value;
    let status = document.getElementById("statusEdit").value;
    let userId = localStorage.getItem('id');
    let blog = {
        id: id,
        title: title,
        content: content,
        description:description,
        status:status,
        user :{
            id: userId
        },
    }
    console.log(blog)
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        type: 'PUT',
        url: 'http://localhost:8080/blogs/' + id,
        data :JSON.stringify(blog),
        success: function () {
            show()
        },
        error: function (error) {
            console.log(error)
        }
    })
}




