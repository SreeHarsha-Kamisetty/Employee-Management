const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const signUpButton_mobile = document.getElementById('signUp_mobile');
const signInButton_mobile = document.getElementById('signIn_mobile');
const backendURL = "https://employee-management-ya74.onrender.com"

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

signUpButton_mobile.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton_mobile.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


let registerEmail = document.getElementById("r-email")
let registerPassword = document.getElementById("r-password")
let confirmPassword = document.getElementById('r-cpassword')
let registerBtn = document.getElementById("register")
let r_error = document.getElementById("r-error")

registerBtn.addEventListener("click",()=>{
    let email = registerEmail.value
        
        let password = registerPassword.value
        let confirmpassword = confirmPassword.value
    if(email !== "" && password !=="" && confirmpassword !=="" && (password === confirmpassword)){
            register(email,password);
           
           
    }
    else{
        r_error.setAttribute("style","color:red;")
        r_error.textContent = "Please fill all the required details"
        setTimeout(()=>{
                
            r_error.textContent = ""
        },3000)
    }
})

let loginEmail = document.getElementById("l-email")
let loginPassword = document.getElementById("l-password")
let loginBtn = document.getElementById("login")
let l_error = document.getElementById("l-error");

loginBtn.addEventListener("click",()=>{
    let email = loginEmail.value
    let password = loginPassword.value

    if(email !== "" && password !== ""){
        login(email,password)
       
    }
    else{
        l_error.setAttribute("style","color:red;")
        l_error.textContent = "Please fill the required fields"
        setTimeout(()=>{
                
            l_error.textContent = ""
        },3000)
    }
})

async function register(email,password){
    try {
        let res = await fetch(`${backendURL}/api/signup`,{
            method: "POST",
            headers:{
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                password:password,
                email:email
            })
        })

        let data = await res.json();
        console.log(data)
        if(res.status == 200){
            r_error.setAttribute("style","color:green");
            r_error.textContent = "Registered successfully!"

            setTimeout(()=>{
                
                r_error.textContent = ""
            },3000)
        }
        else if(res.status == 403 ){
            r_error.setAttribute("style","color: red");
            r_error.textContent = "Account already exists. Please sign in"

            setTimeout(()=>{
                
                r_error.textContent = ""
            },3000)
        }
       

    } catch (error) {
        console.log(error)
        
    }
}

async function login(email,password){
    try {
        let res = await fetch(`${backendURL}/api/login`,{
            method: "POST",
            headers:{
                "Content-type" : "application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        })

        let data = await res.json();
        console.log(data.accessToken);
        localStorage.setItem("token",data.accessToken)
  

        if(res.status == 200){
            l_error.setAttribute("style","color:green;")
            l_error.textContent = "Login Successful"

            setTimeout(()=>{
                
                l_error.textContent = ""
                window.location.href = "./dashboard.html"
            },3000)
        }
        else if(res.status == 404){
            l_error.setAttribute("style","color:red;")
            l_error.textContent = "User not found. Please register"

            setTimeout(()=>{
                
                l_error.textContent = ""
            },3000)
        }
        else{
            l_error.setAttribute("style","color:red;")
            l_error.textContent = "Invalid Credentials"

            setTimeout(()=>{
                
                l_error.textContent = ""
            },3000)
        }


    } catch (error) {
        console.log(error)
    }
}