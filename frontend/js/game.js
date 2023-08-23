const main = document.querySelector('main')
const typingContent = document.querySelector('.bible-content')
const textWindow = document.getElementById('textWindow')
let charIndex = 0
let index = 1
let serverData = []

// 성경 서버데이터 가져오기
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/psalms?title=시편')
    const bibleData = await data.json()
    console.log(bibleData)
    serverData.push(bibleData)
    // console.log(serverData[0].psalms.length)
}catch(error){
    console.log(error)
}
} 



async function getBibleText(){
    await getBibleData()
    
    const bibleTitle = document.createElement('h3')
    bibleTitle.innerHTML =``
    const bibleText = document.createElement('div')
    bibleText.className = 'bibleText'
    typingContent.append(bibleTitle, bibleText)


    for(let i=0; i < serverData[0].psalms.length - 1; i++){
        if(serverData[0].psalms[i].chapter == index){
            const biblePargraph = document.createElement('p')
            biblePargraph.innerHTML =`${serverData[0].psalms[i].verse}${serverData[0].psalms[i].content}`
            bibleText.appendChild(biblePargraph)
       }
       }


// 한글자씩 풀어서 span태그로 감싸주기   
    const bibletextPara = typingContent.querySelectorAll('.bibleText p') 
    for(let i =0; i<bibletextPara.length -1; i++){
        bibletextPara[i].innerHTML = bibletextPara[i].innerText.split('').map(char => char.replace(char, `<span>${char}</span>`)).join('')
    }
    
const textSpan = typingContent.querySelectorAll('span')


// 텍스트 입력창 
textWindow.addEventListener('input',e=>{   
    const inputSpanText = e.target.value
    console.log(inputSpanText)
    let typedText = inputSpanText.split('')
    if(textSpan[charIndex].innerText === typedText[charIndex]){ // 글자가 일치할 경우
        textSpan[charIndex].classList.add('correct')
        textSpan[charIndex].classList.remove('incorrect')
        charIndex++ 
    }
    else if(typedText[charIndex] == null){  // 글자를 지울 때
        textSpan[charIndex].classList.remove('correct')
        textSpan[charIndex].classList.remove('incorrect')
        if(charIndex > 0) charIndex-- 
    }
    else{   // 글자가 불일치할 경우
        textSpan[charIndex].classList.add('incorrect')
    }

})

// 버튼 생성



}



(async () => await getBibleText())()
