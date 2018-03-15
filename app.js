const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 9090
const firebaseAdmin = require('firebase-admin')
// const serviceAccount = require('./test-project-9a76f-firebase-adminsdk-bpjyj-b146718623.json')
const serviceAccount = require('./service_account_prod.json')
const bodyParser = require('body-parser')
const functions = require('firebase-functions')
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://kyoala-api-dev.firebaseio.com'
})
const database = firebaseAdmin.firestore()
app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({
    extended: false
}))
const entity = database.collection('/entity')

// exports.entityWatcher = functions.firestore.document('entity/{entityId}/queue/{queueGroupId}').onWrite(ev => {
//     console.log('EVENT: ', ev)
// })
//routes
app.use('/students', require('./routes/students')(database))
app.use('/people', require('./routes/people')(database))

app.use('/queue', require('./routes/queues')(database))
app.use('/entity', require('./routes/entity')(database))
app.use('/lookup', require('./routes/lookup')(database))
app.use('/queue-group', require('./routes/queue-group')(database))


http.listen(port, () => {
    console.log(`listening to port ${port}`)
})