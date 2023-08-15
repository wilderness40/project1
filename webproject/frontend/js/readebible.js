// 전역변수
const displayBible = document.querySelector('.scripture')
let serverData = []


//  서버 데이터 가져오는 함수수
async function getBibleData(){
    try{
    const data = await fetch('http://127.0.0.1:3300/api/bible/')
    const bibleData = await data.json()
    serverData.push(bibleData)
    console.log(serverData[0].bibles)
}catch(error){
    console.log(error)
}
} 
// 화면에 서버데이터 표시하는 함수
async function displayElement(){
    await getBibleData()
    console.log(serverData[0])
    for(let i=0; i<serverData[0].bibles.length; i++){
    const bibleContents = document.createElement('div')
    bibleContents.innerHTML = `${serverData[0].bibles[i].verse}.&nbsp${serverData[0].bibles[i].content}`
    bibleContents.className = 'bible-contents'
    displayBible.appendChild(bibleContents)
}
}

displayElement()