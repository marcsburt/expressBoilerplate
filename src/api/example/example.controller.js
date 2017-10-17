import Example from './example.model';


function index(req, res, next) {
  Example.list()
    .then((data) => {
      res.json(data);
    })
    .catch(e => next(e));
}

const findOne = (req, res, next) => {
  let name = req.params.name
  Example.getOne({ username: name })
    .then(data => {
      res.json(data)
    })
    .catch(e => next(e));
}

const create = (req, res) => {
  const example = new Example({
    username: req.body.username,
    number: req.body.number
  });
  example.save()
    .then(savedExample => res.json(savedExample))
    .catch(e => res.json(e));
}

export default {
  index: index,
  create: create,
  findOne: findOne
}
