export function isValidHash (hash) {
  return hash.startsWith('000')
}

export function isValidBlock (block) {
  return isValidHash(block.hash) && isValidHash(block.previousHash)
}
