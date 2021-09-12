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

export const saveResponse = data => {
  const formList = JSON.parse(window.localStorage.getItem('forms') || '[]')
  const selected = formList.findIndex(item => item.id === data.payload.id)
  formList[selected].response = [...(formList[selected].response || []), data.payload.result]
  window.localStorage.setItem('forms', JSON.stringify(formList))

  return formList
}

export const deleteForm = data => {
  const formList = JSON.parse(window.localStorage.getItem('forms') || '[]')
  const updated = formList.filter(item => item.id !== data.payload)
  window.localStorage.setItem('forms', JSON.stringify(updated))

  return updated
}
