import './App.css'
import { useId, useState } from 'react'
import { Blocks } from './components/Blocks'
import { useBlocks } from './hooks/useBlocks'
import { getInitialBlock } from './utils'

const PEERS_BLOCKS = {
  satochi: [{
    data: 'Welcome to Blockchain Demo Satochi',
    previousHash: '000',
    hash: '0',
    index: 0,
    timestamp: Date.now(),
    nonce: 1
  }],
  franpad8: [{
    data: 'Welcome to Blockchain Demo Franpad8',
    previousHash: '000',
    hash: '0',
    index: 0,
    timestamp: Date.now(),
    nonce: 1
  }]
}

function App () {
  const { blocks, generateNextBlock, changeBlockData, mineBlock, setBlocks } = useBlocks(PEERS_BLOCKS.satochi)
  const [currentPeer, setCurrentPeer] = useState('satochi')
  const inputId = useId()

  async function handleSubmit (event) {
    event.preventDefault()
    const newBlockData = (new FormData(event.target)).get('newBlockData')
    await generateNextBlock(newBlockData)
  }

  function handleChangePeer (event) {
    const newPeer = event.target.textContent
    if (!PEERS_BLOCKS[newPeer]) return

    setCurrentPeer((previousPeer) => {
      PEERS_BLOCKS[previousPeer] = blocks
      return newPeer
    })
    setBlocks(PEERS_BLOCKS[newPeer])
  }

  function handleAddPeer () {
    const newPeer = `User ${Object.keys(PEERS_BLOCKS).length}`
    PEERS_BLOCKS[newPeer] = [getInitialBlock()]
    setCurrentPeer((previousPeer) => {
      PEERS_BLOCKS[previousPeer] = blocks
      return newPeer
    })
    setBlocks(PEERS_BLOCKS[newPeer])
  }

  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>BLOCKCHAIN DEMO</h1>
      </header>
      <main>
        <section>
          <h2>Peers</h2>
          <ul className='peers'>
            {
              Object.keys(PEERS_BLOCKS).map(peer => (
                <li
                  key={peer}
                  className={`peer${peer === currentPeer ? ' active' : ''}`}
                  onClick={handleChangePeer}
                >
                  {peer}
                </li>
              ))
            }
            <li className='peer' onClick={handleAddPeer}>Add Peer</li>
          </ul>
        </section>
        {
          blocks
            ? <Blocks blocks={blocks} changeBlockData={changeBlockData} mineBlock={mineBlock} peer={currentPeer} />
            : null
        }
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
