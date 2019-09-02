import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: 30px;
  font-weight: bold;
  width: 30%;
  margin: 20px;
`

const Multiplier = ({ multiplier }) => {
  return (
    <Container>
      <span>Multiplier:</span> <br />
      <span>x{multiplier}</span>
    </Container>
  )
}

export default Multiplier
