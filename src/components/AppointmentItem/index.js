// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, onClickStarLogo} = props
  const {id, title, date, isStarred} = eachAppointment

  const onClickStarButton = () => {
    onClickStarLogo(id)
  }

  let starImageLink
  if (isStarred) {
    starImageLink =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  } else {
    starImageLink =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  }

  return (
    <li className="eachAppointmentList">
      <div className="titleStarContainer">
        <p className="titleEl">{title}</p>
        <button
          className="starButton"
          type="button"
          data-testid="star"
          onClick={onClickStarButton}
        >
          <img src={starImageLink} alt="star" className="starImage" />
        </button>
      </div>
      <p className="dateEl">{date}</p>
    </li>
  )
}

export default AppointmentItem
