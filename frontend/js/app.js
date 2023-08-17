
// 전역변수

const searchBtn = document.querySelector('.input-btn')
const ramdomPargraph = document.querySelector('.random-paragraph')

// 검색 버튼 클릭이벤트 - 검색버튼을 클릭하면 성경읽기 html로 이동하여 검색어와 일치되는 내용을 표시해야한다.
searchBtn.addEventListener('click', (e) => {
    const searchWord= e.target.value.trim()
    console.log(searchWord)
})


// 성경 랜덤 구절 
// 배경이미지는 pixabay나 unsplash에서 랜덤으로 떙겨오자, 특정 키워드의 이미지만 떙겨오도록 설정
async function createRandomVerse(){
await getBibleData()
const h3 = document.createElement('h3')
const randomNum = Math.floor(Math.random() * 31102)
h3.innerHTML = `${serverData[0].bibles[randomNum].content}<br><p>${serverData[0].bibles[randomNum].title}&nbsp${serverData[0].bibles[randomNum].chapter}장 ${serverData[0].bibles[randomNum].verse}절</p>`
// window.onload = console.log(serverData[0].bibles[Math.floor(Math.random() * 31102)].previousSiblings) // book chapter verse 가져와야함

ramdomPargraph.appendChild(h3)
}

createRandomVerse()