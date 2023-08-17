// 전역변수
const mainWrapper = document.querySelector('.wrapper')
const displayBible = document.querySelector('.scripture')
const scriptureList = document.querySelector('.scripture-list')
const buttons = document.querySelector('.buttons')

let serverData = []
let chapter = []
let pageNum = 1

//  서버 데이터 가져오는 함수수
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/')
    const bibleData = await data.json()
    serverData.push(bibleData)
    console.log(serverData[0])
}catch(error){
    console.log(error)
}
} 

/* 화면에 서버데이터 표시하는 함수 - 시작*/ 

// 성경의 각 책이름을 클릭하면 본문을 보여주는 함수
async function showClikedBook(e){  
function deleteTitle(){
    const bookTitle = mainWrapper.querySelector('.book-title')
    if(bookTitle) mainWrapper.removeChild(bookTitle) // 새로운 성경책 클릭시 기존 타이틀 삭제, if(bookTitle) 안하면 생성간격차이로 오류발생
}
    e.stopPropagation()
    chapter = []
    await getBibleData()
    
    if(e.target.className == 'book'){   // 빈공간 클릭시 작동하지 않도록 설정  
      
// 성경책 이름 가져오기 (for문 안에 넣으면 안된다)
 function createTitle(){
        const bookTitle = document.createElement('h3')
        bookTitle.className = 'book-title'
        bookTitle.innerHTML = `${e.target.innerText}&nbsp${displayChpater(pageNum)}장` 
        mainWrapper.insertAdjacentElement('afterbegin', bookTitle) // 본문 위에 삽입
        console.log(pageNum)
    }
    deleteTitle()
    createTitle()
    

       for(let i=0; i<serverData[0].bibles.length; i++){
        if(e.target.id == serverData[0].bibles[i].book){ // 클릭한 책의 본문만 가져온다
            scriptureList.style.display = 'none'
// 챕터 수 대로 하단 페이지 넘버 부여            
            async function createdPageNum(){
                if(!chapter.includes(serverData[0].bibles[i].chapter)){ // 중복되는 값들은 push를 안해주게 설정
                chapter.push(serverData[0].bibles[i].chapter)
            }
            }
            createdPageNum()           
      }   
          }
//   console.log(chapter) 디버깅용 for문 밖에서 조회해야 한다

// 하단 페이지버튼 마운트 생성
          async function createdPageNation(bookId){ // 버튼을 for문 밖에서 생성해야 한다, bookId 이름은 아무거나 상관없고 이 값은 복사된 e.target.id 이다
            chapter.forEach((btn) => {
                const pageButton = document.createElement('button')
                pageButton.classList.add('button')       
                pageButton.innerText = btn   
                const firstBtn = document.querySelectorAll('button')[0]
                firstBtn?.classList.add('active')      // 첫페이지 버튼 클릭되어있도록 설정
               
// 첫 화면은 1장을 가져오도록 설정
                for(let i=0; i<serverData[0].bibles.length; i++){
                    if( bookId == serverData[0].bibles[i].book
                        && serverData[0].bibles[i].chapter == 1
                        ){                          
                            displayVerse(i)      
                        }
                    }
                
                pageButton.addEventListener('click', function(e){
// 클릭한 요소 외의 버튼은 non-active 설정하기
                    const buttonGroup = this.parentNode
                    const active = buttonGroup.querySelector('.active')
                    
                    pageNum = e.target.innerText
                    displayChpater(pageNum)
                    console.log(pageNum)
                    if(active){
                        active.classList.remove('active')
                        displayBible.innerHTML =''
                      } e.currentTarget.classList.add('active')
                      deleteTitle()
                      createTitle()
// Chapter에 해당하는 Verse만 마운트하기 (Chapter는 하단 페이지 넘버와 동일)
                    for(let i=0; i<serverData[0].bibles.length; i++){
                        if( bookId == serverData[0].bibles[i].book
                            && this.innerText == serverData[0].bibles[i].chapter
                            && this.className == 'button active'
                            ){
                             displayVerse(i)
                            }
                        }
                        console.log(pageNum)
                       return pageNum
                })
                
                buttons.appendChild(pageButton)
        })
        }
        createdPageNation(e.target.id) // 함수 파라미터 전달 showClikedBook의 e.target.id를 createdPageNation 함수 안에서 사용하기 위해 입력 
       
    }
  
}
scriptureList?.addEventListener('click', showClikedBook) // 성경의 각 책이름을 클릭하면 본문을 보여주는 함수

// 타이틀에 페이지수 넣기
function displayChpater(pageNum){
    return pageNum
}

// Verse 표시하기
function displayVerse(parameter){ 
    const bibleContents = document.createElement('div')
    bibleContents.innerHTML = `${serverData[0].bibles[parameter].verse}&nbsp${serverData[0].bibles[parameter].content}`
    bibleContents.className = 'bible-contents'
    displayBible.appendChild(bibleContents)
}



/*뒤로가기 구현 - 어중간한 구현 */
// 문제점 : 앞으로 가기는 안먹힌다.. 앞으로 가기 하면 다시 컨텐츠 나와야하는데

window.onpopstate  = function(event) {
    event.stopPropagation()

if(!(event && window.location.href.includes('#'))){    
    scriptureList.style.display = 'flex' // 뒤로가기 했을때 목차 다시나오기

    const bibleContents = document.querySelectorAll('.bible-contents') // 뒤로가기 했을때 성경본문 삭제
    bibleContents.forEach((content)=> {
        content.remove()
    })    

    const pageButton = document.querySelectorAll('button') // 뒤로가기 했을때 하단 페이지네이션 삭제
    pageButton.forEach(btn => btn.remove())

}
}
   

