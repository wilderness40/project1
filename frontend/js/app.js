// 전역변수

const searchBtn = document.querySelector('.input-btn')


// 검색 버튼 클릭이벤트 - 검색버튼을 클릭하면 성경읽기 html로 이동하여 검색어와 일치되는 내용을 표시해야한다.
searchBtn.addEventListener('click', (e) => {
    const searchWord= e.target.value.trim()
    console.log(searchWord)
})