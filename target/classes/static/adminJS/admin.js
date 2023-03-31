const adminUrl = '/api/admin';

const currentUser = fetch(adminUrl).then(response => response.json())
currentUser.then(user => {
        let roles = ''
        user.roles.forEach(role => {
            roles += ' '
            roles += role.name.replaceAll("ROLE_", "")
        })
        document.getElementById("navbar-email").innerHTML = user.username
        document.getElementById("navbar-roles").innerHTML = roles
    }
)

async function getAdminPage() {
    let page = await fetch(adminUrl);

    if (page.ok) {
        let listAllUser = await page.json();
        loadTableData(listAllUser);
    } else {
        alert(`Error, ${page.status}`)
    }
}

function loadTableData(listAllUser) {
    const tableBody = document.getElementById('adminTbody');
    let dataHtml = '';
    for (let user of listAllUser) {
        let roles = [];
        for (let role of user.roles) {
            roles.push(" " + role.name.replaceAll("ROLE_", ""))
        }
        dataHtml +=
            `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.surname}</td>
    <td>${user.username}</td>
    <td>${user.age}</td>
    <td>${roles}</td>
    <td>
        <button type="button" class="btn btn-primary" data-bs-toogle="modal"
        data-bs-target="#editModal" 
        onclick="loadDataForEditModal(${user.id})">Edit</button>
    </td>
        
    <td>
        <button class="btn btn-danger" data-bs-toogle="modal"
        data-bs-target="#deleteModal" 
        onclick="deleteModalData(${user.id})">Delete</button>
    </td>
   
</tr>`
    }
    tableBody.innerHTML = dataHtml;
}

getAdminPage();
getUserPage();