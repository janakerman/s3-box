const api = require('express').Router()
const buckets = require('./buckets')

api.get('/buckets', buckets.list)
api.post('/buckets', buckets.create)

module.exports = api