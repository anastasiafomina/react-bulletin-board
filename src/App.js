import React, { Component } from 'react';
import './styles/App.css'
import PlaceAdvert from './components/PlaceAdvert';
import AdvertsList from './components/AdvertsList';
import uuid4 from 'uuid/v4'


class App extends Component {
  constructor(props) {
    super(props)
    const itemsFromStorage = localStorage.getItem("itemsKey")
    const parsedItems = JSON.parse(itemsFromStorage) || {}
    const itemsForState = parsedItems.savedItems || []
  
    this.state = {
      adverts: itemsForState
    } 
  }

  addAdvert = (data) => {
    const newAdvert = {
      ...data,
      key: uuid4()
    }
    const adverts = [newAdvert, ...this.state.adverts]

    this.setState({
      adverts: adverts
    }, () => {
      localStorage.setItem('itemsKey', JSON.stringify( { savedItems: adverts }))
    })
  }

  saveAdvert = (data) => {
    const index = this.state.adverts.findIndex(item => item.key === data.key)
    const adverts = [...this.state.adverts]
    adverts.splice(index, 1, data)
  
    this.setState({
      adverts: adverts
    }, () => {
      localStorage.setItem('itemsKey', JSON.stringify( { savedItems: adverts }))
    })
  }

  editAdvert = (item) => {
    this.form.editItem(item)
  }

  deleteAdvert = key => {
    const filteredItems = this.state.adverts.filter(item => item.key !== key)
    this.setState({
      adverts: filteredItems,
    }, () => {
      localStorage.setItem('itemsKey', JSON.stringify( { savedItems: filteredItems }))
    })
  }

  render() {
    return (
      <div className="container">
        <PlaceAdvert 
          ref={this.setFormRef}
          addAdvert={this.addAdvert}
          saveAdvert={this.saveAdvert}
        />
        <AdvertsList
          entries={this.state.adverts}
          deleteAdvert={this.deleteAdvert}
          editAdvert={this.editAdvert}
        />
      </div>
    )
  }

  setFormRef = (ref) => {
    this.form = ref
  }
}

export default App;
