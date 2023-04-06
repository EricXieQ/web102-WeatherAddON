import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import SideNav from '../Components/sideNav'
import DetailView from '../Routes/DetailView'
import NotFound from "../Routes/NotFound"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/" element = {<SideNav />}/>
          <Route index={true} element={<App />} />
          <Route path = "/weatherDetail/:Date/:hour/:index" index={false} element= {<DetailView />}/>
          <Route path="*" element={ <NotFound /> }/>
          
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
