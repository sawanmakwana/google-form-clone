/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {Button, Container, TextField} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import {useState} from 'react'
import CreateQuestion from 'components/form-options'
import {makeStyles} from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import _ from 'lodash'
import {useDispatch} from 'react-redux'
import {createForm} from 'redux/form/action'
import {useHistory} from 'react-router'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  section: {
    paddingTop: 75,
  },
  create: {
    position: 'fixed',
    bottom: 75,
    right: 75,
  },
  root: {
    minWidth: 275,
    marginTop: 25,
  },

  title: {
    fontSize: 16,
  },
  addQuestion: {
    marginTop: 10,
  },
  createForm: {
    marginTop: 25,
    textAlign: 'center',
    margin: 'auto',
  },
})

const FormCreate = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()

  const [open, setOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [questionList, setQuestionList] = useState([])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDeleteQuestion = index => {
    setQuestionList(data => data.filter((item, i) => i !== index))
  }

  const handleSubmitForm = () => {
    const payload = {name: formName, questionList}
    dispatch(createForm(payload))
    history.push(`/`)
  }

  return (
    <section className={classes.section}>
      {open && <CreateQuestion {...{open, handleClose, setQuestionList}} />}
      <h1 style={{textAlign: 'center'}}>Form Create</h1>
      <Container maxWidth="md">
        <Card className={classes.root}>
          <CardContent>
            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
              Name
            </Typography> */}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Form Name"
              type="text"
              onChange={e => setFormName(e.target.value)}
            />
          </CardContent>
        </Card>
        <Button variant="contained" className={classes.addQuestion} onClick={handleClickOpen}>
          Add Question
        </Button>
        {questionList.length > 0 && (
          <Card className={classes.root}>
            <CardContent>
              {questionList.map((item, index) => (
                <div key={`list${index}`}>
                  <Typography variant="h5" component="h2">
                    {' '}
                    Question: {item.question}
                  </Typography>
                  <span style={{float: 'right', cursor: 'pointer'}} onClick={() => handleDeleteQuestion(index)}>
                    <DeleteIcon />
                  </span>
                  <Typography variant="h6" component="h2" color="textSecondary">
                    {' '}
                    Type: {_.startCase(item.type)}
                  </Typography>

                  {item.options && (
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      <span>Options: </span>
                      <ol>
                        {item.options.split(',').map(text => (
                          <li> {text} </li>
                        ))}
                      </ol>
                    </Typography>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
        <Button
          variant="contained"
          className={classes.createForm}
          color="primary"
          onClick={handleSubmitForm}
          style={{display: 'block'}}
          disabled={!formName.trim() || !questionList.length}
        >
          Create Form
        </Button>
      </Container>
    </section>
  )
}

export default FormCreate
