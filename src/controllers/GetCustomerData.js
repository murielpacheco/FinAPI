class GetCustomerData {
  handle(request, response) {
    const { customer } = request;

    return response.json(customer);
  }
}

export { GetCustomerData };
