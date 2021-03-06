import React from 'react';
import { connect } from 'react-redux';
import { handleLogin, handleFacebookLogin } from './actions';
import FacebookLogin from 'react-facebook-login';

class Login extends React.Component {
    constructor(props) {
		super(props);
		const redirectLocation = '/'
		this.handleSubmit = this.handleSubmit.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
		this.state = { error: false, redirectRoute: redirectLocation }
	}

	handleSubmit(e) {
    e.preventDefault();
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    this.props.dispatch(handleLogin(email, password, this.state.redirectRoute, this.props.history));
	}

	responseFacebook(auth) {
		this.props.dispatch(handleFacebookLogin(auth, this.props.history));
	}

	render() {
		return(
			<div>
			  <h3>Login</h3>
			  <form onSubmit={(e) => this.handleSubmit(e) }>
			    <input type='text' ref='email' required placeholder='Email' />
			    <input type='password' ref='password' required placeholder='Password' />
			    <input type='submit' className='btn' value='Login' />
			  </form>

			  <hr />

			  <FacebookLogin
			  	appId="1548725182101647"
			  	autoLoad={ false }
			  	fields="name, email"
			  	cssClass="btn blue"
			  	icon="fa-facebook"
			  	callback={this.responseFacebook} />
			</div>
		)
	}
}

const mapStateToProps = (state) => {
  return { auth: state.auth.api_key }
}

export default connect(mapStateToProps, null)(Login)