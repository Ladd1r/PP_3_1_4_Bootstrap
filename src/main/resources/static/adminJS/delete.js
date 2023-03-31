const delId = document.getElementById('delId');
const delName = document.getElementById('delName');
const delSurname = document.getElementById('delSurname');
const delAge = document.getElementById('delAge');
const delUsername = document.getElementById('delUsername');
const delRoles = document.getElementById("delRoles")
const deleteModal = document.getElementById("deleteModal");
const closeDeleteButton = document.getElementById("closeDelete")
const bsDeleteModal = new bootstrap.Modal(deleteModal);

async function deleteModalData(id) {
    const  urlForDel = 'api/admin/user/' + id;
    let usersPageDel = await fetch(urlForDel);
    if (usersPageDel.ok) {
        let userData =
            await usersPageDel.json().then(user => {
                delId.value = `${user.id}`;
                delName.value = `${user.name}`;
                delSurname.value = `${user.surname}`;
                delUsername.value = `${user.username}`;
                delAge.value = `${user.age}`;
                delRoles.value = user.roles.map(r=>r.name).join(", ");
            })

        bsDeleteModal.show();
    } else {
        alert(`Error, ${usersPageDel.status}`)
    }
}
async function deleteUser() {
    let urlDel = 'api/admin/user/' + delId.value;
    let method = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(urlDel, method).then(() => {
        closeDeleteButton.click();
        getAdminPage();
    })
}