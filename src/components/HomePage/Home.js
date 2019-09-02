import React, { useState } from 'react'
import { Button } from 'antd'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

import Settings from './Settings'

const Form = styled.form`
  text-align: center;
  display: block;
  margin: 0 auto;
  padding-top: 10%;
  width: 70%;
`

const Title = styled.h1`
  font-size: 40px;
  font-family: 'Press Start 2P', cursive;
  padding-bottom: 10%;
`

const StyledButtonGroup = styled(Button.Group)`
  margin: 0 auto;
`

const StyledButton = styled(Button)`
  height: 50px;
  width: 120px;
  margin: 10px;
`

const Home = ({ handlePlayClick, settings }) => {
  const [showSettings, setShowSettings] = useState(false)
  const [range, setRange] = useState(
    settings !== null ? settings.range : 'RTK1+3'
  )
  const [lives, setLives] = useState(
    settings !== null ? settings.lives : 'infinite'
  )
  const [timeLimit, setTimeLimit] = useState(
    settings !== null ? settings.timeLimit : '3m'
  )
  const [order, setOrder] = useState(
    settings !== null ? settings.order : 'random'
  )

  const onSubmit = e => {
    e.preventDefault()
    const settings = {
      range,
      lives,
      timeLimit,
      order
    }
    handlePlayClick(settings)
  }

  return (
    <Form>
      <Title>KANJI RECOGNITION GAME</Title>
      <StyledButtonGroup>
        <StyledButton
          size='large'
          onClick={() => setShowSettings(!showSettings)}
        >
          Settings
        </StyledButton>
        <StyledButton type='primary' size='large' onClick={onSubmit}>
          Play
        </StyledButton>
      </StyledButtonGroup>

      <CSSTransition
        in={showSettings}
        timeout={300}
        classNames='fade'
        unmountOnExit
      >
        <Settings
          defaultValues={{ range, lives, timeLimit, order }}
          setRange={setRange}
          setLives={setLives}
          setTimeLimit={setTimeLimit}
          setOrder={setOrder}
        />
      </CSSTransition>
    </Form>
  )
}

export default Home
