import { useEffect, useState } from 'react'
import { isValidHash } from '../utils'

async function generateHashFor (block) {
  const payload = getPayloadFrom(block)
  const generatedHashAsArrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload))
  const hashArray = new Uint8Array(generatedHashAsArrayBuffer)
  const hashInHex = hashArray.reduce((a, b) => a + b.toString(16).padStart(2, '0'), '')

  return hashInHex
}

function getPayloadFrom (block) {
  return block.index +
    block.previousHash + block.timestamp +
    block.data + block.nonce
}

export function useBlocks () {
  const [blocks, setBlocks] = useState([])

  async function generateNewValidHash (block) {
    let hash
    while (true) {
      hash = await generateHashFor(block)
      if (isValidHash(hash)) return hash
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

  async function updateBlockChain ({ newData, blockIndex }) {
    const newBlocks = [...blocks]
    let blockToUpdate = newBlocks[blockIndex]
    blockToUpdate.data = newData
    blockToUpdate.hash = await generateHashFor(blockToUpdate)

    // Update following blocks' hashes and previous hashes
    for (let i = blockIndex + 1; i < blocks.length; i++) {
      blockToUpdate = newBlocks[i]
      blockToUpdate.previousHash = newBlocks[i - 1].hash
      blockToUpdate.hash = await generateHashFor(blockToUpdate)
    }

    setBlocks(newBlocks)
  }

  useEffect(() => { generateNextBlock('Welcome to Blockchain Demo') }, [])

  return {
    blocks,
    generateNextBlock,
    isValidHash,
    updateBlockChain
  }
}
