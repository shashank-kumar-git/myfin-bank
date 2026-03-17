const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ─── 1. CUSTOMER APPROVED — with Customer ID ───────────────────────
const sendCustomerApprovedEmail = async (email, name, customerId) => {
  await transporter.sendMail({
    from: `"MyFin Bank" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your MyFin Bank Account Has Been Activated',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a237e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">MyFin Bank</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #2e7d32;">Congratulations, ${name}!</h2>
          <p style="color: #424242; line-height: 1.8;">Your KYC verification has been completed successfully. Your MyFin Bank account is now active.</p>
          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 6px; border-left: 4px solid #2e7d32; margin: 24px 0;">
            <p style="margin: 0; color: #1b5e20; font-weight: bold;">Your Account Details</p>
            <p style="margin: 12px 0 0; color: #1b5e20;"><strong>Customer ID:</strong> ${customerId}</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Status:</strong> Active</p>
            <p style="margin: 12px 0 0; color: #424242; font-size: 13px;">Please save your Customer ID. You can use either your registered email address or your Customer ID to login.</p>
          </div>
          <div style="background-color: #f5f5f5; padding: 16px; border-radius: 6px; margin: 20px 0;">
            <p style="margin: 0; color: #424242; font-weight: bold;">Getting Started</p>
            <p style="margin: 10px 0 0; color: #424242;">1. Login using your email or Customer ID along with your password.</p>
            <p style="margin: 6px 0 0; color: #424242;">2. Request a Savings or Current bank account from your dashboard.</p>
            <p style="margin: 6px 0 0; color: #424242;">3. Once your account is approved, you can start performing transactions.</p>
          </div>
          <p style="color: #757575; font-size: 13px;">Welcome aboard! We look forward to serving you.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;">
          <p style="color: #9e9e9e; font-size: 12px; margin: 0;">This is an automated message from MyFin Bank. Please do not reply to this email.</p>
          <p style="color: #9e9e9e; font-size: 12px; margin: 4px 0 0;">© 2026 MyFin Bank. All rights reserved.</p>
        </div>
      </div>
    `
  });
};

// ─── 2. BANK ACCOUNT APPROVED — with account number + opening balance
const sendAccountApprovedEmail = async (email, name, accountNumber, accountType) => {
  await transporter.sendMail({
    from: `"MyFin Bank" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Bank Account Has Been Opened — MyFin Bank',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a237e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">MyFin Bank</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #2e7d32;">Dear ${name}, Your Bank Account Is Ready!</h2>
          <p style="color: #424242; line-height: 1.8;">Your bank account request has been approved. Your account is now active and ready to use.</p>
          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 6px; border-left: 4px solid #2e7d32; margin: 24px 0;">
            <p style="margin: 0; color: #1b5e20; font-weight: bold;">Account Details</p>
            <p style="margin: 12px 0 0; color: #1b5e20;"><strong>Account Number:</strong> ${accountNumber}</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Account Type:</strong> ${accountType}</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Opening Balance:</strong> ₹0.00</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Status:</strong> Active</p>
            <p style="margin: 8px 0 0; color: #757575; font-size: 13px;"><strong>Date Opened:</strong> ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <p style="color: #424242; line-height: 1.8;">You can now login and start performing deposits, withdrawals, fund transfers, and more.</p>
          <p style="color: #757575; font-size: 13px;">Please keep your account number safe and do not share it with anyone.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;">
          <p style="color: #9e9e9e; font-size: 12px; margin: 0;">This is an automated message from MyFin Bank. Please do not reply to this email.</p>
          <p style="color: #9e9e9e; font-size: 12px; margin: 4px 0 0;">© 2026 MyFin Bank. All rights reserved.</p>
        </div>
      </div>
    `
  });
};

// ─── 3. LOAN APPROVED — with EMI details ───────────────────────────
const sendLoanApprovedEmail = async (email, name, loanId, loanAmount, interestRate, emiAmount, tenureMonths) => {
  await transporter.sendMail({
    from: `"MyFin Bank" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your Loan Has Been Approved — MyFin Bank',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a237e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">MyFin Bank</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #2e7d32;">Dear ${name}, Your Loan Has Been Approved</h2>
          <p style="color: #424242; line-height: 1.8;">We are pleased to inform you that your loan application has been reviewed and approved.</p>
          <div style="background-color: #e8f5e9; padding: 20px; border-radius: 6px; border-left: 4px solid #2e7d32; margin: 24px 0;">
            <p style="margin: 0; color: #1b5e20; font-weight: bold;">Loan Details</p>
            <p style="margin: 12px 0 0; color: #1b5e20;"><strong>Loan ID:</strong> ${loanId}</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Loan Amount:</strong> ₹${loanAmount.toLocaleString('en-IN')}</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Interest Rate:</strong> ${interestRate}% per annum</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Monthly EMI:</strong> ₹${emiAmount.toLocaleString('en-IN')}</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Tenure:</strong> ${tenureMonths} months</p>
            <p style="margin: 8px 0 0; color: #1b5e20;"><strong>Total Payable Amount:</strong> ₹${(emiAmount * tenureMonths).toLocaleString('en-IN')}</p>
          </div>
          <p style="color: #424242; line-height: 1.8;">Your EMI payment schedule has been generated. Please login to view the complete payment schedule.</p>
          <p style="color: #757575; font-size: 13px;">For any queries, please contact us through our support system.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;">
          <p style="color: #9e9e9e; font-size: 12px; margin: 0;">This is an automated message from MyFin Bank. Please do not reply to this email.</p>
          <p style="color: #9e9e9e; font-size: 12px; margin: 4px 0 0;">© 2026 MyFin Bank. All rights reserved.</p>
        </div>
      </div>
    `
  });
};

