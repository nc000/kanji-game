import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  padding-top: 10%;
  width: 70%;
  font-size: 20px;
`

const Title = styled.h1`
  font-size: 50px;
`

const StyledButtonGroup = styled(Button.Group)`
  margin: 0 auto;

  > button {
    height: 50px;
    width: 120px;
    margin: 10px;
  }
`

const Results = ({ results, handlePlayAgain, handleHomeButtonClick }) => {
  return (
    <Container>
      <Title>Results</Title>
      <p>Your score: {results.score}</p>
      <p>Your highest score: {localStorage.getItem('highestScore')}</p>
      <p>Correct answers: {results.correctKanji.length}</p>
      <p>Incorrect answers: {results.incorrectKanji.length}</p>

      <StyledButtonGroup>
        <Button size='large' onClick={handleHomeButtonClick}>
          Home
        </Button>
        <Button type='primary' size='large' onClick={handlePlayAgain}>
          Play again
        </Button>
      </StyledButtonGroup>
    </Container>
  )
}

export default Results
