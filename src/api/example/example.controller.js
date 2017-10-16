import Example from './example.model';
const index = (req, res) => {
  Example
    .find({})
    .exec()
    .then(data => res.json(data))
    .catch(e => res.json(e));
}

const create = (req, res) => {
  const example = new Example({
    username: req.body.username,
    number: req.body.number
  });
  example.save((res) => {
    console.log(res);
  })
    .then(savedExample => res.json(savedExample))
    .catch(e => res.json(e));
}

export default {
  index: index,
  create: create
}
