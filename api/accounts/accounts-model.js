const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = (id) => {
   return db('accounts')
    .where('id', id).first()
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, {name, budget}) => {
  await db('accounts')
    .where('id', id)
    .update({name, budget})
  return getById(id)
}

const deleteById = async id => {
  await db('accounts')
  .where('id', id)
  .del()
  return getById(id)
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
