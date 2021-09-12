/* eslint-disable react/jsx-no-target-blank */
import {Button, Container, Fab} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import AddIcon from '@material-ui/icons/Add'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import {deleteForm, getForms} from 'redux/form/action'
import moment from 'moment'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  section: {
    paddingTop: 75,
    textAlign: 'center',
  },
  create: {
    position: 'fixed',
    bottom: 75,
    right: 75,
  },
})

const FormList = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const {formList = []} = useSelector(state => state.forms)

  useEffect(() => {
    dispatch(getForms())
  }, [])

  return (
    <section className={classes.section}>
      <h1>Form List</h1>
      <Link to="/create">
        <Fab color="primary" aria-label="add" className={classes.create}>
          <AddIcon />
        </Fab>
      </Link>
      <Container maxWidth="md">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Url</TableCell>
                <TableCell align="right">Created At</TableCell>
                <TableCell align="right">Total Response</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formList.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right" style={{cursor: 'pointer'}}>
                    <Link to={`/view/${row.id}`} target="_blank">{`${window.location.origin}/view/${row.id}`}</Link>
                  </TableCell>
                  <TableCell align="right">{moment(row.createdAt).format('DD MMM YYYY')}</TableCell>
                  <TableCell align="right">{(row.response || []).length}</TableCell>
                  <TableCell onClick={() => dispatch(deleteForm(row.id))} style={{cursor: 'pointer'}}>
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </section>
  )
}

export default FormList
