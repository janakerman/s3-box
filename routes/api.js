const api = require('express').Router()
const buckets = require('./buckets')

api.get('/buckets', buckets.list)
api.post('/buckets', buckets.create)
api.delete('/buckets/:name', buckets.deleteBucket)

module.exports = api