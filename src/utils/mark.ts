import { Editor, Transforms } from 'slate'

const SIZE_GROUP = ['h1', 'h2', 'h3']
const LISTS = ['ul', 'ol']
const GROUPS = [SIZE_GROUP]

export function getMarkGroup(mark: string): string[] {
  for (let i = 0; i < GROUPS.length; i++) {
    if (GROUPS[i].includes(mark)) return GROUPS[i]
  }

  return []
}

export function isMarkActive(mark: string, editor: Editor): boolean {
  const marks = Editor.marks(editor)
  return marks ? marks[mark] === true : false
}

export function toggleMark(mark: string, editor: Editor): void {
  const isActive = isMarkActive(mark, editor)

  const markGroup = getMarkGroup(mark)
  if (markGroup.length > 0) {
    toggleGroupMark(markGroup, mark, editor)
    return
  }

  if (isActive) {
    Editor.removeMark(editor, mark)
  } else {
    Editor.addMark(editor, mark, true)
  }
}

export function toggleGroupMark(
  group: string[],
  mark: string,
  editor: Editor
): void {
  const isActive = isMarkActive(mark, editor)

  if (isActive) {
    Editor.removeMark(editor, mark)
    return
  }

  group.forEach((eachMark) => {
    Editor.removeMark(editor, eachMark)
  })

  Editor.addMark(editor, mark, true)
}

export function isBlockActive(block: string, editor: Editor): boolean {
  const match = Editor.nodes(editor, {
    match: (n) => n.type === block
  })

  const firstMatch = match.next()
  return firstMatch.value !== undefined
}

export function toggleBlock(block: string, editor: Editor): void {
  const isActive = isBlockActive(block, editor)
  const isList = LISTS.includes(block)

  Transforms.unwrapNodes(editor, {
    match: (n) => LISTS.includes(n.type as string),
    split: true
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'li' : block,
    other: 'right'
  })

  if (!isActive && isList) {
    const newBlock = { type: block, children: [] }
    Transforms.wrapNodes(editor, newBlock)
  }
}

export function isAlignmentActive(alignment: string, editor: Editor): boolean {
  const match = Editor.nodes(editor, {
    match: (n) => n.alignment === alignment
  })

  const firstMatch = match.next()

  return firstMatch.value !== undefined
}

export function toggleAlignment(alignment: string, editor: Editor): void {
  editor.cc
  const isActive = isAlignmentActive(alignment, editor)
  Transforms.setNodes(editor, {
    alignment: isActive ? 'left' : alignment
  })
}
