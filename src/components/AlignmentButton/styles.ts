import styled from 'styled-components'

interface Props {
  active: boolean
}

export const Container = styled.div<Props>`
  color: ${({ active }) => (active ? '#000' : '#AAA')};

  cursor: pointer;
  width: 20px;
  height: 20px;

  transition: 0.2s;
  margin: 6px;
  &:hover {
    background-color: #eee;
  }
`
