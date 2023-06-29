import { useEffect, useState } from 'react'

export function useBlocks () {
  const [blocks, setBlocks] = useState([])

  const generateInitialBlock = async () => {
    const initialBlock = {
      data: 'Welcome to Blockchain Demo',
      hash: '0',
      previousHash: 0,
      index: 0,
      timestamp: Date.now(),
      nonce: 0
    }

    const blockData = initialBlock.index +
      initialBlock.previousHash + initialBlock.timestamp +
      initialBlock.data + initialBlock.nonce

    const generatedHashAsArrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(blockData))

    const hashArray = new Uint8Array(generatedHashAsArrayBuffer)
    const hashInHex = hashArray.reduce((a, b) => a + b.toString(16).padStart(2, '0'), '')

    initialBlock.hash = hashInHex
    setBlocks([initialBlock])
  }

  useEffect(() => { generateInitialBlock() }, [])

  return {
    blocks
  }
}
