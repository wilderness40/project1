// 전역변수
const main = document.querySelector('main')

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

//  HTML 뼈대 DOM생성
function createTextField(){

// 가장 바깥의 div (초기화 대상)
    const typingContent = document.createElement('div')
    typingContent.className ='bible-content'
    main.appendChild(typingContent)
    

// 상단 TITLE
    const bibleTitle = document.createElement('h3')
    bibleTitle.innerHTML =`시편&nbsp${index}편`
    bibleTitle.className = 'bible-title'

// 본문 FORM & TEXTAREA & BUTTON      
    const form = document.createElement('form')
    form.setAttribute("action", '#')
    form.innerHTML =`
    <div class='textarea-value'></div>  
    <textarea name="textWindow" class="textWindow" spellcheck="false" onselectstart ='return false'></textarea>
    <div class='btn-group'>
    <button class="prev" type="button">이전</button>
    <button class="next" type="button">다음</button>    
    <button class="retry" type="button">다시하기</button>
    </div>    
    `
    typingContent.appendChild(form)

// 외부 반환을 위한 변수저장
    const textWindow = form.querySelector('.textWindow')
    const prevButton = form.querySelector('.prev')
    const nextButton = form.querySelector('.next')
    const retryButton = form.querySelector('.retry')
    const bibleText = document.createElement('div')
    const inputDiv = document.querySelector('.textarea-value')
    bibleText.className = 'bible-Text'
    
    typingContent.append(bibleTitle, bibleText)
   
    typingContent.insertAdjacentElement('afterbegin', bibleTitle) 
    textWindow.insertAdjacentElement('beforebegin', bibleText) 

// 변수반환    
    return { 
        typingContent,
        form, 
        bibleTitle,
        textWindow,
        bibleText,
        prevButton,
        nextButton,
        retryButton,
        inputDiv
    }
}



// 시편본문가져오기
async function getBibleText(){
    await getBibleData()
// 반환함수 호출
    const { 
        typingContent,
        form,
        bibleTitle,
        textWindow,
        bibleText,
        prevButton,
        nextButton,
        retryButton,
        inputDiv
     }  = createTextField()

// 시편본문 생성하기
    for(let i=0; i < serverData[0].psalms.length - 1; i++){
        if(serverData[0].psalms[i].chapter == index){
            const biblePargraph = document.createElement('p')
            biblePargraph.innerHTML =` ${serverData[0].psalms[i].verse} ${serverData[0].psalms[i].content}`
            bibleText.appendChild(biblePargraph)
       }
       }
       console.log(bibleText.innerHTML)
// 시편본문 한글자씩 풀어서 span태그로 감싸주기   
    const bibletextPara = typingContent.querySelectorAll('.bible-Text p') 

    for(let i =0; i<bibletextPara.length; i++){
        bibletextPara[i].innerHTML = bibletextPara[i].innerText.split('').map(char => char.replace(char, `<span>${char}</span>`)).join('')
    }
    
const textSpan = typingContent.querySelectorAll('span')

// 텍스트 입력창 글자입력 오류검증 기능
textWindow.addEventListener('keyup',e=>{   
    const inputSpanText = e.target.value
    inputDiv.innerText = inputSpanText
    let typedText = inputSpanText.split('')
    
    if(textSpan[charIndex].innerText === typedText[charIndex]){ // 글자가 일치할 경우
        textSpan[charIndex].innerText = typedText[charIndex]
        textSpan[charIndex].classList.add('correct')
        textSpan[charIndex].classList.remove('incorrect')
        charIndex++ 
    e.preventDefault()

    }
    else if(typedText[charIndex] == null){  // 글자를 지울 때
        textSpan[charIndex].classList.remove('correct')
        textSpan[charIndex].classList.remove('incorrect')
        if(charIndex > 0) charIndex-- 
    }
    else{   // 글자가 불일치할 경우
        inputDiv.innerText =''
        textSpan[charIndex].classList.add('incorrect')
    }
})
// 본문 클릭시 textarea 커서 활성화
bibleText.addEventListener('click',(e)=>{
    textWindow.focus()
})

 // 버튼 클릭 
 // 다음버튼
 nextButton.addEventListener('click', async (e)=> {
    e.preventDefault()
    if(index < serverData[0].psalms.length - 1)  {
        index++
        main.replaceChildren()
        await getBibleText()       
        console.log(bibleText.innerHTML)
    }else if(index == serverData[0].psalms.length - 1){
        alert('마지막 장입니다.')
    }
})

 // 이전버튼
prevButton.addEventListener('click', (e)=>{
    e.preventDefault()
    if(index > 1)  {
    index--
    main.replaceChildren()
    getBibleText()
    }
})

 // 다시버튼
retryButton.addEventListener('click',(e)=>{
    e.preventDefault()
    if(index !== 1){
    index = 1
    main.replaceChildren()
    getBibleText()
}
})
 
}
(async () => await getBibleText())()


 