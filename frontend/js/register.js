const name = document.querySelector('.name input')
const email = document.querySelector('.email input')
const userId = document.querySelector('.userId input')
const password = document.querySelector('.userPw input')


const registerButton = document.querySelector('.register-btn')
// console.log(registerButton)
async function getUserData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/users/register', 
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            name: name.value,
            email: email.value,
            userId: userId.value,
            password: password.value
        })
    })
    const userData = await data.json()
    console.log(userData)
}catch(error){
    console.log(error)
}
}

registerButton.addEventListener('click',getUserData)