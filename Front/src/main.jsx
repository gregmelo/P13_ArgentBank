import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider} from 'react-redux'
import store from './redux/store/store'
import App from './App.jsx'
import './scss/index.scss'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
)
