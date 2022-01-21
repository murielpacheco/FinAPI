class DeleteCustomerAccount {
  handle(request, response) {
    const { customer } = request;

    customers.splice(customer, 1);

    return response.status(200).json(customers);
  }
}

export { DeleteCustomerAccount };
