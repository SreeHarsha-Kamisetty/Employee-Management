

const openButton = document.getElementById('addEmp');
const dialog = document.getElementById('myDialog');
openButton.addEventListener('click', () => {
    dialog.setAttribute("style", "display: flex")
    dialog.showModal();
});
const closeButton = document.getElementById('closeDialog');
closeButton.addEventListener('click', () => {
    dialog.setAttribute("style", "display: none")
    dialog.close();
});
{/* <div class="data">
                <div id="empdata">
                    <p id="firstName">Sree Harsha</p>
                    <p id="lastName">Kamisetty</p>
                    <p id="email">sree@gmail.com</p>
                    <p id="department">Tech</p>
                    <p id="salary">999999</p>
                    <div><button id="edit">Edit</button>
                        <button id="delete">Delete</button>
                    </div>
                </div>
            </div> */}


function createEmployee(item){
    let maindiv = document.createElement('div')
    maindiv.setAttribute("id", "data")

    let subDiv = document.createElement('div')
    subDiv.setAttribute("id", "empdata")

    let firstName = document.createElement('p')
    firstName.setAttribute('id', "firstName")
    firstName.innerText = item.firstName

    let lastName = document.createElement('p')
    lastName.setAttribute('id', "lastName")
    lastName.innerText = item.lastName

    let email = document.createElement('p')
    email.setAttribute("id", "email")
    email.textContent = item.email

    let department = document.createElement('div')
    department.setAttribute("id", "department")
    department.innerText = item.department

    let salary = document.createElement()

}