import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import image from '../images/user-blank.jpg'
import { Image, Container, Grid, List, Card, Button } from 'semantic-ui-react'
import { getProfile } from '../state/actions/profileActions'
import { declineTask, destroyTask, acceptTask, deliverTask } from '../state/actions/taskActions'

const ProfilePage = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    getProfile(dispatch)
  }, [dispatch])

  let viewProfileClaimedTasks
  let viewProfileCreatedTasks
  let claimedTaskProducts
  let createdTaskProducts

  if (
    props.claimed_tasks.length > 0 &&
    typeof props.claimed_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileClaimedTasks = props.claimed_tasks.map(claimedTask => {
      claimedTaskProducts = claimedTask.products.map(product => {
        return (
          <div className='claimedTaskProduct'>
            <Grid columns={3} divided>
              <Grid.Column className='profileTaskProducts'>
                {product['amount']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['name']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['total']}
              </Grid.Column>
            </Grid>
          </div>
        )
      })

      return (
        <>
          <List.Content style={{ marginTop: '20px' }}>
            <Card>
              <Card.Content>
                <Card.Meta>Deliver to: {claimedTask.name}</Card.Meta>
                <Card.Meta>{claimedTask.address}</Card.Meta>
                <Card.Meta>Status: {claimedTask.status}</Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <strong>Products: </strong>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <div className='claimedTaskProduct-list'>
                    {claimedTaskProducts}
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group>
                  <Button
                    basic
                    color='green'
                    id={`deliver-${claimedTask.id}`}
                    key={`deliver-${claimedTask.id}`}
                    onClick={e => deliverTask(e, dispatch)}
                  >
                    Deliver
                  </Button>
                  <Button
                    basic
                    color='red'
                    id={`decline-${claimedTask.id}`}
                    key={`decline-${claimedTask.id}`}
                    onClick={e => declineTask(e, dispatch)}
                  >
                    Decline
                  </Button>
                </Button.Group>
              </Card.Content>
            </Card>
          </List.Content>
        </>
      )
    })
  }

  if (
    props.created_tasks.length > 0 &&
    typeof props.created_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileCreatedTasks = props.created_tasks.map(createdTask => {
      createdTaskProducts = createdTask.products.map(product => {
        return (
          <div className='createdTaskProduct'>
            <Grid columns={3} divided>
              <Grid.Column className='profileTaskProducts'>
                {product['amount']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['name']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['total']}
              </Grid.Column>
            </Grid>
          </div>
        )
      })
      return (
        <>
          <List.Content style={{ marginTop: '20px' }}>
            <Card>
              <Card.Content>
                <Card.Meta>Deliver to: {createdTask.name}</Card.Meta>
                <Card.Meta>{createdTask.address}</Card.Meta>
                <Card.Meta>Status: {createdTask.status}</Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <strong>Products: </strong>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <div className='claimedTaskProduct-list'>
                    {createdTaskProducts}
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button.Group>
                  <Button
                    basic
                    color='green'
                    id={`accept-${createdTask.id}`}
                    key={`accept-${createdTask.id}`}
                    onClick={e => acceptTask(e, dispatch)}
                  >
                    Accept
                  </Button>
                  <Button
                    basic
                    color='red'
                    id={`remove-${createdTask.id}`}
                    key={`remove-${createdTask.id}`}
                    onClick={e => destroyTask(e, dispatch)}
                  >
                    Remove
                  </Button>
                </Button.Group>
              </Card.Content>
            </Card>
          </List.Content>
        </>
      )
    })
  }

  return (
    <div id='user-profile'>
      <div>
        <Container style={{ marginTop: '15px' }}>
          <Grid columns={2} stackable>
            <Grid.Column align='center'>
              <Image src={image} size='small' />
            </Grid.Column>
            <Grid.Column align='center'>
              <Container>
                <h1>You're awesome</h1> <h1>{props.userEmail}</h1>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Container style={{ marginTop: '15px' }}>
          <Grid columns={2} stackable>
            <Grid.Column align='center'>
              <Container style={{ marginTop: '2px' }}>
                <h3>You requested:</h3>
                <List>{viewProfileCreatedTasks}</List>
              </Container>
            </Grid.Column>
            <Grid.Column align='center'>
              <Container style={{ marginTop: '2px' }}>
                <h3>You wanted to help:</h3>
                <List>{viewProfileClaimedTasks}</List>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    showProfile: state.showProfile,
    authenticated: state.authenticated,
    claimed_tasks: state.claimed_tasks,
    created_tasks: state.created_tasks,
    userEmail: state.userEmail
  }
}
export default connect(mapStateToProps)(ProfilePage)
