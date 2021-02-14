import React, { Component } from "react";
import { connect } from "react-redux";


class UserHeader extends Component {
  render() {
    const { user } = this.props

    if (!user) {
      return (
        <div> User not found </div>
      )
    };

    return (
      <div className="header">{ user.name } </div>
    )
  }
}


//ownProps = UserHeader.props
const mapStateToProps = (state, ownProps) => {
  //write in UserHeader.props only userId
  return { user: state.users.find(user => user.id === ownProps.userId) };
}

export default connect(mapStateToProps)(UserHeader);