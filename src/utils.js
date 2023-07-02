export function getInitialBlock () {
  return {
    data: 'Welcome to Blockchain Demo',
    previousHash: '000',
    hash: '0',
    index: 0,
    timestamp: Date.now(),
    nonce: 1
  }
}

export function isValidHash (hash) {
  return hash.startsWith('000')
}

export function isValidBlock (block) {
  return isValidHash(block.hash) && isValidHash(block.previousHash)
}

function getPayloadFrom (block) {
  return block.index +
    block.previousHash + block.timestamp +
    block.data + block.nonce
}

// Update following blocks' hashes and previous hashes
export async function updateBlocksFromIndex (blocks, index) {
  let blockToUpdate
  for (let i = index; i < blocks.length; i++) {
    blockToUpdate = blocks[i]
    blockToUpdate.previousHash = blocks[i - 1].hash
    blockToUpdate.hash = await generateHashFor(blockToUpdate)
  }
}

export async function generateHashFor (block) {
  const payload = getPayloadFrom(block)
  const generatedHashAsArrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(payload))
  const hashArray = new Uint8Array(generatedHashAsArrayBuffer)
  const hashInHex = hashArray.reduce((a, b) => a + b.toString(16).padStart(2, '0'), '')

  return hashInHex
}

export async function generateNewValidHash (block) {
  let hash
  while (true) {
    hash = await generateHashFor(block)
    if (isValidHash(hash)) return hash
    block.nonce++
    block.timestamp = Date.now()
  }
}
