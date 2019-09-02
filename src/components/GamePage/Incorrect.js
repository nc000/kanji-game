import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: #F5222D;
`

const Incorrect = ({ numIncorrect }) => {
  return (
    <Container>
      <span>
        <i className='fas fa-times'></i> {numIncorrect}
      </span>
    </Container>
  )
}

export default Incorrect
