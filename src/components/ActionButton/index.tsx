import React from 'react'
import { useSlate } from 'slate-react'
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code
} from 'styled-icons/material'

import { isMarkActive, toggleMark } from '@utils/mark'

import { Container } from './styles'

interface Props {
  mark: string
}

const iconsDictionary = {
  bold: FormatBold,
  italic: FormatItalic,
  underline: FormatUnderlined,
  code: Code
}

const ActionButton: React.FC<Props> = ({ mark }) => {
  const editor = useSlate()
  const active = isMarkActive(mark, editor)

  const Icon = iconsDictionary[mark]

  const toggle = (event) => {
    event.preventDefault()
    toggleMark(mark, editor)
    return false
  }

  return (
    <Container active={active} onMouseDown={toggle}>
      <Icon />
    </Container>
  )
}

export default ActionButton
