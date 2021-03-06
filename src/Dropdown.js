import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import './style/global.styl'

class Dropdown extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate(){
    const { listOpen } = this.state
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  componentDidMount(){
    const {list} = this.props;
    const selectedItem = list.filter(item => item.selected);

    if(selectedItem.length){
      this.setState({
        headerTitle: selectedItem[0].title
      })
    }
  }

  close(){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id, stateKey){
    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <div className="dd-wrapper">
        <button className="dd-header" onClick={() => this.toggleList()}>
          <div className="dd-header-title">{headerTitle}</div>
          {listOpen
            ? <FontAwesome name="angle-up" size="2x"/>
            : <FontAwesome name="angle-down" size="2x"/>
          }
        </button>
        {listOpen && <ul className="dd-list" onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <button className="dd-list-item" key={item.id} onClick={() => this.selectItem(item.title, item.id, item.key)}>
              {item.title} {item.selected && <FontAwesome name="check"/>}
            </button>
          ))}
        </ul>}
      </div>
    )
  }
}

export default Dropdown
