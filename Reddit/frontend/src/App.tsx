import { Button } from './components/ui/button'
import { ThemeProvider } from './components/theme-provider'
// import { ModeToggle } from './components/mode-toggle'
// import './App.css'

function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Button>HHHH</Button>
        {/* <ModeToggle /> */}
      </ThemeProvider>
    </>
  )
}

export default App
