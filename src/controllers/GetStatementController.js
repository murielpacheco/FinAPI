class GetStatementController {
  handle(request, response) {
    const { customer } = request;
    return response.json(customer.statement);
  }
}

export { GetStatementController };
