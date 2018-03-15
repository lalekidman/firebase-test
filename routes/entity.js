module.exports = (db) => {
  const app = require('express').Router()
  const entity = db.collection('/entity')
  const uuidv1 = require('uuid/v1');
  const asyncs = require('async')

  app.get('/:entityId/transaction', (req, res) => {
    res.type('application/json')
    const {entityId} = req.params
    const ent = entity.doc(entityId)

    
    // db.runTransaction(t => {
    //   return t.get(ent).then(doc => {
    //     console.log(doc)
    //     console.log(doc.data())
    //   })
    // }).then(res => {
    //   console.log('transaction successfully: ', res)
    // }).catch(err => {
    //   console.log('error: ', err.message)
    // })
  })
  app.get('/:entityId', (req, res) => {
    res.type('application/json')
    const {entityId} = req.params
    entity.doc(entityId).collection('queue').get().then((docs) => {
    // entity.where('id', '==', entityId).get().then((docs) => {
      let subData = []
      console.log(docs)
      docs.forEach(el => {
        subData.push(el.id)
      });
      res.status(200).send(JSON.stringify({ids: subData, len: subData.length}, null, 2))
    }).catch(err => {
      res.status(500).send(err)
    })
  })

  app.get('/', (req, res) => {
    entity.get().then((docs) => {
      let subData = []
      docs.forEach(el => {
        let data = {}
        data[el.id] = el.data()
        subData.push(data)
      })
      res.status(200).send(JSON.stringify(subData, null, 2))
    }).catch(err => {
      res.status(500).send(err)
    })
  })
  app.get('/queue/:entityId', (req, res) => {
    res.type('applicastion/json')
    let entitiesData = []
    const {entityId} = req.params
    // if (!entityId) {
    //   res.status(500).send({
    //     err: 'entity id should not be empty.'
    //   })
    //   return 0
    // }
    db
      .collection(`/queue`)
        .doc(entityId)
        .getCollections()
          .then(result => {
            console.log('entering here right?')
            let collectionIds = []
            result.forEach(el => {
              collectionIds.push(el.id)
            })
            res.status(200).send({
              collectionIds,
              err: null
            })
        }).catch(err => {
          console.log('err: ', err.message)
          res.status(500).send({
            err: err.message
          })
        })
  })
  app.get('/queue', (req, res) => {
    let entitiesData = []
    entity.get().then((docs) => {
      let subData = []
      docs.forEach(el => {
        let data = el.data()
        subData.push({
          data: {
            name: data.name,
            industry: data.industry,
            id: data.id
          },
          id: el.id
        })
      })
      return entitiesData = subData.map(el => {
        return db
          collection('queue')
            .doc(`${el.id}`)
              .getCollections()
                .then(result => {
                  let collectionIds = []
                  result.forEach(el => {
                    collectionIds.push(el.id)
                  })
                  return {
                    entity: el.data,
                    queues: {
                      id: el.id,
                      collectionIds
                    }
                  }
              })
      })
    }).then(data => {
      return Promise.all(data)
    }).then(data => {
      res.status(200).send(JSON.stringify(data, null, 2))
    }).catch(err => {
      console.log('error: ', err)
      res.status(500).jsonp(err)
    })
  })
  return app
}