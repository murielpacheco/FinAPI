import express from 'express';

import { CreateCustomerController } from './controllers/CreateCustomerController';
import { GetStatementController } from './controllers/GetStatementController';
import { MakeDepositController } from './controllers/MakeDepositController';
import { MakeWithdrawlController } from './controllers/MakeWithdrawlController';
import { GetStatementByDateController } from './controllers/GetStatementByDateController';
import { EditCustomerNameController } from './controllers/EditCustomerNameController';
import { GetCustomerData } from './controllers/GetCustomerData';
import { DeleteCustomerAccount } from './controllers/DeleteCustomerAccount';

const router = express.Router();

const CreateCustomerController = new CreateCustomerController();
const GetStatementController = new GetStatementController();
const MakeDepositController = new MakeDepositController();
const MakeWithdrawlController = new MakeWithdrawlController();
const GetStatementByDateController = new GetStatementByDateController();
const EditCustomerNameController = new EditCustomerNameController();
const GetCustomerData = new GetCustomerData();
const DeleteCustomerAccount = new DeleteCustomerAccount();

router.post('/account', CreateCustomerController.handle);

router.get(
  '/statement',
  middlewareCPF.verifyAccountCPF,
  GetStatementController.handle
);

router.post(
  '/deposit',
  middlewareCPF.verifyAccountCPF,
  MakeDepositController.handle
);

router.post(
  '/withdrawl',
  middlewareCPF.verifyAccountCPF,
  MakeWithdrawlController.handle
);

router.get(
  '/statement/date',
  middlewareCPF.verifyAccountCPF,
  GetStatementDateController.handle
);

router.put(
  '/account',
  middlewareCPF.verifyAccountCPF,
  EditCustomerNameController.handle
);

router.get('/account', middlewareCPF.verifyAccountCPF, GetCustomerData.handle);

router.delete(
  '/account',
  middlewareCPF.verifyAccountCPF,
  DeleteCustomerAccount.handle
);

export { router };
