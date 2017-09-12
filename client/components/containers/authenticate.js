import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Authenticate extends React.Component {
  componentDidMount(){
    if(this.props.isLoggedIn){
      this.props.history.push('/login');
      console.log(this.props);
    }
  }
  render() {
    return(
      this.props.children
      );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth,
  }
}
Authenticate.propTypes = {
  children: ''
};
export default connect(mapStateToProps)(withRouter(Authenticate));
