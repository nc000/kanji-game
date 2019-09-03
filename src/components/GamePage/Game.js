import React, { useState, useEffect } from 'react'
import { notification, Modal } from 'antd'

import shuffleArray from '../../utils/ArrayHelpers'

import ProgressBar from './ProgressBar'
import UpperGameSection from './UpperGameSection'
import LowerGameSection from './LowerGameSection'
import QuestionForm from './QuestionForm'

import RTK1 from '../../data/rtk1'
import RTK3 from '../../data/rtk3'

import correctSoundWav from '../../sounds/correct.wav'
import incorrectSoundWav from '../../sounds/incorrect.wav'

const correctSound = new Audio(correctSoundWav)
correctSound.type = 'wav'
const incorrectSound = new Audio(incorrectSoundWav)
incorrectSound.type = 'wav'

const Game = ({ settings, handleGameEnd }) => {
  const [allKanji, setAllKanji] = useState(null)
  const [lives, setLives] = useState(null)
  const [correctKanji, setCorrectKanji] = useState([])
  const [incorrectKanji, setIncorrectKanji] = useState([])
  const [score, setScore] = useState(0)
  const [multiplier, setMultiplier] = useState(0)
  const [kanjiObject, setKanjiObject] = useState(null)
  const [answer, setAnswer] = useState('')
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(null)
  const [timeLimit, setTimeLimit] = useState(null)
  const [timeRemaningForAnswer, setTimeRemaningForAnswer] = useState(null)
  const [soundOn, setSoundOn] = useState(false)
  const [modalVisible, setModalVisible] = useState(false) // Used to stop the timers when the modal pops up
  const [gameEnd, setGameEnd] = useState(false)

  const TIME_PER_ANSWER = 10 * 1000
  const POINTS_PER_ANSWER = 1000

  const accuracy =
    correctKanji.length + incorrectKanji.length === 0
      ? '100.00'
      : (
          (100 * correctKanji.length) /
          (correctKanji.length + incorrectKanji.length)
        ).toFixed(2)

  const configureGame = () => {
    if (settings.lives === '3') {
      setLives(3)
    }

    let kanjiArray
    switch (settings.range) {
      case 'RTK1':
        kanjiArray = RTK1
        break
      case 'RTK3':
        kanjiArray = RTK3
        break
      default:
        kanjiArray = RTK1.concat(RTK3)
    }

    if (settings.order === 'random') {
      shuffleArray(kanjiArray)
    }

    setKanjiObject(kanjiArray[0])
    setAllKanji(kanjiArray.slice(1))

    if (settings.timeLimit !== 'infinite') {
      switch (settings.timeLimit) {
        case '1m':
          setTimeLimit(1 * 60 * 1000)
          setTotalTimeRemaining(1 * 60 * 1000)
          break
        case '3m':
          setTimeLimit(3 * 60 * 1000)
          setTotalTimeRemaining(3 * 60 * 1000)
          break
        case '5m':
          setTimeLimit(5 * 60 * 1000)
          setTotalTimeRemaining(5 * 60 * 1000)
          break
        case '10m':
          setTimeLimit(10 * 60 * 1000)
          setTotalTimeRemaining(10 * 60 * 1000)
          break
        default:
          setTimeLimit(1 * 60 * 1000)
          setTotalTimeRemaining(1 * 60 * 1000)
      }
    }

    setTimeRemaningForAnswer(TIME_PER_ANSWER)
  }

  const onSubmitAnswer = answer => {
    console.log(kanjiObject)
    const answerIsCorrect =
      answer.toLowerCase() === kanjiObject.keyword.toLowerCase() ||
      kanjiObject.alternativeKeywords
        .map(keyword => keyword.toLowerCase())
        .includes(answer.toLowerCase())
    if (answerIsCorrect) {
      if (soundOn) correctSound.play()
      notification['success']({
        message: 'Correct!',
        duration: 3,
        placement: 'bottomRight'
      })
      setScore(score + POINTS_PER_ANSWER * (1 + multiplier))
      setMultiplier(multiplier + 1)
      setCorrectKanji(correctKanji.concat([kanjiObject]))
    } else {
      if (soundOn) incorrectSound.play()
      notification['error']({
        message: 'Incorrect',
        description: `Correct keyword was '${kanjiObject.keyword}'`,
        duration: 3,
        placement: 'bottomRight'
      })
      setLives(lives - 1)
      setMultiplier(0)
      setIncorrectKanji(incorrectKanji.concat([kanjiObject]))
    }

    const gameFinished =
      allKanji.length === 0 || (lives === 1 && !answerIsCorrect)
    if (gameFinished) {
      setGameEnd(true)
    } else {
      setKanjiObject(allKanji[0])
      setAllKanji(allKanji.slice(1))
      setTimeRemaningForAnswer(TIME_PER_ANSWER)
      setAnswer('')
    }
  }

  const onOk = () => {
    setModalVisible(false)
    setGameEnd(true)
  }

  const onCancel = () => {
    setTimeRemaningForAnswer(TIME_PER_ANSWER)
    if (totalTimeRemaining > 0) {
      setTimeout(
        () =>
          setTotalTimeRemaining(
            totalTimeRemaining => totalTimeRemaining - 1000
          ),
        1000
      )
    }
    setModalVisible(false)
  }

  useEffect(() => {
    configureGame()
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    let timeout
    if (timeRemaningForAnswer !== null && !modalVisible) {
      if (timeRemaningForAnswer > 0) {
        timeout = setTimeout(
          () =>
            setTimeRemaningForAnswer(
              timeRemaningForAnswer => timeRemaningForAnswer - 1000
            ),
          1000
        )
      } else {
        onSubmitAnswer(answer)
      }
    }

    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [timeRemaningForAnswer])

  useEffect(() => {
    let timeout
    if (totalTimeRemaining !== null && !modalVisible) {
      console.log(totalTimeRemaining)
      if (totalTimeRemaining > 0) {
        timeout = setTimeout(
          () =>
            setTotalTimeRemaining(
              totalTimeRemaining => totalTimeRemaining - 1000
            ),
          1000
        )
      } else {
        setGameEnd(true)
      }
    }

    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [totalTimeRemaining])

  useEffect(() => {
    console.log(incorrectKanji)
    if (gameEnd) {
      const results = {
        score,
        accuracy,
        correctKanji,
        incorrectKanji
      }
      handleGameEnd(results)
    }
    // eslint-disable-next-line
  }, [gameEnd])

  return (
    <>
      <ProgressBar
        totalTimeRemaining={totalTimeRemaining}
        timeLimit={timeLimit}
      />

      <Modal
        title='Exit'
        visible={modalVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <p>Exit to the results page?</p>
      </Modal>

      <UpperGameSection
        lives={lives}
        correctKanji={correctKanji}
        incorrectKanji={incorrectKanji}
        score={score}
        accuracy={accuracy}
      />

      <QuestionForm
        kanjiObject={kanjiObject}
        answer={answer}
        setAnswer={setAnswer}
        onSubmitAnswer={onSubmitAnswer}
        timeRemaningForAnswer={timeRemaningForAnswer}
        TIME_PER_ANSWER={TIME_PER_ANSWER}
      />

      <LowerGameSection
        multiplier={multiplier}
        soundOn={soundOn}
        setSoundOn={setSoundOn}
        setModalVisible={setModalVisible}
      />
    </>
  )
}

export default Game
