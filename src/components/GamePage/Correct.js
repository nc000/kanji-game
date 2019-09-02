import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: #52C41A;
`

const Correct = ({ numCorrect }) => {
  return (
    <Container>
      <span>
        <i className='fas fa-check'></i> {numCorrect}
      </span>
    </Container>
  )
}

export default Correct
