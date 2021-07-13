const Accounts = require('./accounts-model');
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
    if(req.body.name === undefined || req.body.budget === undefined) {
      res.status(400).json({ message: "name and budget are required" })
    } else if(typeof req.body.name !== 'string') {
      res.status(400).json({ message: "name of account must be a string" })
    } else if(req.body.name.trim().length < 3 || req.body.name.trim().length > 100) {
      res.status(400).json({ message: "name of account must be between 3 and 100" })
    } else if(typeof req.body.budget !== 'number' || isNaN(req.body.budget)) { 
      res.status(400).json({ message: "budget of account must be a number" })
    } else if(req.body.budget < 0 || req.body.budget > 1000000) {
      res.status(400).json({ message: "budget of account is too large or too small" })
    } else {
      next()
    }

   
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts')
      .where('name', req.body.name.trim()).first()
    if(existing) {
      res.status(400).json({message: "name is taken"})
    } else {
      next()
    }
  } catch(err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Accounts.getById(req.params.id)
    if(!account) {
      res.status(404).json({message: "account not found"})
    } else {
      req.account = account
      next()
    }
  } catch(err) {
    next(err)
  }

  // Accounts.getById(req.params.id)
  // .then(data => {
  //   if (!data) {
  //     res.status(404).json({ message: "account not found" })
  //   } else {
  //     req.account = data
  //     next()
  //   }
  // }) .catch(next)
}
