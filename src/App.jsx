
import './App.css'
import Invitation from './invitation_form'
import event from './event.jpg'

function App() {

  return (
    <>
    <div className='header'>
      <img className="event-img"src={event} alt="event"></img>
      <h1>Event Sender</h1>
      <p>Easily send bulk emails fast and for free!</p>
      </div>
      <Invitation />
    </>
  )
}

export default App
