const edForm = document.getElementById('formForEditing');
const edId = document.getElementById('edit-id');
const edName = document.getElementById('edit-name');
const edSurname = document.getElementById('edit-surname');
const edAge = document.getElementById('edit-age');
const edUsername = document.getElementById('edit-username');
const editModal = document.getElementById("editModal");
const closeEditButton = document.getElementById("editClose")
const bsEditModal = new bootstrap.Modal(editModal);

async function loadDataForEditModal(id) {
    const  urlDataEd = 'api/admin/user/' + id;
    let usersPageEd = await fetch(urlDataEd);
    if (usersPageEd.ok) {
        // let userData =
        await usersPageEd.json().then(user => {
            console.log('userData', JSON.stringify(user))
            edId.value = `${user.id}`;
            edName.value = `${user.name}`;
            edSurname.value = `${user.surname}`;
            edUsername.value = `${user.username}`;
            edAge.value = `${user.age}`;
        })
        console.log("edId: " + edId.value + " !!")
        bsEditModal.show();
    } else {
        alert(`Error, ${usersPageEd.status}`)
    }
}
async function editUser() {
    let urlEdit = 'api/admin/user/' + edId.value;
    let listOfRole = [];
    console.dir(edForm)
    for (let i=0; i<edForm.roles.options.length; i++) {
        if (edForm.roles.options[i].selected) {
            let tmp={};
            tmp["id"]=edForm.roles.options[i].value
            listOfRole.push(tmp);
        }
    }
    let method = {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: edForm.name.value,
            surname: edForm.surname.value,
            username: edForm.username.value,
            password: edForm.password.value,
            age: edForm.age.value,
            roles: listOfRole
        })
    }
    console.log(urlEdit,method)
    await fetch(urlEdit,method).then(() => {
        closeEditButton.click();
        getAdminPage();
    })
}
