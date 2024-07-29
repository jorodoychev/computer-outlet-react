import ReactDOM from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)
