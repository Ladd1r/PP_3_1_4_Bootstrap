const userUrl = '/api/user';

const authUser = fetch(userUrl).then(response => response.json())
authUser.then(user => {
        let roles = ''
        user.roles.forEach(role => {
            roles += ' '
            roles += role.name.replaceAll("ROLE_", "")
        })
        document.getElementById("navbar-email").innerHTML = user.username
        document.getElementById("navbar-roles").innerHTML = roles
    }
)

async function getUserPage() {
    let page = await fetch(userUrl);

    if(page.ok) {
        let user = await  page.json();
        getInformationAboutUser(user);
    } else {
        alert(`Error, ${page.status}`)
    }
}
function  getInformationAboutUser(user) {
    const tableBody = document.getElementById('userTbody');
    let dataHtml = '';
    let roles = [];
    console.log('userSata', JSON.stringify(user))
    for (let role of user.roles) {
        roles.push(" " + role.name.replaceAll("ROLE_", ""))
    }
    dataHtml =
        `<tr>
    <td>${user.id}</td>
    <td>${user.name}</td>
    <td>${user.surname}</td>
    <td>${user.username}</td>
    <td>${user.age}</td>
    <td>${roles}</td>   
</tr>`

    tableBody.innerHTML = dataHtml;
}
getUserPage();