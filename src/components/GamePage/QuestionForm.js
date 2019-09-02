import React from 'react'
import { Input, Progress } from 'antd'
import styled from 'styled-components'

import Kanji from './Kanji'

const Container = styled.div`
  margin: 0 auto;
  width: 40%;
  text-align: center;
`

const QuestionForm = ({
  kanjiObject,
  answer,
  setAnswer,
  onSubmitAnswer,
  timeRemaningForAnswer,
  TIME_PER_ANSWER
}) => {
  return (
    <Container>
      <Kanji kanjiObject={kanjiObject} />
      <Input
        size='large'
        placeholder='Keyword'
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        onPressEnter={() => onSubmitAnswer(answer)}
      />
      {timeRemaningForAnswer === null ? null : (
        <Progress
          percent={(timeRemaningForAnswer * 100) / TIME_PER_ANSWER}
          size='small'
          status='active'
          showInfo={false}
          strokeColor={{
            from: '#FFCE54',
            to: '#FFCE54'
          }}
        />
      )}
    </Container>
  )
}

export default QuestionForm
