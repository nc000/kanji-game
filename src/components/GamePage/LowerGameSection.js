import React from 'react'
import styled from 'styled-components'

import Multiplier from './Multiplier'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 20px;
  width: 100%;
`

const Button = styled.button`
  display: block;
  font-size: 30px;
  width: 100px;
  background: transparent;
  color: black;
  border: none;
`

const LowerGameSection = ({
  multiplier,
  soundOn,
  setSoundOn,
  setModalVisible
}) => {
  const volumeIconToDisplay = soundOn ? (
    <i className='fas fa-volume-up'></i>
  ) : (
    <i className='fas fa-volume-mute'></i>
  )

  return (
    <Container>
      <Multiplier multiplier={multiplier} />
      <div>
        <Button onClick={() => setSoundOn(!soundOn)}>
          {volumeIconToDisplay}
        </Button>
        <Button onClick={() => setModalVisible(true)}>
          <i className='fas fa-door-open'></i>
        </Button>
      </div>
    </Container>
  )
}

export default LowerGameSection
