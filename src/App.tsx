import React from 'react'
import { Routes } from 'react-router-dom'
import './App.css'
import RenderRoute from './components/RenderRoute'
import { routes } from './router'

const App = (): React.ReactElement => (
    <div className="App">
        <Routes>
            {
                RenderRoute({
                  routes
                })
            }
        </Routes>
    </div>
)

export default App
