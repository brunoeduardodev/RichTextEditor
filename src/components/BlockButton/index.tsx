import React from 'react'
import { useSlate } from 'slate-react'
import {
  LooksOne,
  LooksTwo,
  Looks3,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote
} from 'styled-icons/material'

import { isBlockActive, toggleBlock } from '@utils/mark'

import { Container } from './styles'

interface Props {
  block: string
}

const iconsDictionary = {
  h1: LooksOne,
  h2: LooksTwo,
  h3: Looks3,
  ul: FormatListBulleted,
  ol: FormatListNumbered,
  blockquote: FormatQuote
}

const BlockButton: React.FC<Props> = ({ block }) => {
  const editor = useSlate()
  const active = isBlockActive(block, editor)

  const Icon = iconsDictionary[block]

  const toggle = (event) => {
    event.preventDefault()
    toggleBlock(block, editor)
    return false
  }

  return (
    <Container active={active} onMouseDown={toggle}>
      <Icon />
    </Container>
  )
}

export default BlockButton
