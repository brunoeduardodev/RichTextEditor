import React, { useState, useMemo, useCallback } from 'react'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, withReact } from 'slate-react'

import { toggleMark } from '@utils/mark'

import ActionButton from '@components/ActionButton'
import AlignmentButton from '@components/AlignmentButton'
import BlockButton from '@components/BlockButton'

import {
  Container,
  EditableArea,
  ActionArea,
  ButtonDivisor,
  MobileWarning
} from '@styles/index'
const Home: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const [value, setValue] = useState<any>([
    {
      type: 'paragraph',
      alignment: 'left',
      children: [{ text: 'A line of text in a paragraph.' }]
    }
  ])

  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])

  const renderElement = useCallback((props) => <Element {...props} />, [])

  const onKeyDown = useCallback(
    (event) => {
      if (!event.ctrlKey) {
        return
      }

      switch (event.key) {
        case 'b': {
          event.preventDefault()
          toggleMark('bold', editor)
          break
        }

        case 'i': {
          event.preventDefault()
          toggleMark('italic', editor)
          break
        }

        case 'u': {
          event.preventDefault()
          toggleMark('underline', editor)
          break
        }
      }
    },
    [editor]
  )

  return (
    <>
      <Container>
        <Slate
          editor={editor}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <ActionArea>
            <ActionButton mark="bold" />
            <ActionButton mark="italic" />
            <ActionButton mark="underline" />
            <ActionButton mark="code" />
            <ButtonDivisor />
            <BlockButton block="h1" />
            <BlockButton block="h2" />
            <BlockButton block="h3" />
            <BlockButton block="ul" />
            <BlockButton block="ol" />
            <BlockButton block="blockquote" />
            <ButtonDivisor />
            <AlignmentButton alignment="left" />
            <AlignmentButton alignment="center" />
            <AlignmentButton alignment="right" />
            <AlignmentButton alignment="justify" />
          </ActionArea>
          <EditableArea
            renderLeaf={renderLeaf}
            renderElement={renderElement}
            onKeyDown={onKeyDown}
            autoFocus
          />
        </Slate>
      </Container>
      <MobileWarning>
        Unfortunately, this example doesn't work on mobile devices{' '}
      </MobileWarning>
    </>
  )
}

const Element = ({ attributes, children, element, ...rest }) => {
  attributes.style = { textAlign: element.alignment }

  switch (element.type) {
    case 'h1':
      return <h1 {...attributes}>{children}</h1>
    case 'h2':
      return <h2 {...attributes}>{children}</h2>
    case 'h3':
      return <h3 {...attributes}>{children}</h3>
    case 'li':
      return <li {...attributes}>{children}</li>
    case 'ul':
      return <ul {...attributes}>{children}</ul>
    case 'ol':
      return <ol {...attributes}>{children}</ol>
    case 'blockquote':
      return <blockquote {...attributes}>{children}</blockquote>
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ leaf, attributes, children }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }
  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  return <span {...attributes}>{children}</span>
}

export default Home
