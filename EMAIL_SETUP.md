# Email Setup Guide for Contact Form

This guide will help you set up email functionality for the contact form in your StyleStore application.

## Option 1: Using Nodemailer with Gmail (Recommended for Development)

### 1. Install Nodemailer
```bash
npm install nodemailer
```

### 2. Create Environment Variables
Create a `.env.local` file in your project root:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-email@gmail.com
BUSINESS_EMAIL=your-business-email@gmail.com
```

### 3. Generate Gmail App Password
1. Go to your Google Account settings
2. Enable 2-Factor Authentication
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this password in your `SMTP_PASS` environment variable

### 4. Update the Contact API Route
Uncomment and modify the Nodemailer code in `/src/app/api/contact/route.js`

## Option 2: Using SendGrid (Recommended for Production)

### 1. Install SendGrid
```bash
npm install @sendgrid/mail
```

### 2. Environment Variables
```env
SENDGRID_API_KEY=your-sendgrid-api-key
BUSINESS_EMAIL=your-business-email@gmail.com
```

### 3. Update Contact API Route
Replace the Nodemailer code with:
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: process.env.BUSINESS_EMAIL,
  from: process.env.BUSINESS_EMAIL,
  subject: `Contact Form: ${subject}`,
  html: `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
};

await sgMail.send(msg);
```

## Option 3: Using Resend (Modern Alternative)

### 1. Install Resend
```bash
npm install resend
```

### 2. Environment Variables
```env
RESEND_API_KEY=your-resend-api-key
BUSINESS_EMAIL=your-business-email@gmail.com
```

### 3. Update Contact API Route
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'StyleStore <noreply@stylestore.com>',
  to: [process.env.BUSINESS_EMAIL],
  subject: `Contact Form: ${subject}`,
  html: `
    <h3>New Contact Form Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Subject:</strong> ${subject}</p>
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `,
});
```

## Option 4: Using AWS SES

### 1. Install AWS SDK
```bash
npm install @aws-sdk/client-ses
```

### 2. Environment Variables
```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
BUSINESS_EMAIL=your-business-email@gmail.com
```

## Testing Your Email Setup

### 1. Test Locally
```bash
npm run dev
```
Navigate to `/contact` and submit a test form.

### 2. Check Console Logs
The current implementation logs form submissions to the console. Check your terminal for:
```
Contact Form Submission: {
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Test Subject',
  message: 'Test message',
  timestamp: '2024-01-01T00:00:00.000Z'
}
```

## Production Considerations

1. **Rate Limiting**: Implement rate limiting to prevent spam
2. **Validation**: Add server-side validation for all fields
3. **CAPTCHA**: Consider adding reCAPTCHA for additional security
4. **Database Storage**: Store contact form submissions in a database
5. **Email Templates**: Use professional email templates
6. **Auto-responders**: Send confirmation emails to users

## Security Best Practices

1. **Environment Variables**: Never commit API keys to version control
2. **Input Sanitization**: Sanitize all user inputs
3. **Rate Limiting**: Prevent abuse with rate limiting
4. **CORS**: Configure CORS properly for production
5. **HTTPS**: Always use HTTPS in production

## Troubleshooting

### Common Issues:
1. **Gmail "Less secure app" error**: Use App Passwords instead of regular passwords
2. **SendGrid API key issues**: Ensure the API key has proper permissions
3. **SMTP connection errors**: Check firewall and port settings
4. **Email not received**: Check spam folder and email provider settings

### Debug Mode:
Add console.log statements to debug email sending:
```javascript
console.log('Attempting to send email...');
console.log('SMTP Config:', {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  user: process.env.SMTP_USER
});
```
