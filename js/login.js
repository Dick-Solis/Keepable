// Variables 
const btnLogin = document.querySelector(".btn-login");
const btnRegister = document.querySelector(".btn-register");
const formRegister = document.querySelector(".form-register");
const formLogin = document.querySelector(".form-login");

if (currentUser) window.location = "/";

btnLogin.addEventListener("click", () => {
  formLogin.classList.remove("none");
  formRegister.classList.add("none");
})

btnRegister.addEventListener("click", () => {
  formLogin.classList.add("none");
  formRegister.classList.remove("none");
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = {
    username: e.target.loginUsername.value,
    password: e.target.loginPassword.value
  }

  const response = loginUser(user);
  if (response.status === "success") {
    notification("User Login Correctly", "success");
    setTimeout(() => {
      window.location = "/";
    }, 2000);
  }else {
    notification("Username/Email or password incorrect", "error");
  }
})

formRegister.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target.registerUsername.value;
  const email = e.target.registerEmail.value;
  const password = e.target.registerPassword.value;
  console.log(username, email, password)

  if (!username || !email || !password) {
    notification("All fields are required", "error");
    return;
  }

  const newUser = {
    username,
    email,
    password
  }

  const response = registerNewUser(newUser);
  if (response.status === "success") {
    notification("User Registered Correctly", "success");
    setTimeout(() => {
      window.location = "/";
    }, 2000);
  }else {
    notification(response.message, "error");
  }
})
