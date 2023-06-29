export function Blocks ({ blocks }) {
  return (
    blocks.map(block => (
      <div key={block.index} className='block' style={{ backgroundColor: 'grey' }}>
        <div>
          <label htmlFor={`block-${block.index}-data`}>Data</label>
          <input id={`block-${block.index}-data`} type='text' value={block.data} readOnly />
        </div>
        <div>Previous Hash: {block.previousHash}</div>
        <div>Hash: {block.hash}</div>
        <div><strong>Block #{block.index}</strong> on {new Date(block.timestamp).toLocaleString()}</div>
        <div>{block.nonce}</div>
      </div>
    ))
  )
}
