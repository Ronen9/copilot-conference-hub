export const getEnglishTemplate = (name: string) => ({
  subject: 'Registration Confirmation',
  html: `
    <h1>Thank you for registering, ${name}!</h1>
    <p>Your registration has been received successfully.</p>
    <p>We look forward to seeing you at the event.</p>
    <br>
    <p>Best regards,</p>
    <p>The Event Team</p>
  `
});