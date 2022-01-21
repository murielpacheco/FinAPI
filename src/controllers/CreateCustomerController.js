import { v4 as uuidv4 } from 'uuid';

class CreateCustomerController {
  handle(request, response) {
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
  }
}
export { CreateCustomerController };
