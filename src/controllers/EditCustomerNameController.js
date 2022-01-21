class EditCustomerNameController {
  handle(request, response) {
    const { name } = request.body;
    const { customer } = request;

    customer.name = name;

    return response.status(201).send();
  }
}

export { EditCustomerNameController };
