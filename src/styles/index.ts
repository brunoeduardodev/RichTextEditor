import { Editable } from 'slate-react'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media only screen and (max-device-width: 768px) {
    display: none;
  }
`
export const EditableArea = styled(Editable)`
  background-color: #fff;
  min-height: 320px;
  width: 70vw;
  padding: 24px;

  @media (max-width: 700px) {
    width: 95vw;
  }
`

export const ActionArea = styled.div`
  background-color: #fff;
  width: 70vw;
  border-bottom: 1px solid #eee;
  margin-top: 24px;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 700px) {
    width: 95vw;
  }
`

export const ButtonDivisor = styled.span`
  margin: 0 12px;

  @media (max-width: 525px) {
    margin: 0;
  }
`

export const MobileWarning = styled.h1`
  display: none;

  @media only screen and (max-device-width: 768px) {
    display: flex;
  }
`
