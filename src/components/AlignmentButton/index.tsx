import React from 'react'
import { useSlate } from 'slate-react'
import {
  FormatAlignLeft,
  FormatAlignRight,
  FormatAlignCenter,
  FormatAlignJustify
} from 'styled-icons/material'

import { isAlignmentActive, toggleAlignment } from '@utils/mark'

import { Container } from './styles'

interface Props {
  alignment: string
}

const iconsDictionary = {
  left: FormatAlignLeft,
  center: FormatAlignCenter,
  right: FormatAlignRight,
  justify: FormatAlignJustify
}

const AlignmentButton: React.FC<Props> = ({ alignment }) => {
  const editor = useSlate()
  const active = isAlignmentActive(alignment, editor)

  const Icon = iconsDictionary[alignment]

  const toggle = (event) => {
    event.preventDefault()
    toggleAlignment(alignment, editor)
    return false
  }

  return (
    <Container active={active} onMouseDown={toggle}>
      <Icon />
    </Container>
  )
}

export default AlignmentButton
