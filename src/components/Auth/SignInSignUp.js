import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn, signUp } from '../../api/auth'
// import message from '../AutoDismissAlert/messages'

import { Button, Form, Input, message, Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

class SignInSignUp extends Component {
  constructor () {
    super()

    // Set the default loggin to my username, till alternative can be found
    this.state = {
      email: 'nick',
      password: '1122',
      passwordConfirmation: '',
      loading: false
    }
  }

  // Handle form input changes
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = () => {
    const { history, setUser } = this.props

    // Loggin success message
    const success = () => {
      message.success('You Have Successfully Logged In!', 0.5);
    }

    // Loggin failure message
    const error = () => {
      message.error('Login Failed. Please Try again.');
    }

    // Sign in API call
    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => success())
      .then(() => history.push('/home'))
      .catch(() => {
        this.setState({ email: '', password: '' }),
        error(),
        this.setState({ loading: false})
      })
  }

  onSignUp = () => {
    const { history, setUser } = this.props

    // Sign In success message
    const successSignUp = () => {
      message.success('You Have Successfully Signed Up!', 0.5);
    }

    // Loggin failure message
    const errorSignUp = () => {
      message.error('Sign Up Failed. Please Try a Different Username.');
    }

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => successSignUp())
      .then(() => history.push('/home'))
      .catch(() => {
        this.setState({ email: '', password: '', passwordConfirmation: '' }),
        errorSignUp(),
        this.setState({ loading: false})
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state
    const { TabPane } = Tabs
    document.body.style.background = 'white'
    
    return (
      <div >
          <Tabs defaultActiveKey="1" onChange={() => this.setState({ email: '', password: '', passwordConfirmation: '' })}>
            {/* Login tab */}
            <TabPane tab="Login" key="1">
              <h3>Sign In</h3>
              <p>Note: login can take a moment.</p>
              <Form
                name="normal_login"
                className="login-form"
                // initialValues={{ email: 'nick', password: '1122' }}
                onFinish={this.onSignIn}
              >
                <Form.Item
                  value={email}
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    value={email}
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item
                  value={password}
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button loading={this.state.loading} onClick={() => this.setState({ loading: true })} style={{marginRight: '7px'}} type="primary" htmlType="submit">Log in</Button>
                  {/* <Button type="primary" href="#sign-up">Register</Button> */}
                </Form.Item>
              </Form>
            </TabPane>

            {/* Register tab */}
            <TabPane tab="Sign Up" key="2">
              <h3>Sign Up</h3>
              <p>Note: login can take a moment.</p>
              <Form
                name="normal_login"
                className="login-form"
                onFinish={this.onSignUp}
              >
                <Form.Item
                  value={email}
                  rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    value={email}
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item
                  value={password}
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item
                  value={password}
                  rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Item>
                <Form.Item>
                  <Button loading={this.state.loading} onClick={() => this.setState({ loading: true })} style={{marginRight: '7px'}} type="primary" htmlType="submit">Register</Button>
                  {/* <Button type="primary" href="#sign-up">Register</Button> */}
                </Form.Item>
              </Form>
            </TabPane>

          </Tabs>
      </div>
    )
  }
}

export default withRouter(SignInSignUp)
