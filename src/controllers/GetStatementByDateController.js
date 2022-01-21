class GetStatementByDateController {
  handle(request, response) {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date(date + ' 00:00');

    const statement = customer.statement.filter(
      (statement) =>
        statement.created_at.toDateString() ===
        new Date(dateFormat).toDateString()
    );

    return response.json(statement);
  }
}

export { GetStatementByDateController };
