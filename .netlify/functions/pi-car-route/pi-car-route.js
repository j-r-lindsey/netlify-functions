// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    let routeData = JSON.parse(event.body);
    routeData.processed = true;
    return {
      statusCode: 200,
      body: JSON.stringify(routeData),
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