// ─── 4. LOAN REJECTED ──────────────────────────────────────────────
const sendLoanRejectedEmail = async (email, name, loanId, loanAmount) => {
  await transporter.sendMail({
    from: `"MyFin Bank" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Update on Your Loan Application — MyFin Bank',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a237e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">MyFin Bank</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #b71c1c;">Dear ${name}, Update on Your Loan Application</h2>
          <p style="color: #424242; line-height: 1.8;">After careful review of your application, we regret to inform you that we are unable to approve your loan request at this time.</p>
          <div style="background-color: #ffebee; padding: 20px; border-radius: 6px; border-left: 4px solid #b71c1c; margin: 24px 0;">
            <p style="margin: 0; color: #b71c1c; font-weight: bold;">Application Details</p>
            <p style="margin: 12px 0 0; color: #b71c1c;"><strong>Loan ID:</strong> ${loanId}</p>
            <p style="margin: 8px 0 0; color: #b71c1c;"><strong>Requested Amount:</strong> ₹${loanAmount.toLocaleString('en-IN')}</p>
            <p style="margin: 8px 0 0; color: #b71c1c;"><strong>Status:</strong> Not Approved</p>
          </div>
          <p style="color: #424242; line-height: 1.8;">You may consider re-applying after maintaining a sufficient account balance. If you require further assistance, please contact us through our support system.</p>
          <p style="color: #757575; font-size: 13px;">We appreciate your understanding and hope to serve you better in the future.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;">
          <p style="color: #9e9e9e; font-size: 12px; margin: 0;">This is an automated message from MyFin Bank. Please do not reply to this email.</p>
          <p style="color: #9e9e9e; font-size: 12px; margin: 4px 0 0;">© 2026 MyFin Bank. All rights reserved.</p>
        </div>
      </div>
    `
  });
};

// ─── 5. ZERO BALANCE ALERT — to admin only ─────────────────────────
const sendZeroBalanceAlert = async (customerName, accountNumber) => {
  await transporter.sendMail({
    from: `"MyFin Bank" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: 'Alert: Customer Account Balance Has Reached Zero — MyFin Bank',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #b71c1c; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">MyFin Bank — Admin Alert</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #b71c1c;">Account Balance Alert</h2>
          <p style="color: #424242; line-height: 1.8;">This is an automated alert to inform you that a customer account balance has reached zero.</p>
          <div style="background-color: #ffebee; padding: 20px; border-radius: 6px; border-left: 4px solid #b71c1c; margin: 24px 0;">
            <p style="margin: 0; color: #b71c1c; font-weight: bold;">Account Details</p>
            <p style="margin: 12px 0 0; color: #b71c1c;"><strong>Customer Name:</strong> ${customerName}</p>
            <p style="margin: 8px 0 0; color: #b71c1c;"><strong>Account Number:</strong> ${accountNumber}</p>
            <p style="margin: 8px 0 0; color: #b71c1c;"><strong>Current Balance:</strong> ₹0.00</p>
            <p style="margin: 8px 0 0; color: #757575; font-size: 13px;"><strong>Alert Time:</strong> ${new Date().toLocaleString('en-IN')}</p>
          </div>
          <p style="color: #424242; line-height: 1.8;">The account has been marked as AT_RISK. If the balance is not restored within 24 hours, it will be automatically deactivated.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;">
          <p style="color: #9e9e9e; font-size: 12px; margin: 0;">This is an automated alert from MyFin Bank system.</p>
          <p style="color: #9e9e9e; font-size: 12px; margin: 4px 0 0;">© 2026 MyFin Bank. All rights reserved.</p>
        </div>
      </div>
    `
  });
};

// ─── 6. PASSWORD RESET OTP ─────────────────────────────────────────
const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"MyFin Bank" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request — MyFin Bank',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #1a237e; padding: 24px; text-align: center;">
          <h1 style="color: white; margin: 0;">MyFin Bank</h1>
        </div>
        <div style="padding: 32px;">
          <h2 style="color: #1a237e;">Password Reset Request</h2>
          <p style="color: #424242; line-height: 1.8;">We have received a request to reset the password for your MyFin Bank account. Please use the OTP below to complete your password reset.</p>
          <div style="text-align: center; margin: 32px 0;">
            <div style="display: inline-block; background-color: #e8eaf6; padding: 24px 48px; border-radius: 8px; border: 2px dashed #1a237e;">
              <p style="margin: 0; color: #757575; font-size: 13px; margin-bottom: 8px;">Your One Time Password</p>
              <h1 style="color: #1a237e; font-size: 48px; margin: 0; letter-spacing: 10px; font-family: Consolas, monospace;">${otp}</h1>
            </div>
          </div>
          <p style="color: #b71c1c; text-align: center; font-weight: bold;">This OTP is valid for 10 minutes only and can be used once.</p>
          <p style="color: #757575; font-size: 13px; margin-top: 20px;">If you did not request a password reset, please ignore this email. Your account remains secure.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 16px; text-align: center;">
          <p style="color: #9e9e9e; font-size: 12px; margin: 0;">This is an automated message from MyFin Bank. Please do not reply to this email.</p>
          <p style="color: #9e9e9e; font-size: 12px; margin: 4px 0 0;">© 2026 MyFin Bank. All rights reserved.</p>
        </div>
      </div>
    `
  });
};

module.exports = {
  sendCustomerApprovedEmail,
  sendAccountApprovedEmail,
  sendLoanApprovedEmail,
  sendLoanRejectedEmail,
  sendZeroBalanceAlert,
  sendOTPEmail
};