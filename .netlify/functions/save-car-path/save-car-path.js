/* eslint-disable */
exports.handler = async (event, context) => {
  const path = event.path.replace(/\.netlify\/functions\/[^\/]+/, '')
  const segments = path.split('/').filter(e => e)

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
  };

  switch (event.httpMethod) {
    case 'GET':
      // e.g. GET /.netlify/functions/fauna-crud
      if (segments.length === 0) {
        return require('./read-all').handler(event, context)
      }
      // e.g. GET /.netlify/functions/fauna-crud/123456
      if (segments.length === 1) {
        event.id = segments[0]
        return require('./read').handler(event, context)
      } else {
        return {
          statusCode: 500,
          headers,
          body:
            'too many segments in GET request, must be either /.netlify/functions/fauna-crud or /.netlify/functions/fauna-crud/123456',
        }
      }
    case 'POST':
      // e.g. POST /.netlify/functions/fauna-crud with a body of key value pair objects, NOT strings
      return require('./create').handler(event, context)
    case 'PUT':
      // e.g. PUT /.netlify/functions/fauna-crud/123456 with a body of key value pair objects, NOT strings
      if (segments.length === 1) {
        event.id = segments[0]
        return require('./update').handler(event, context)
      } else {
        return {
          statusCode: 500,
          headers,
          body: 'invalid segments in POST request, must be /.netlify/functions/fauna-crud/123456',
        }
      }
    case 'DELETE':
      // e.g. DELETE /.netlify/functions/fauna-crud/123456
      if (segments.length === 1) {
        event.id = segments[0]
        return require('./delete').handler(event, context)
      } else {
        return {
          statusCode: 500,
          headers,
          body: 'invalid segments in DELETE request, must be /.netlify/functions/fauna-crud/123456',
        }
      }
    case 'OPTIONS':
      // To enable CORS
      return {
        statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
        headers,
        body: 'This was a preflight call!'
      };      
  }
  return {
    statusCode: 500,
    body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
  }
}
