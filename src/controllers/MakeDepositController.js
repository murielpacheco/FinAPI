class MakeDepositController {
  handle(request, response) {
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
  }
}

export { MakeDepositController };
