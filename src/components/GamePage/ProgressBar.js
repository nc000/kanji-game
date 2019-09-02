import React from 'react'
import styled from 'styled-components'
import { Progress } from 'antd'

const Container = styled.div`
  margin: 0;
`

const ProgressBar = ({ totalTimeRemaining, timeLimit }) => {
  if (totalTimeRemaining === null || timeLimit === null) {
    return null
  }

  return (
    <Container>
      <Progress
        strokeColor={{
          from: '#87d068',
          to: '#87d068'
        }}
        strokeWidth={20}
        percent={(totalTimeRemaining * 100) / timeLimit}
        showInfo={false}
      />
    </Container>
  )
}

export default ProgressBar
