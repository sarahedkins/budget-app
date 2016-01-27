'use strict';

import _ from 'lodash';
import Budget from './budget.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Budgets
export function index(req, res) {
  Budget.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets all Budgets with given owner ID from the DB
export function show(req, res) {
  Budget.find({ owner: req.params.id})
    .then(handleEntityNotFound(res))
    .populate('budgetItem')
    .exec(function (err, budget) {   // TODO is this exec necessary?
      if (err) return handleError(err);
      console.log(budget);
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Budget in the DB
export function create(req, res) {
  Budget.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Budget in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Budget.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Budget from the DB
export function destroy(req, res) {
  Budget.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
