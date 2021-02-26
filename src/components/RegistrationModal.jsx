import React, { useState } from 'react'
import { registration } from '../modules/dataCenter'
import { Button, Modal, Form, Grid, Header, Message, Segment, Input } from 'semantic-ui-react'

const RegistrationModal = (props) => {
  const [open, setOpen] = useState(false)
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
      debugger
      setErrorMessage(error.response.data.errors.full_messages)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color="teal" data-cy="register-button">Register/Sign in</Button>}
    >
      <Grid className="login-modal" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Login to view the latest crypto news!
            </Header>
          {errorMessage &&
            <p data-cy="error-message">{errorMessage}</p>
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
              <Button data-cy='submit' color="teal" type='submit'>Register!</Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <a href='/'>Sign In</a>
          </Message>
        </Grid.Column>
      </Grid>
    </Modal>
  )
}

export default RegistrationModal
