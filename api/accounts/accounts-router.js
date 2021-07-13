const router = require('express').Router()
const Accounts = require('./accounts-model');
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll()
    res.json(accounts)
  } catch(err) {
    next(err)
  }

})

router.get('/:id', checkAccountId, (req, res, next) => { // eslint-disable-line
  res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const newAccount = await Accounts.create({
      name: req.body.name.trim(),
      budget: req.body.budget,
    })
    res.status(201).json(newAccount)
  } catch(err) {
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(data => {
      res.json(data)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
  .then(data => {
    res.status(200).json({message: `${data} has been deleted`})
  })
  .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: "check go bouncy bounce",
    error: err.message
})
})

module.exports = router;
