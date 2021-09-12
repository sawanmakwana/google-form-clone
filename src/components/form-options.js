import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles} from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import {Typography} from '@material-ui/core'
import {useState} from 'react'

const useStyles = makeStyles({
  formControl: {
    margin: '10px 0px',
    minWidth: 120,
  },
  title: {
    fontSize: 14,
  },
})

const CreateForm = ({handleClose, open, setQuestionList}) => {
  const [data, setData] = useState({
    question: '',
    type: 'text',
    options: '',
  })

  const handleChange = e => {
    setData(data => ({...data, [e.target.name]: e.target.value}))
  }

  const classes = useStyles()
  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="question"
          onChange={handleChange}
          label="Question"
          type="text"
          fullWidth
        />

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            onChange={handleChange}
            id="demo-simple-select"
            name="type"
            defaultValue="text"
          >
            <MenuItem value="multi-dropdown">Dropdown (Multi Select)</MenuItem>
            <MenuItem value="single-dropdown">Dropdown (Single Select)</MenuItem>
            <MenuItem value="checkbox">Checkbox</MenuItem>
            <MenuItem value="radio">Radio</MenuItem>
            <MenuItem value="text">Text</MenuItem>
          </Select>
        </FormControl>
        {data.type !== 'text' && (
          <>
            <TextField
              autoFocus
              margin="dense"
              name="options"
              label="Options"
              type="text"
              fullWidth
              onChange={handleChange}
            />
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Enter options separated by ","
            </Typography>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          color="primary"
          variant="contained"
          disabled={!data.question.trim() || (data.type !== 'text' && !data.options.trim())}
          onClick={() => {
            handleClose()
            setQuestionList(previousData => [data, ...previousData])
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateForm
