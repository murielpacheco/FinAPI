const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const customers = [];

// Middleware

function verifyAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found' });
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount;
    } else {
      return acc - operation.amount;
    }
  }, 0);

  return balance;
}

app.post('/account', (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!' });
  }

  customers.push({
    name,
    cpf,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.get('/statement', verifyAccountCPF, (request, response) => {
  const { customer } = request;
  return response.json(customer.statement);
});

app.post('/deposit', verifyAccountCPF, (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOptions = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statement.push(statementOptions);

  return response.status(201).send();
});

app.post('/withdrawl', verifyAccountCPF, (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: 'Insuficient balance!' });
  }

  const statementOperations = {
    amount,
    created_at: new Date(),
    type: 'debit',
  };

  customer.statement.push(statementOperations);

  return response.status(201).send();
});

app.get('/statement/date', verifyAccountCPF, (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + ' 00:00');

  const statement = customer.statement.filter(
    (statement) =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  );

  return response.json(statement);
});

app.put('/account', verifyAccountCPF, (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).send();
});

app.get('/account', verifyAccountCPF, (request, response) => {
  const { customer } = request;

  return response.json(customer);
});

app.delete('/account', verifyAccountCPF, (request, response) => {
  const { customer } = request;

  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

app.listen(3333, console.log('App running on port: 3333'));
