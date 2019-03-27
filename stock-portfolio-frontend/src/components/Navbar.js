import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Store from '../store'
import Select from 'react-select'

// const options = [
//   {value: "lol", label: "lol"},
//   {value: "idk", label: "idk"}
// ]

class Navbar extends React.Component {

  loggedIn = () => {
    // get logout working
    return <span> <Link to={'/profile'}> Profile </Link> <button OnClick={this.logOut}>Logout</button> </span>
  }

  logOut = () => {
    localStorage.clear()
    console.log('LOGOUT')
    Store.dispatch({ type: 'LOGOUT'})
    this.props.history.push('/')
  }

  // this search is ugly and dumb. refactor it to be more React based
  // options = () => {
  //   return this.props.stockNames.map(s => {
  //     return <option value={s}/>
  //   })
  // }
  //
  // searchBar = () => {
  //   return(
  //     <div>
  //       <input list="stocknames" type="text" id="searchbar"/>
  //       <datalist id="stocknames">
  //         {this.options()}
  //       </datalist>
  //     </div>
  //   )
  // }

  handleSearch = (e) => {
    if (e === null) return
    this.props.history.push(`/stock/${e.value}`)
  }



  render() {
    return(
      <div>
        <div>{this.props.searchBarOptions ? <Select isSearchable={true} isClearable={true} options={this.props.searchBarOptions} onChange={(e) => {this.handleSearch(e)}} placeholder='Search for a stock' /> : 'loading...'}
          <Link to={'/'} className={'lol'}>Market</Link>
          {this.props.user ? this.loggedIn() : <Link to={'/login'}> Login </Link>}
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {user: state.user,
          stockNames: state.stockNames,
          searchBarOptions: state.searchBarOptions}
}

//
// const mapDispatchToProps = dispatch => {
//   return
// }


export default withRouter(connect(mapStateToProps, null)(Navbar))
