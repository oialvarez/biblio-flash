import { useState } from 'react'
import './App.css'

import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      {/* The content for each page will be rendered here */}
      <h2>Welcome to BiblioFlash!</h2>
      <p>Your journey to mastering biblical English starts now.</p>
    </Layout>
  )
}

export default App
