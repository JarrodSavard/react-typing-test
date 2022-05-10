import React, {useState, useEffect} from 'react'
import "./ScoreBox.css"

const ScoreBox = ({pressHandler}) => {
  const [current, setCurrent] = useState(0)
  const [key, setKey] = useState(undefined)
  const [words, setWords] = useState('loading')
  const [cpm, setCpm] = useState(-1)
  const [errors, setErrors] = useState(0)

   useEffect(() => {
     document.addEventListener('keydown', (key) => {
      if (key.code === 'Space') {
        key.preventDefault()
      }
    })
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', (key) => {
      setKey(key["key"])
      // console.log(key['key']);
    })
  }, [])

  useEffect(() => {
    async function getData() {
      const res = await fetch('https://gist.githubusercontent.com/deekayen/4148741/raw/98d35708fa344717d8eee15d11987de6c8e26d7d/1-1000.txt')
      const text = await res.text()
      const splitList = text.split(/\n/)
      let randomizedList = []

      // checking for duplicated words start
      const savedNumbers = []
      for (let i = 0; i < splitList.length; i++) {
        const randomNumber = Math.floor(Math.random() * splitList.length);
        if (!savedNumbers.includes(randomNumber)) {
          randomizedList.push(splitList[randomNumber])
          savedNumbers.push(randomNumber)
        }
      }
      // checking for duplicated words end
      const slicedList = randomizedList.slice(0, 200)
      // console.log(slicedList);

      const joinedList = slicedList.join(" ")
      setWords(joinedList)
      }
    getData()

  },[])

  useEffect(() => {

    console.log(current- 1)
    console.log(key)

    if (words[current - 1] === 'Backspace') {
      // console.log("backspace");
    }
    else if (words[current - 1] === '' && key === 'space' ) {
      setCpm(prev => prev + 1)
        // console.log("successful space");
    } else if (words[current - 1] === key) {
      setCpm(prev => prev + 1)
        // console.log("successful");

    }
    else {
      setErrors(prev => prev + 1)
    }
    setCurrent(prev => prev + 1)
    // console.log((words[current]));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[key])

  return (
    <div tabIndex='0' className='scoreBoxContainer'>
      <div className="scoreContainer">
      <p>Characters:{cpm}</p>
      <p>Errors:{errors}</p>
      </div>
      <div className="wordContainer" >
        <div className='currentLetter'>
          <p>
            Current:
          </p>
          <p className='letter'>
            {words[current - 1] === " " ? "space" : words[current-1]}
          </p>
        </div>
        {words}
      </div>
    </div>
  )
}

export default ScoreBox