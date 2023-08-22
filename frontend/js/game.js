const main = document.querySelector('main')
const typingContent = document.querySelector('.bible-content')
const textWindow = document.getElementById('textWindow')
let serverData = []


// 성경 서버데이터 가져오기
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/psalms?title=시편')
    const bibleData = await data.json()
    console.log(bibleData)
    serverData.push(bibleData)
    console.log(serverData[0].psalms.length)
}catch(error){
    console.log(error)
}
} 


async function getBibleText(){
    await getBibleData()

    const randomNum = Math.floor(Math.random() * 2461)
    const bibleText = document.createElement('ul')
    bibleText.className = 'bibleText-ul'
    bibleText.innerHTML =`
    <li>${serverData[0].psalms[randomNum].title}&nbsp${serverData[0].psalms[randomNum].chapter}장&nbsp${serverData[0].psalms[randomNum].verse}절</li><li>${serverData[0].psalms[randomNum].content}</li>`
    typingContent.appendChild(bibleText)

 // 한글자씩 풀어서 span태그로 감싸주기   
    const bibletextLi = typingContent.querySelectorAll('.bibleText-ul li')
    bibletextLi.forEach(li => {
        // console.log(li)
        // console.log(li.innerText.split(''))
        const spanText = li.innerText.split('').map(char => {
               return char.replace(char, `<span>${char}</span>`)
            })
            console.log(spanText)
        console.log(textWindow.innerText)
        textWindow.addEventListener('keydown',e=>{
            console.log(e.target.value)
            
        })
})
}

(async () => await getBibleText())()
