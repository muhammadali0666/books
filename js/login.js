let elFormLogin = document.querySelector(".login-form");
let elLoginInput = document.querySelector(".first-login-input");
let elPsswordInput = document.querySelector(".first-password-input");


elFormLogin.addEventListener("submit", function(evt) {
evt.preventDefault();

let personLoginValue = elLoginInput.value.trim();
let personPasswordValue = elPsswordInput.value.trim()
 
fetch("https://reqres.in/api/login",{
  method:"POST",
  headers:{
    "Content-Type":"application/json",
  },
  body: JSON.stringify(
    {
      email: personLoginValue,
      password: personPasswordValue,
    }
  )
}).then((res) => res.json())
.then((data) => {
  if(data.token){
    window.localStorage.setItem("token",data.token);

    window.location.replace("home.html")
  }
  else {
    alert("Email Yoki Parol Xato")
   
  }
})

})



