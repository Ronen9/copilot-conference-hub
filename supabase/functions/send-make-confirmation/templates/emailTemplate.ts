import { getEmailStyles } from '../utils/emailStyles.ts';
import { getCalendarLinks } from '../utils/calendarLinks.ts';

interface RegistrationEmail {
  name: string;
  email: string;
  company: string;
  language: 'en' | 'he';
}

export const getEmailTemplate = (registration: RegistrationEmail) => {
  const { googleLink, outlookLink } = getCalendarLinks();
  const styles = getEmailStyles();
  
  if (registration.language === 'en') {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <style>${styles}</style>
      </head>
      <body style="background-color: #F1F0FB;">
        <div class="container">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <div class="header">
              <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
                   alt="Microsoft Copilot Logo" 
                   class="logo"
                   style="max-width: 200px; height: auto;">
              <h2 style="color: #ffffff; margin: 10px 0 0 0;">Registration Confirmation</h2>
            </div>
            
            <div class="content" style="text-align: left;">
              <p style="margin-top: 0; font-size: 16px;">
                Dear ${registration.name},
              </p>
              
              <p style="font-size: 16px;">
                Thank you for registering for our Copilot Conference!
              </p>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px;">
                  We're excited to have you join us for this event where we'll explore the future of productivity with Copilot.
                </p>
              </div>
              
              <div class="details">
                <p style="margin: 10px 0; font-size: 16px;">
                  📍 <strong>Location:</strong> Microsoft Tel Aviv offices at Reactor - Midtown Tel Aviv<br>
                  <span style="margin-left: 25px;">(144 Menachem Begin Rd., 50th floor, Tel Aviv)</span>
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  📅 <strong>Date:</strong> March 5th, 2025
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  ⏰ <strong>Time:</strong> 17:00
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  📝 <strong>Agenda:</strong> <a href="https://copilot-conference-hub.lovable.app/" 
                     style="color: #9b87f5; text-decoration: none;">
                     copilot-conference-hub.lovable.app
                  </a>
                </p>
              </div>

              <div style="margin: 20px 0; text-align: center;">
                <p style="margin-bottom: 15px; font-weight: bold; font-size: 16px;">
                  Add to your calendar:
                </p>
                <a href="${googleLink}" class="button">
                  Add to Google Calendar
                </a>
                <a href="${outlookLink}" class="button">
                  Add to Outlook
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              
              <p style="margin-bottom: 0; font-size: 16px; text-align: center;">
                See you at the event!
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  } else {
    return `
    <!DOCTYPE html>
    <html lang="he" dir="rtl">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="color-scheme" content="light">
        <meta name="supported-color-schemes" content="light">
        <style>${styles}</style>
      </head>
      <body style="background-color: #F1F0FB;">
        <div class="container">
          <div style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
            <div class="header">
              <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
                   alt="Microsoft Copilot Logo" 
                   class="logo"
                   style="max-width: 200px; height: auto;">
              <h2 style="color: #ffffff; margin: 10px 0 0 0;">אישור הרשמה</h2>
            </div>
            
            <div class="content" style="text-align: right;">
              <p style="margin-top: 0; font-size: 16px;">
                שלום ${registration.name},
              </p>
              
              <p style="font-size: 16px;">
                תודה על הרשמתך לכנס Copilot!
              </p>
              
              <div style="background-color: #f8f9fa; padding: 16px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px;">
                  אנחנו נרגשים לארח אותך באירוע שבו נציג את עתיד הפרודקטיביות עם קופיילוט
                </p>
              </div>
              
              <div class="rtl-details">
                <p style="margin: 10px 0; font-size: 16px;">
                  📍 <strong>מקום:</strong> משרדי מיקרוסופט תל-אביב ב Reactor - מידטאון תל אביב<br>
                  <span style="margin-right: 25px;">(דרך מנחם בגין 144, קומה 50, תל אביב)</span>
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  📅 <strong>תאריך:</strong> 5 במרץ, 2025
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  ⏰ <strong>שעה:</strong> 17:00
                </p>
                <p style="margin: 10px 0; font-size: 16px;">
                  📝 <strong>אג'נדה:</strong> <a href="https://copilot-conference-hub.lovable.app/" 
                     style="color: #9b87f5; text-decoration: none;">
                     copilot-conference-hub.lovable.app
                  </a>
                </p>
              </div>

              <div style="margin: 20px 0; text-align: center;">
                <p style="margin-bottom: 15px; font-weight: bold; font-size: 16px;">
                  הוסף ליומן שלך:
                </p>
                <a href="${googleLink}" class="button">
                  הוסף ליומן Google
                </a>
                <a href="${outlookLink}" class="button">
                  הוסף ליומן Outlook
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              
              <p style="margin-bottom: 0; font-size: 16px; text-align: center;">
                נתראה באירוע!
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  }
};