import { useId } from 'react'
import { Blocks } from './components/Blocks'
import { useBlocks } from './hooks/useBlocks'
import './App.css'

function App () {
  const { blocks, generateNextBlock } = useBlocks()
  const inputId = useId()

  function handleSubmit (event) {
    event.preventDefault()
    const newBlockData = (new FormData(event.target)).get('newBlockData')
    generateNextBlock(newBlockData)
  }

  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>BLOCKCHAIN DEMO</h1>
      </header>
      <main>
        <Blocks blocks={blocks} />
        <div className='block'>
          <form className='new-block-form' onSubmit={handleSubmit}>
            <div>
              <label htmlFor={inputId}>Data: </label>
              <input id={inputId} name='newBlockData' type='text' />
            </div>
            <button type='submit'>+ Add new Block</button>
          </form>
        </div>
      </main>
    </>
  )
}

export default App
