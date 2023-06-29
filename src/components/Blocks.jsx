/* eslint-disable react/prop-types */
import { useBlocks } from '../hooks/useBlocks'
import './Blocks.css'

function Block ({ block }) {
  const { checkIfHashIsValid } = useBlocks()
  const hashClass = `block--hash${checkIfHashIsValid(block.hash) ? ' valid' : ''}`
  const previousHashClass = `block--previousHash${checkIfHashIsValid(block.previousHash) ? ' valid' : ''}`

  return (
    <li className='block'>
      <div>
        <label htmlFor={`block-${block.index}-data`}>Data: </label>
        <input id={`block-${block.index}-data`} type='text' value={block.data} readOnly />
      </div>
      <div>Previous Hash: <span className={previousHashClass}>{block.previousHash}</span></div>
      <div>Hash: <span className={hashClass}>{block.hash}</span></div>
      <div><strong>Block #{block.index} </strong><label>on {new Date(block.timestamp).toLocaleString()}</label></div>
      <div className='block--nonce'><label>{block.nonce}</label></div>
    </li>
  )
}

/* eslint-disable react/prop-types */
export function Blocks ({ blocks }) {
  return (
    <ul className='blocks'>
      {
        blocks.map(block => (
          <Block key={block.index} block={block} />
        ))
      }
    </ul>
  )
}
