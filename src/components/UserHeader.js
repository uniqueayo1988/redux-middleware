import React from 'react'
import { connect } from 'react-redux'
// action below not needed anymore, dispatched in fetchPostsAndUsers
// import { fetchUser } from '../actions'

class UserHeader extends React.Component {
  // componentDidMount () {
  //   this.props.fetchUser(this.props.userId)
  // }

  render () {
    // Props now coming from mapState below
    const { user } = this.props
    
    if (!user) {
      return null;
    }

    return (
      <div className="header">{user.name}</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user.id === ownProps.userId) }
}

export default connect( 
  mapStateToProps,
  // { fetchUser }
)(UserHeader)
