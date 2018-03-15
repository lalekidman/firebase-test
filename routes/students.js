module.exports = (db) => {
  const app = require('express').Router()
  const students = db.collection('/student')

  app.get('/', (req, res) => {
    students.get().then((docs) => {
      // const stud = docs.map((el) => (el.data()))
      docs.forEach(el => {
        console.log(el.id, ' => ', el.data())
      });
      // res.status(200).send(JSON.stringify(docs, null, 2))
      // res.status(200).send(JSON.stringify(stud, null, 2))
      // res.end()
    }).catch(err => {
      res.status(500).send(err)
    })
  })
  app.post('/', (req, res) => {
    res.type('application/json')
    const data = req.body
    let result = {
      err: null,
      data: []
    }

    students.doc('lale').collection('test-dev').set(data).catch(err => {
      result.err = err.message
      return []
    }).then(data => {
      result.data = data
      res.status(200).send(JSON.stringify(result, null, 2))
    })
  })
  return app
}