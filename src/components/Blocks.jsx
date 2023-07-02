/* eslint-disable react/prop-types */
import './Blocks.css'
import { isValidHash, isValidBlock } from '../utils'

function Block ({ index, hash, previousHash, data, timestamp, nonce, changeBlockData, mineBlock }) {
  const hashClass = `block--hash${isValidHash(hash) ? ' valid' : ''}`
  const previousHashClass = `block--previousHash${isValidHash(previousHash) ? ' valid' : ''}`

  function handleInputChange (event) {
    changeBlockData({ newData: event.target.value, blockIndex: index })
  }

  return (
    <li className='block'>
      <div>
        <label htmlFor={`block-${index}-data`}>Data: </label>
        <input
          id={`block-${index}-data`}
          name={`block-${index}-data`}
          type='text'
          defaultValue={data}
          onChange={handleInputChange}
        />
      </div>
      <div>Previous Hash: <span className={previousHashClass}>{previousHash}</span></div>
      <div>Hash: <span className={hashClass}>{hash}</span></div>
      <div><strong>Block #{index} </strong><label>on {new Date(timestamp).toLocaleString()}</label></div>
      <div className='block--nonce'>
        {
          isValidBlock(...arguments)
            ? <label>{nonce}</label>
            : <button className='mine-btn' onClick={() => mineBlock(index)}>Mine</button>
        }
      </div>
    </li>
  )
}

/* eslint-disable react/prop-types */
export function Blocks ({ blocks, changeBlockData, mineBlock, peer }) {
  return (
    <ul className='blocks'>
      {
        blocks.map(block => (
          <Block key={`${peer}-${block.index}`} changeBlockData={changeBlockData} mineBlock={mineBlock} {...block} />
        ))
      }
    </ul>
  )
}
