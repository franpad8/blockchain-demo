import './Blocks.css'

/* eslint-disable react/prop-types */
export function Blocks ({ blocks }) {
  return (
    <ul className='blocks'>
      {
        blocks.map(block => (
          <li key={block.index} className='block'>
            <div>
              <label htmlFor={`block-${block.index}-data`}>Data: </label>
              <input id={`block-${block.index}-data`} type='text' value={block.data} readOnly />
            </div>
            <div>Previous Hash: <span style={{ color: 'red' }}>{block.previousHash}</span></div>
            <div>Hash: <span style={{ color: 'red' }}>{block.hash}</span></div>
            <div><strong>Block #{block.index} </strong><label>on {new Date(block.timestamp).toLocaleString()}</label></div>
            <div className='block--nonce'><label>{block.nonce}</label></div>
          </li>
        ))
      }
    </ul>
  )
}
