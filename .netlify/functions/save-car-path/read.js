/* Import faunaDB sdk */
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async (event, context) => {
  const id = event.id
  console.log(`Function 'read' invoked. Read id: ${id}`)
  return client
    .query(q.Get(q.Ref(`classes/items/${id}`)))
    .then(response => {
      console.log('success', response)
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(response),
      }
    })
    .catch(error => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}
