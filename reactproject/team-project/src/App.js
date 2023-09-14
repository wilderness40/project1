import './App.css';
import './core.css'

function App() {
  return (
    <div className="App">
      <Routes>
         <Route exact path='/' element={<Home />} />
         <Route exact path='/play' element={<Play />} />
         <Route exact path='/work' element={<Work />} />
         <Route exact path='/food' element={<Food />} />
         <Route exact path='/news' element={<News />} />
         <Route exact path='/BackHome' element={<BackHome />} />
      </Routes>
    </div>
  )
}

export default App;
