import { useEffect, useState } from 'react'

async function generateHash (payload) {
  const generatedHashAsArrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload))
  const hashArray = new Uint8Array(generatedHashAsArrayBuffer)
  const hashInHex = hashArray.reduce((a, b) => a + b.toString(16).padStart(2, '0'), '')

  return hashInHex
}

export function useBlocks () {
  const [blocks, setBlocks] = useState([])

  function checkIfHashIsValid (hash) {
    return hash.startsWith('000')
  }

  async function generateNewValidHash (block) {
    let blockData
    let hash
    while (true) {
      blockData = block.index +
        block.previousHash + block.timestamp +
        block.data + block.nonce
      hash = await generateHash(blockData)
      if (checkIfHashIsValid(hash)) return hash
      block.nonce++
      block.timestamp = Date.now()
    }
  }

  async function generateNextBlock (data) {
    const { hash: previousHash, index: previousIndex } = blocks[blocks.length - 1] || { hash: '000', index: -1 }

    const newBlock = {
      data,
      previousHash,
      index: previousIndex + 1,
      timestamp: Date.now(),
      nonce: 1
    }

    newBlock.hash = await generateNewValidHash(newBlock)
    setBlocks(prevState => [...prevState, newBlock])
  }

  useEffect(() => { generateNextBlock('Welcome to Blockchain Demo') }, [])

  return {
    blocks,
    generateNextBlock,
    checkIfHashIsValid
  }
}
