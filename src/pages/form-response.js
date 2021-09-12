import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Input,
  ListItemText,
  makeStyles,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory, useRouteMatch} from 'react-router'
import _ from 'lodash'
import {saveResponse} from 'redux/form/action'

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
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const FormResponse = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {params: {id} = {}} = useRouteMatch()
  const [response, setResponse] = useState({})
  const classes = useStyles()
  const {formList = []} = useSelector(state => state.forms)
  const {name, questionList} = formList.find(item => item.id === id) || {}

  const renderActionField = (i, type, options) => {
    if (type === 'text') {
      return (
        <TextField
          autoFocus
          margin="dense"
          value={response[i]}
          onChange={e =>
            setResponse(response => ({
              ...response,
              [i]: e.target.value,
            }))
          }
          type="text"
          fullWidth
        />
      )
    }
    if (type === 'radio') {
      return (
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={response[i]}
          onChange={e =>
            setResponse(response => ({
              ...response,
              [i]: e.target.value,
            }))
          }
        >
          {options.split(',').map(text => (
            <FormControlLabel value={text} control={<Radio />} label={_.startCase(text)} />
          ))}
        </RadioGroup>
      )
    }
    if (type === 'checkbox') {
      return options.split(',').map(text => (
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              color="primary"
              inputProps={{'aria-label': 'secondary checkbox'}}
              onChange={e =>
                setResponse(response => ({
                  ...response,
                  [i]:
                    options.split(',').indexOf(text) === -1
                      ? [...(response[i] || []), e.target.value]
                      : [...(response[i] || []).filter(i => i !== text)],
                }))
              }
            />
          }
          label={_.startCase(text)}
        />
      ))
    }
    if (type === 'multi-dropdown') {
      return (
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          input={<Input />}
          renderValue={selected => selected.join(', ')}
          MenuProps={MenuProps}
          style={{width: 250}}
          value={response[i] || []}
          onChange={e =>
            setResponse(response => ({
              ...response,
              [i]: e.target.value,
            }))
          }
        >
          {options.split(',').map(text => (
            <MenuItem key={text} value={text}>
              <ListItemText primary={text} />
            </MenuItem>
          ))}
        </Select>
      )
    }
    if (type === 'single-dropdown') {
      return (
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={response[i]}
          style={{width: 250}}
          onChange={e =>
            setResponse(response => ({
              ...response,
              [i]: e.target.value,
            }))
          }
        >
          {options.split(',').map(text => (
            <MenuItem value={text}>{text}</MenuItem>
          ))}
        </Select>
      )
    }
  }

  if (name)
    return (
      <section className={classes.section}>
        <h1 style={{textAlign: 'center'}}>Form - {name}</h1>
        <Container maxWidth="md">
          {questionList.length > 0 && (
            <Card className={classes.root}>
              <CardContent>
                {questionList.map((item, index) => (
                  <div key={`list${index}`}>
                    <Typography variant="h5" component="h2">
                      {' '}
                      {item.question}
                    </Typography>
                    {renderActionField(index, item.type, item.options)}
                    <br />
                    <br />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
          <Button
            variant="contained"
            className={classes.createForm}
            color="primary"
            onClick={() => {
              history.push(`/`)
              dispatch(saveResponse({id, result: response}))
            }}
            style={{display: 'block'}}
            // disabled={!formName.trim() || !questionList.length}
          >
            Save Response
          </Button>
        </Container>
      </section>
    )
  return <Container>Form Does not Exist</Container>
}

export default FormResponse
