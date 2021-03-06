import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import './style/global.styl'

class DropdownMultiple extends Component{
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title,
      timeOut: null
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

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  static getDerivedStateFromProps(nextProps){
    const count = nextProps.list.filter(function(a) { return a.selected; }).length;
    if(count === 0){
      return {headerTitle: nextProps.title}
    }
    else if(count === 1){
      return {headerTitle: `${count} ${nextProps.titleHelper}`}
    }
    else if(count > 1){
      if (nextProps.titleHelperPlural) {
        return {headerTitle: `${count} ${nextProps.titleHelperPlural}`}
      }
      return {headerTitle: `${count} ${nextProps.titleHelper}s`}
    }
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list, toggleItem} = this.props
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
         {list.map((item) => (
           <button className="dd-list-item" key={item.title} onClick={() => toggleItem(item.id, item.key)}>
             {item.title} {item.selected && <FontAwesome name="check"/>}
           </button>
          ))}
        </ul>}
      </div>
    )
  }

}

export default DropdownMultiple
