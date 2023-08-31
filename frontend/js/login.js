const loginButton = document.querySelector('.login-btn')
console.log(loginButton)

async function getUserData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/users/login', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            name: req.body.name,
            email: req.body.email,
            userId:req.body.userId,
            password:req.body.password
        })
    })
    const userData = await data.json()
    console.log(userData)
}catch(error){
    console.log(error)
}
}

loginButton.addEventListener('click',getUserData)