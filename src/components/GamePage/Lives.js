import React from 'react'
import styled from 'styled-components'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Container = styled.div`
  > span {
    color: #ff78ae;
  }

  i {
    margin-right: 3px;
  }
`

const Lives = ({ lives }) => {
  let livesText = []
  for (let i = 0; i < lives; i++) {
    livesText.push(
      <CSSTransition timeout={300} classNames='fade' key={i} unmountOnExit>
        <i className='fas fa-heart' key={i}></i>
      </CSSTransition>
    )
  }

  return (
    <Container>
      <span>
        <TransitionGroup>{livesText}</TransitionGroup>
      </span>
    </Container>
  )
}

export default Lives
