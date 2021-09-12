// export const getPosts = () => axios.get('https://jsonplaceholder.typicode.com/posts')
import {v4 as uuidv4} from 'uuid'

export const getForms = () => JSON.parse(window.localStorage.getItem('forms') || '[]')

export const createForm = data => {
  const dataToSet = JSON.stringify([
    ...JSON.parse(window.localStorage.getItem('forms') || '[]'),
    {id: uuidv4(), createdAt: new Date(), ...data.payload},
  ])
  window.localStorage.setItem('forms', dataToSet)

  return dataToSet
}
