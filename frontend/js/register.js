const registerButton = document.querySelector('.register-btn')
console.log(registerButton)
async function getUserData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/users/register')
    const userData = await data.json()
    console.log(userData)
}catch(error){
    console.log(error)
}
}

registerButton.addEventListener('click',getUserData)