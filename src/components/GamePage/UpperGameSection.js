import React from 'react'
import styled from 'styled-components'

import Correct from './Correct'
import Incorrect from './Incorrect'
import Lives from './Lives'
import Score from './Score'
import Accuracy from './Accuracy'

const Container = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding: 20px;
  display: flex;
  justify-content: space-between;

  > div:nth-of-type(1) {
    width: 30%;
  }

  > div:nth-of-type(2) {
    width: 30%;
    text-align: right
  }
`

const UpperGameSection = ({
  lives,
  correctKanji,
  incorrectKanji,
  score,
  accuracy
}) => {
  return (
    <Container>
      <div>
        {lives !== null ? <Lives lives={lives} /> : null}
        <Correct numCorrect={correctKanji.length} />
        <Incorrect numIncorrect={incorrectKanji.length} />
      </div>
      <div>
        <Score score={score} />
        <Accuracy accuracy={accuracy} />
      </div>
    </Container>
  )
}

export default UpperGameSection
