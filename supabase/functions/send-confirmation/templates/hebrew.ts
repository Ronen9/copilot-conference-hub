export const getHebrewTemplate = (name: string) => ({
  subject: 'אישור הרשמה',
  html: `
    <div dir="rtl">
      <h1>תודה על ההרשמה, ${name}!</h1>
      <p>הרשמתך התקבלה בהצלחה.</p>
      <p>אנחנו מצפים לראותך באירוע.</p>
      <br>
      <p>בברכה,</p>
      <p>צוות האירוע</p>
    </div>
  `
});