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
    return <h3><Link to={'/profile'}> Profile </Link> <Link to={'/'} OnClick={(e) => {this.logOut(e)}}>Logout</Link></h3>
  }

  logOut = (e) => {
    Store.dispatch({ type: 'LOGOUT', action: null})
    e.preventDefault()
    localStorage.clear()
    console.log('LOGOUT')
    // window.location.href = '/';
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
          <h3><Link to={'/'} className={'lol'}>Market</Link></h3>
          {this.props.user ? this.loggedIn() : <h3><Link to={'/login'}> Login </Link></h3>}
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
