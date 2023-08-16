// 전역변수
const mainWrapper = document.querySelector('.wrapper')
const displayBible = document.querySelector('.scripture')
const scriptureList = document.querySelector('.scripture-list')
const buttons = document.querySelector('.buttons')

let serverData = []
let chapter = []

//  서버 데이터 가져오는 함수수
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/')
    const bibleData = await data.json()
    serverData.push(bibleData)
    console.log(serverData[0])
    console.log(serverData[0].bibles[0].chapter)
}catch(error){
    console.log(error)
}
} 

/* 화면에 서버데이터 표시하는 함수 - 시작*/ 
async function showClikedBook(e){  
    e.stopPropagation()
    await getBibleData()
    if(e.target.className == 'book'){  // && 클래스 네임이 book 으로 시작 or 정규표현식으로 b로시작
       for(let i=0; i<serverData[0].bibles.length; i++){

   
        async function createdPagenation(){
            const pageButton = document.createElement('button')
            pageButton.classList.add('button')
        
            chapter.push(serverData[0].bibles[i].chapter)
            pageButton.innerText = uniqueArr
            const uniqueArr = [...new Set(chapter)]
            // console.log(chapter)
            console.log(uniqueArr)
            
            buttons.appendChild(pageButton)
        }
            createdPagenation()
           
          }
          
        if(e.target.id == serverData[0].bibles[i].book){
            scriptureList.style.display = 'none'
            displayVerse(i)

    
      }   
    }
}
scriptureList.addEventListener('click', showClikedBook)

// 챕터에 따라 verse 표시하기 (페이지네이션)
// 페이지수와 챕터가 일치할 경우에 해당 verse를 표기한다

async function createdPagenation(){
    await getBibleData()
    for(let i=0; i<serverData[0].bibles.length; i++){
    const pageButton = document.createElement('button')
    pageButton.classList.add('button')

    chapter.push(serverData[0].bibles[i].chapter)
    // pageButton.innerText = 
    const uniqueArr = [...new Set(chapter)]
    // console.log(chapter)
console.log(uniqueArr)
    // buttons.appendChild(pageButton)
    }
}
    createdPagenation()
    


// 자바스크립트 중복제거 set

// Verse 표시하기
function displayVerse(parameter){ 
    const bibleContents = document.createElement('div')
    bibleContents.innerHTML = `${serverData[0].bibles[parameter].verse}.&nbsp${serverData[0].bibles[parameter].content}`
    bibleContents.className = 'bible-contents'
    displayBible.appendChild(bibleContents)
}



/*뒤로가기 구현 - 어중간한 구현 */
// 뒤로가기 및 안보이게는 성공했는데, url 주소는 바뀌지 않는다, 변경하면 화면이 업데이트 되지않음..

// window.onload = function() {
//     console.log(window.location.href)
// }

window.onpopstate  = function(event) {
    event.stopPropagation()

if(!(event && window.location.href.includes('#'))){    
    scriptureList.style.display = 'flex'

    const bibleContents = document.querySelectorAll('.bible-contents')
    bibleContents.forEach((content)=> {
        content.style.display ='none'
    })    
}
}
   