import React, { Component } from 'react'

import { checkTelNumber } from '../utils'

class PlaceAdvert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      key: '',
      title: '',
      description: '',
      telNumber: '',
      titleError: false,
      phoneError: false,
      rightFormat: true
    }
  }

  handleTitle = e => {
    this.setState({
      title: e.target.value,
    })
  }

  handleDescription = e => {
    this.setState({
      description: e.target.value,
    })
  }

  handleTelNumber = e => {
    this.setState({
      telNumber: e.target.value.replace(/\s/g,''),
      rightFormat: true,
      phoneError: false
    })
  }

  onSubmit = (e) => {
    e.preventDefault()

    if (this.state.title === '' || this.state.telNumber.length < 16 || !checkTelNumber(this.state.telNumber)) {
      this.setState ({
        titleError: this.state.title === '',
        phoneError: this.state.telNumber === '',
        rightFormat: checkTelNumber(this.state.telNumber) 
      })
    } else if (this.state.key.length > 0) {
      const data = {
        key: this.state.key,
        title: this.state.title,
        description: this.state.description,
        telNumber: this.state.telNumber
      }
      this.setState ({
        key: '',
        title: '',
        description: '',
        telNumber: '',
        titleError: false,
        phoneError: false
      })
      this.props.saveAdvert(data)
    } else {
      const data = {
        title: this.state.title,
        description: this.state.description,
        telNumber: this.state.telNumber
      }
      this.setState ({
        title: '',
        description: '',
        telNumber: '',
        titleError: false,
        phoneError: false
      })
      this.props.addAdvert(data)
    }
  }

  editItem = (item) => {
    this.setState({ ...item })
  }

  cancel = () => {
    this.setState({
      key: '',
      title: '',
      description: '',
      telNumber: '',
      titleError: false,
      phoneError: false
    })
  }

  renderTitleHint = () => {
    if (this.state.title.length > 0) {
      return (
        <div className="notification">
          <img alt="checkMark" src={require("../assets/check-mark.png")} className="notificationMark"/>
          <p className="checkNotification requestNotification">Заполнено</p>
        </div>
      )
    } else if (this.state.titleError) {
      return (
        <div className="notification">
          <img alt="exclaimMark" src={require("../assets/exclaim-mark.png")} className="notificationMark"/>
          <p className="exclaimNotification requestNotification">Заполните поле</p>
        </div>
      )
    } else {
      return (
        <div className="notification">
          <img alt="questionMark" src={require("../assets/question-mark.png")} className="notificationMark"/>
          <p className="requestNotification">Обязательное поле
            <br/>
            Не более 140 символов
          </p>
        </div>
      )
    }
  }

  renderDescriptionHint = () => {
    if (this.state.description.length > 0) {
      return (
        <div className="notification">
          <img alt="checkMark" src={require("../assets/check-mark.png")} className="notificationMark"/>
          <p className="checkNotification requestNotification">Заполнено</p>
        </div>
      )
    } else {
      return (
        <div className="notification">
          <img alt="questionMark" src={require("../assets/question-mark.png")} className="notificationMark"/>
          <p className="requestNotification">Не более 300 символов</p>
        </div>
      )
    }
  }

  renderTelNumberHint = () => {
    if (this.state.phoneError) {
      return (
        <div className="notification">
          <img alt="exclaimMark" src={require("../assets/exclaim-mark.png")} className="notificationMark"/>
          <p className="exclaimNotification requestNotification">Заполните поле</p>
        </div>
      )
    } else if (!this.state.rightFormat && this.state.telNumber.length !== 0) {
      return (
        <div className="notification">
          <img alt="exclaimMark" src={require("../assets/exclaim-mark.png")} className="notificationMark"/>
          <p className="exclaimNotification requestNotification">Неверный формат</p>
        </div>
      )
    } else if (this.state.telNumber.length === 16) {
      return (
        <div className="notification">
          <img alt="checkMark" src={require("../assets/check-mark.png")} className="notificationMark"/>
          <p className="checkNotification requestNotification">Заполнено</p>
        </div>
      )
    } else {
      return (
        <div className="notification">
          <img alt="questionMark" src={require("../assets/question-mark.png")} className="notificationMark"/>
          <p className="requestNotification">Обязательное поле</p>
        </div>
      )
    }
  }

  render() {
    return (
      <form className="formContainer" onSubmit={this.onSubmit}>
        <h1>Подать объявление</h1>
        <label htmlFor="title">Заголовок</label>
        <div className="inputContainer">
          <input 
            type="text" 
            name="title"
            value={this.state.title}
            onChange={this.handleTitle}
            maxLength="140"
            />
          {this.renderTitleHint()}
        </div>

        <label htmlFor="description">Текст объявления</label>
        <div className="inputContainer">
          <textarea 
            type="text" 
            name="description" 
            className="descriptionInput"
            value={this.state.description}
            onChange={this.handleDescription}
            maxLength="300"
          />
          {this.renderDescriptionHint()}
        </div>

        <label htmlFor="phone">Телефон</label>
        <div className="inputContainer">
          <input 
            type="tel" 
            name="phone"
            placeholder="+7(___)___-__-__"
            value={this.state.telNumber}
            onChange={this.handleTelNumber}
            maxLength="16"
          />
          {this.renderTelNumberHint()}
        </div>

        {this.renderButton()}
      </form>
    )
  }

  renderButton = () => {
    if (this.state.key.length > 0) {
      return (
        <div className="buttonsContainer">
          <button type="submit" className="placementButton">Сохранить</button>
          <button className="placementButton" onClick={this.cancel}>Отмена</button>
        </div>
      )
    }
    return <button type="submit" className="placementButton">Подать</button>
  }
}

export default PlaceAdvert