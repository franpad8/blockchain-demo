import { Blocks } from './components/Blocks'
import { useBlocks } from './hooks/useBlocks'

function App () {
  const { blocks } = useBlocks()

  return (
    <>
      <header>
        <h1>BLOCKCHAIN</h1>
      </header>
      <main>
        <Blocks blocks={blocks} />
      </main>
    </>
  )
}

export default App
