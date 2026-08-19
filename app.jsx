import { useState, useRef, useEffect } from "react"

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const start = () => setRunning(true)
  const stop = () => setRunning(false)
  const reset = () => {
    setRunning(false)
    setTime(0)
  }

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{formatTime(time)}</h1>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {!running ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={stop}>Stop</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default Stopwatch
