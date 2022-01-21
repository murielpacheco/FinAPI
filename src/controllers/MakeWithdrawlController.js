class MakeWithdrawlController {
  getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
      if (operation.type === 'credit') {
        return acc + operation.amount;
      } else {
        return acc - operation.amount;
      }
    }, 0);
  
    return balance;
  }

  handle(request, response) {
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
  }
}

export { MakeWithdrawlController };
