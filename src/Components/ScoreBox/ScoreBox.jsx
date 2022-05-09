import React, {useState, useEffect} from 'react'
import "./ScoreBox.css"

const ScoreBox = ({pressHandler}) => {
  const words = "word"
  const [current, setCurrent] = useState(0)
  const [key, setKey] = useState(undefined)
  const [word, setWord] = useState("word")

  function keyDownHandler() {


  }

  useEffect(() => {
    document.addEventListener('keydown', (key) => {
      setKey(key["key"])
      console.log(key['key']);
    })
  },[])

  useEffect(() => {
    if (word[current - 1] === key) {
          console.log("successful");
        }
        setCurrent(prev => prev + 1)
    console.log((word[current]));
  },[key])

  return (
    <div tabIndex='0' className='scoreBoxContainer'>
      <div className="scoreBoxInnerContainer" >
        {words}
      </div>
      {word[current]}
      {key}
      {current}
    </div>
  )
}

export default ScoreBox