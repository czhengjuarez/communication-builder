import { ThemeProvider } from './contexts/ThemeContext'
import CommunicationBuilder from './components/CommunicationBuilder'

function App() {
  return (
    <ThemeProvider>
      <CommunicationBuilder />
    </ThemeProvider>
  )
}

export default App
