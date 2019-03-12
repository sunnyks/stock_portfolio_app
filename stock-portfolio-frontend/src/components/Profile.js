import React from 'react';
import { connect } from 'react-redux'

class Profile extends React.Component {


  render() {
    return(<div>profile info (display portfolios) route to diff portfolios</div>)
  }

}


const mapStateToProps = state => {
  return   // ??
}


const mapDispatchToProps = dispatch => {
  return
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile)
