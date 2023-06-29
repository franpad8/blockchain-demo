import { useEffect, useState } from 'react'

export function useBlocks () {
  const [blocks, setBlocks] = useState([])

  async function generateNewHash (block) {
    const blockData = block.index +
      block.previousHash + block.timestamp +
      block.data + block.nonce

    const generatedHashAsArrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(blockData))

    const hashArray = new Uint8Array(generatedHashAsArrayBuffer)
    const hashInHex = hashArray.reduce((a, b) => a + b.toString(16).padStart(2, '0'), '')
    return hashInHex
  }

  const generateInitialBlock = async () => {
    const initialBlock = {
      data: 'Welcome to Blockchain Demo',
      hash: '0',
      previousHash: 0,
      index: 0,
      timestamp: Date.now(),
      nonce: 1
    }

    initialBlock.hash = await generateNewHash(initialBlock)
    setBlocks([initialBlock])
  }

  async function generateNextBlock (data) {
    const { hash: previousHash, index: previousIndex } = blocks[blocks.length - 1]
    const newBlock = {
      data,
      previousHash,
      hash: '0',
      index: previousIndex + 1,
      timestamp: Date.now(),
      nonce: 1
    }
    newBlock.hash = await generateNewHash(newBlock)
    setBlocks(prevState => [...prevState, newBlock])
  }

  useEffect(() => { generateInitialBlock() }, [])

  return {
    blocks,
    generateNextBlock
  }
}
