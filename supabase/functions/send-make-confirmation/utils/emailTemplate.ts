import { getCalendarLinks } from './calendarLinks.ts';

export interface RegistrationEmail {
  name: string;
  email: string;
  company: string;
  language: 'en' | 'he';
}

export const getEmailTemplate = (registration: RegistrationEmail): string => {
  const { googleLink, outlookLink } = getCalendarLinks();
  
  if (registration.language === 'en') {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light dark">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F1F0FB;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #9b87f5; padding: 20px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 10px;">
          <h2 style="color: white; margin: 0; text-align: center;">Registration Confirmation</h2>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px; text-align: left;">
          <p style="margin-top: 0;">Dear ${registration.name},</p>
          
          <p>Thank you for registering for our Copilot Conference!</p>
          
          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">📅 We're excited to have you join us for this event where we'll explore the future of productivity with Copilot</p>
          </div>
          
          <p>📍 Location: Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv (144 Menachem Begin Rd., 50th floor, Tel Aviv)<br>
          📅 Date: March 5th, 2025<br>
          ⏰ Time: 17:00<br>
          📋 Agenda: <a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5;">https://copilot-conference-hub.lovable.app/</a></p>

          <div style="margin: 20px 0;">
            <p style="margin-bottom: 10px;"><strong>Add to your calendar:</strong></p>
            <a href="${googleLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px;">Add to Google Calendar</a>
            <a href="${outlookLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Add to Outlook</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="margin-bottom: 0;">See you...</p>
        </div>
      </div>
    </body>
    </html>`;
  } else {
    return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="color-scheme" content="light dark">
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F1F0FB;">
      <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background-color: #9b87f5; padding: 20px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 10px;">
          <h2 style="color: white; margin: 0; text-align: center;">אישור הרשמה</h2>
        </div>
        
        <div style="background-color: #ffffff; padding: 24px; text-align: right;">
          <p style="margin-top: 0;">שלום ${registration.name},</p>
          
          <p>תודה על הרשמתך לכנס Copilot!</p>
          
          <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">📅 אנחנו נרגשים לארח אותך באירוע שבו נציג את עתיד הפרודקטיביות עם קופיילוט</p>
          </div>
          
          <p>📍 מקום: משרדי מיקרוסופט תל-אביב ב Reactor - מידטאון תל אביב (דרך מנחם בגין 144, קומה 50, תל אביב)<br>
          📅 תאריך: 5 במרץ, 2025<br>
          ⏰ שעה: 17:00<br>
          📋 אג'נדה: <a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5;">https://copilot-conference-hub.lovable.app/</a></p>

          <div style="margin: 20px 0;">
            <p style="margin-bottom: 10px;"><strong>הוסף ליומן שלך:</strong></p>
            <a href="${googleLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-left: 10px;">הוסף ליומן Google</a>
            <a href="${outlookLink}" style="display: inline-block; background-color: #9b87f5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">הוסף ליומן Outlook</a>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          
          <p style="margin-bottom: 0;">נתראה...</p>
        </div>
      </div>
    </body>
    </html>`;
  }
};