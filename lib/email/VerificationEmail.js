export const VerificationEmail = ({ username, verificationCode }) => {
  return `
        <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 500px;
              margin: 40px auto;
              background: #ffffff;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 4px 10px rgba(0,0,0,0.05);
          }
          h2 {
              color: #333;
              text-align: center;
          }
          p {
              font-size: 16px;
              color: #555;
              line-height: 1.6;
          }
          .code {
              display: block;
              width: fit-content;
              margin: 20px auto;
              padding: 12px 24px;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 4px;
              background-color: #f0f0f0;
              border-radius: 6px;
              color: #111;
          }
          .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #aaa;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <h2>Verification Code</h2>
          <p>Hello ${username},</p>
          <p>Use the verification code below to complete your sign-up process:</p>
          <span class="code">${verificationCode}</span>
          <p>This code will expire in 1 hour. If you didn’t request this, please ignore this email.</p>
          <div class="footer">
              <p>&copy; 2025 BDTOON. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>
  
      `;
};
