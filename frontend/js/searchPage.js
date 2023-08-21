// 전역변수
const searchWord = localStorage.getItem('inputWord')
const main = document.querySelector('main')
const footer = document.querySelector('footer')
const contents = document.querySelector('.contents')
const moreViewBtn = document.querySelector('.moreview-btn')
let serverData = []

// 서버데이터 가져오기
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/')
    const bibleData = await data.json()
    await serverData.push(bibleData)
    console.log(serverData[0])
}catch(error){
    console.log(error)
}
}


/* 검색 결과 보여주기 */    
// 검색 content 표시하기
function displayContent(updateResults, searchWord){
    for(let i= 0; i < updateResults.length; i++){
        const bookChapter = document.createElement('h4') 
        const searchContent = document.createElement('p')
        
        bookChapter.innerHTML = `${JSON.stringify(updateResults[i].title).replace (/"/g,'')}&nbsp${JSON.stringify(updateResults[i].chapter).replace (/"/g,'')}장&nbsp${JSON.stringify(updateResults[i].verse).replace (/"/g,'')}절`
        searchContent.innerHTML = `${JSON.stringify(updateResults[i].content).replace (/"/g,'')}`
      

       contents.append(bookChapter, searchContent)

// 검색단어 하이라이트 적용하기
        if(searchContent.innerText.includes(searchWord)){
            searchContent.innerHTML = searchContent.innerHTML.split(searchWord).join(`<span class='highlight'>${searchWord}</span>`)            
        }
    }
    const moreViewBtn = document.createElement('button') 
    contents.appendChild(moreViewBtn)

    moreViewBtn.innerText = '더보기'
    moreViewBtn.className = 'moreview-btn'

    moreViewBtn.addEventListener('click',()=>{
        contents.style.overflow = 'scroll'
        moreViewBtn.remove()
    })
}


// 검색결과 가져오기

async function showSearchBible(){
    await getBibleData()
      const updateResults = await serverData[0].bibles.filter(bibles => {
        if(searchWord){
            return bibles.content.includes(searchWord)
      }
      })
    displayContent(updateResults, searchWord)    
}

showSearchBible()

 

