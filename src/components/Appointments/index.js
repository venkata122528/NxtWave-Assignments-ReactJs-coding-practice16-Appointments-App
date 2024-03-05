// Write your code here
import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {appointmentsList: [], title: '', date: '', onlyStarred: false}

  addButtonClick = event => {
    event.preventDefault()
    const {appointmentsList, title, date} = this.state
    if (title !== '' && date !== '') {
      const newAppointment = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }
      this.setState(previousState => ({
        appointmentsList: [...previousState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }))
    } else {
      this.setState({appointmentsList})
    }
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    const date = format(new Date(event.target.value), 'dd MMMM yyyy, EEEE')
    this.setState({date})
  }

  onClickStarLogo = id => {
    this.setState(previousState => ({
      appointmentsList: previousState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onStarredAppointments = () => {
    this.setState(previousState => ({
      onlyStarred: !previousState.onlyStarred,
    }))
  }

  render() {
    const {appointmentsList, title, date, onlyStarred} = this.state
    const finalAppointmentsList = onlyStarred
      ? appointmentsList.filter(each => each.isStarred === true)
      : appointmentsList
    const starredClass = onlyStarred ? 'trueStar' : ''

    return (
      <div className="mainContainer">
        <div className="appointmentCard">
          <div className="formAndPhotoCard">
            <form className="appointmentForm" onSubmit={this.addButtonClick}>
              <h1 className="mainHeading">Add Appointment</h1>
              <label htmlFor="titleInputEl">TITLE</label>
              <br />
              <input
                className="titleInputEl"
                type="text"
                id="titleInputEl"
                placeholder="Title"
                onChange={this.onChangeTitle}
                value={title}
              />
              <br />
              <label htmlFor="dateInputEl">DATE</label>
              <br />
              <input
                className="dateInputEl"
                type="date"
                id="dateInputEl"
                onChange={this.onChangeDate}
                value={date}
              />
              <br />
              <button type="submit" className="addButton">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointmentImage"
              />
            </div>
          </div>
          <hr />
          <div className="appointmentsStarredContainer">
            <h1 className="eachAppointmentTitle">Appointments</h1>
            <div className="starredButtonContainer">
              <button
                type="button"
                className={starredClass}
                onClick={this.onStarredAppointments}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="eachAppointmentContainer">
            {appointmentsList.length !== 0
              ? finalAppointmentsList.map(eachAppointment => (
                  <AppointmentItem
                    eachAppointment={eachAppointment}
                    key={eachAppointment.id}
                    onClickStarLogo={this.onClickStarLogo}
                  />
                ))
              : null}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
