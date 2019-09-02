import React from 'react'
import { Radio } from 'antd'
import styled from 'styled-components'

const Container = styled.div`
  padding: 10px;
  text-align: left;
  margin-left: 33%;

  > * {
    &:not(:first-child) {
      margin-top: 10px;
    }
  }
`

const Row = styled.div`
  &:not(:first-child) {
    margin-top: 10px;
  }

  > span {
    display: inline-block;
    text-align: right;
    width: 100px;
    padding: 5px;
  }

  > * > * {
    text-align: center;
    width: 100px;
  }
`

const Settings = ({ defaultValues, setRange, setLives, setTimeLimit, setOrder }) => {
  return (
    <Container>
      <Row>
        <span>Range</span>
        <Radio.Group
          defaultValue={defaultValues.range}
          name='range'
          onChange={e => setRange(e.target.value)}
        >
          <Radio.Button value='RTK1'>RTK1</Radio.Button>
          <Radio.Button value='RTK3'>RTK3</Radio.Button>
          <Radio.Button value='RTK1+3'>RTK1+3</Radio.Button>
        </Radio.Group>
      </Row>
      <Row>
        <span>Lives</span>
        <Radio.Group
          defaultValue={defaultValues.lives}
          name='lives'
          onChange={e => setLives(e.target.value)}
        >
          <Radio.Button value='3'>
            <i className='far fa-heart'></i>
            <i className='far fa-heart'></i>
            <i className='far fa-heart'></i>
          </Radio.Button>
          <Radio.Button value='infinite'>
            <i className='fas fa-infinity'></i>
          </Radio.Button>
        </Radio.Group>
      </Row>
      <Row>
        <span>Time Limit</span>
        <Radio.Group
          defaultValue={defaultValues.timeLimit}
          name='timeLimit'
          onChange={e => setTimeLimit(e.target.value)}
        >
          <Radio.Button value='1m'>1m</Radio.Button>
          <Radio.Button value='3m'>3m</Radio.Button>
          <Radio.Button value='5m'>5m</Radio.Button>
          <Radio.Button value='10m'>10m</Radio.Button>
          <Radio.Button value='infinite'>
            <i className='fas fa-infinity'></i>
          </Radio.Button>
        </Radio.Group>
      </Row>
      <Row>
        <span>Order</span>
        <Radio.Group
          defaultValue={defaultValues.order}
          name='order'
          onChange={e => setOrder(e.target.value)}
        >
          <Radio.Button value='RTK'>RTK</Radio.Button>
          <Radio.Button value='random'>Random</Radio.Button>
        </Radio.Group>
      </Row>
    </Container>
  )
}

export default Settings
