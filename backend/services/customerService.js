const Customer = require('../models/Customer');
const bcrypt = require('bcryptjs');
const generateId = require('../utils/idGenerator');
const { sendCustomerApprovedEmail } = require('./emailService');

const registerCustomer = async (data, filePath) => {
  const existing = await Customer.findOne({ email: data.email });
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(data.password, 10);
  const customerId = await generateId(Customer, 'customerId', 'MYFIN-CUST');

  const customer = new Customer({
    customerId,
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone,
    address: data.address,
    govIdType: data.govIdType,
    govIdNumber: data.govIdNumber,
    govIdDocumentPath: filePath
  });

  await customer.save();
  return customer;
};

const loginCustomer = async (emailOrId, password) => {
  const customer = await Customer.findOne({
    $or: [
      { email: emailOrId },
      { customerId: emailOrId }
    ]
  });

  if (!customer) throw new Error('Customer not found');
  if (customer.status !== 'ACTIVE') throw new Error('Account not active. Awaiting admin approval.');

  const isMatch = await bcrypt.compare(password, customer.password);
  if (!isMatch) throw new Error('Invalid password');

  return customer;
};

const getAllCustomers = async () => {
  return await Customer.find({}, { password: 0 });
};

const getCustomerById = async (customerId) => {
  return await Customer.findOne({ customerId }, { password: 0 });
};

const updateCustomerStatus = async (customerId, status) => {
  const customer = await Customer.findOneAndUpdate(
    { customerId },
    { status },
    { new: true }
  );

  // Send email only when admin approves customer
  if (status === 'ACTIVE' && customer) {
    try {
      await sendCustomerApprovedEmail(
        customer.email,
        customer.name,
        customer.customerId
      );
    } catch (err) {
      console.log('Customer approved email failed:', err.message);
    }
  }

  return customer;
};

const updateCustomer = async (customerId, data) => {
  return await Customer.findOneAndUpdate(
    { customerId },
    { name: data.name, phone: data.phone, address: data.address },
    { new: true }
  );
};

module.exports = {
  registerCustomer,
  loginCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomerStatus,
  updateCustomer
};