import React, { Component } from 'react'

class AdvertsList extends Component {
  renderAdvert = item => {
    return (
      <div key={item.key} className="placedAdvertContainer">

        <div className="leftTab">
          <p className="placedAdvertTitle">{item.title}</p>
          <p className="placedAdvertDescription">{item.description}</p>
        </div>

        <div>
          <div className="telRow">
            <img alt="telMark" src={require("../assets/tel-mark.png")} className="telMark"/>
            <p className="placedAdvertTel">{item.telNumber}</p>
          </div>
          <button 
            className="editButton"
            onClick={() => this.props.editAdvert(item)}
          >
            Редактировать
          </button>
          <button 
            className="deleteButton"
            onClick={() => this.props.deleteAdvert(item.key)}
          >
            Удалить
          </button>
        </div>
      </div>
    )
  }

  renderList = () => {
    const { entries } = this.props
    if (entries.length === 0) {
      return <p>Пока нет объявлений</p>
    } else {
      const listAdverts = entries.map(this.renderAdvert)
      return <div className="listOfTasks">{listAdverts}</div>
    }
  }

  render() {
    return (
      <div className="formContainer">
        <h1>Объявление</h1>
        {this.renderList()}
      </div>
    )
  }
}

export default AdvertsList