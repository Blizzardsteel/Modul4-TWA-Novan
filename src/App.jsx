
import { useState } from 'react'
import Header from './assets/components/Header.jsx'
import Footer from './assets/components/Footer.jsx'
import Catalog from './assets/pages/Catalog.jsx'
import About from './assets/pages/About.jsx'
import Contact from './assets/pages/Contact.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')

  return (
    <div className="shell">
      <Header tab={tab} onTab={setTab} />

      <main className="main">
        {tab === 'Catalog' && <Catalog />}
        {tab === 'About' && <About />}
        {tab === 'Contact' && <Contact />}
      </main>

      <Footer />
    </div>
  )
}

export default App

