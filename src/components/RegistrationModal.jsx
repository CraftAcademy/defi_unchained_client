import React, { useState } from 'react'
import { registration, signIn } from '../modules/authentications'
import { Button, Modal, Form, Grid, Header, Message, Segment, Input } from 'semantic-ui-react'

const RegistrationModal = (props) => {
  const [open, setOpen] = useState(false)
  const [secondOpen, setSecondOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const registerUser = async (event) => {
    event.preventDefault()
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_confirmation.value
    }
    try {
      await registration(credentials)
      props.setAuthenticated(true)
      setOpen(false)
    }
    catch (error) {
      error.response ? (
        setErrorMessage(error.response.data.errors.full_messages)
      ) : setErrorMessage("Couldn't connect to the server! Please try again later!")
    }
  }

  const signInUser = async (event) => {
    event.preventDefault()
    let credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    try {
      await signIn(credentials)
      props.setAuthenticated(true)
      setSecondOpen(false)
    }
    catch (error) {
      error.response.data.errors ? (
        setErrorMessage(error.response.data.errors.full_messages)
      ) : setErrorMessage("Couldn't connect to the server! Please try again later!")
    }
  }

  return (
    <>
      <Modal
        onClose={() => {
          setOpen(false)
          setErrorMessage()
        }}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button disabled={props.authenticated} color="teal" data-cy="register-button">Register/Sign in</Button>}
      >
        <Grid className="login-modal" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Login to view the latest crypto news!
            </Header>
            {errorMessage &&
              <p style={{ color: 'white' }} data-cy="error-message">{errorMessage}</p>
            }
            <Form onSubmit={(event) => registerUser(event)} data-cy='registration-form' size='large'>
              <Segment stacked>
                <Form.Field
                  data-cy='email-field'
                  name="email"
                  control={Input}
                  type="email"
                  label='email'
                  placeholder='email'
                />
                <Form.Field
                  data-cy='password-field'
                  name="password"
                  control={Input}
                  type="password"
                  label='password'
                  placeholder='password'
                />
                <Form.Field
                  data-cy='password-confirmation-field'
                  name="password_confirmation"
                  control={Input}
                  type="password"
                  label='confirm password'
                  placeholder='retype password'
                />
                <Button data-cy='submit' color="green" type='submit'>Register!</Button>
              </Segment>
            </Form>
            <Message>
              Already have an account?
             <br></br>
              <Button
                data-cy="sign-in-button"
                size="tiny"
                color="green"
                onClick={() => {
                  setOpen(false)
                  setSecondOpen(true)
                }}>
                Sign in!
             </Button>
            </Message>
          </Grid.Column>
        </Grid>
      </Modal>

      <Modal
        onClose={() => {
          setSecondOpen(false)
          setErrorMessage()
        }}
        open={secondOpen}
      >
        <Grid className="login-modal" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Welcome back!
            </Header>
            {errorMessage &&
              <p style={{ color: 'white' }} data-cy="error-message">{errorMessage}</p>
            }
            <Form onSubmit={(event) => signInUser(event)} data-cy='registration-form' size='large'>
              <Segment stacked>
                <Form.Field
                  data-cy='email-field'
                  name="email"
                  control={Input}
                  type="email"
                  label='email'
                  placeholder='email'
                />
                <Form.Field
                  data-cy='password-field'
                  name="password"
                  control={Input}
                  type="password"
                  label='password'
                  placeholder='password'
                />
                <Button data-cy='submit' color="green" type='submit'>Sign in!</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Modal>
    </>
  )
}

export default RegistrationModal
