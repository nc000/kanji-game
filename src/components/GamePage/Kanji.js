import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-bottom: 20px;

  > span:nth-of-type(1) {
    font-size: 20px;
    text-align: 'left';
  }

  > span:nth-of-type(2) {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 125px;
    text-align: 'center';
  }
`

const Kanji = ({ kanjiObject }) => {
  if (kanjiObject === null) return null

  return (
    <Container>
      <span># {kanjiObject.number}</span> <br />
      <span>{kanjiObject.kanji}</span>
    </Container>
  )
}

export default Kanji
