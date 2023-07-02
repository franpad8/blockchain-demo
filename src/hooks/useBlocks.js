import { useEffect, useState } from 'react'
import { isValidHash, generateHashFor, updateBlocksFromIndex, generateNewValidHash } from '../utils'

export function useBlocks () {
  const [blocks, setBlocks] = useState([])

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

  async function changeBlockData ({ newData, blockIndex }) {
    const newBlocks = structuredClone(blocks)
    const blockToUpdate = newBlocks[blockIndex]
    blockToUpdate.data = newData
    blockToUpdate.hash = await generateHashFor(blockToUpdate)

    await updateBlocksFromIndex(newBlocks, blockIndex + 1)

    setBlocks(newBlocks)
  }

  async function mineBlock (blockIndex) {
    const newBlocks = structuredClone(blocks)
    const blockToUpdate = newBlocks[blockIndex]
    blockToUpdate.nonce = 1
    blockToUpdate.hash = await generateNewValidHash(blockToUpdate)

    await updateBlocksFromIndex(newBlocks, blockIndex + 1)

    setBlocks(newBlocks)
  }

  useEffect(() => { generateNextBlock('Welcome to Blockchain Demo') }, [])

  return {
    blocks,
    generateNextBlock,
    isValidHash,
    changeBlockData,
    mineBlock
  }
}
