import { getCalendarLinks } from '../utils.ts';

export const getHebrewTemplate = (name: string) => {
  const { google, outlook } = getCalendarLinks();
  return {
    subject: "ברוכים הבאים לכנס Microsoft Copilot!",
    html: `<!DOCTYPE html>
<html dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <style>
      @media only screen and (max-width: 600px) {
        .button-container { flex-direction: column !important; }
        .calendar-button { width: 100% !important; margin: 8px 0 !important; }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F8F9FA;">
      <div style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="background: linear-gradient(135deg, #9b87f5 0%, #8067f0 100%); padding: 30px; text-align: center;">
          <img src="https://logos-world.net/wp-content/uploads/2023/10/Microsoft-Copilot-Logo.png" 
               alt="Microsoft Copilot Logo" 
               style="max-width: 200px; height: auto; margin-bottom: 15px;">
          <h1 style="color: white; margin: 0; font-size: 28px; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">ההרשמה אושרה!</h1>
        </div>
        
        <div style="background-color: #ffffff; padding: 32px;">
          <p style="margin-top: 0; font-size: 16px; color: #333;">שלום <strong>${name}</strong>,</p>
          
          <p style="font-size: 16px; color: #333;">תודה על הרשמתך לכנס Microsoft Copilot! אנחנו נרגשים לארח אותך באירוע המיוחד הזה.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <h2 style="color: #9b87f5; margin-top: 0; font-size: 20px;">פרטי האירוע</h2>
            <p style="margin: 8px 0;"><strong>📍 מיקום:</strong><br>משרדי מיקרוסופט תל-אביב ב-Reactor<br>מידטאון תל אביב (דרך מנחם בגין 144, קומה 50)</p>
            <p style="margin: 8px 0;"><strong>📅 תאריך:</strong><br>5 במרץ, 2025</p>
            <p style="margin: 8px 0;"><strong>⏰ שעה:</strong><br>17:00 - 20:00</p>
            <p style="margin: 8px 0;"><strong>🔗 אתר האירוע:</strong><br><a href="https://copilot-conference-hub.lovable.app/" style="color: #9b87f5; text-decoration: none;">copilot-conference-hub.lovable.app</a></p>
          </div>

          <div style="margin: 24px 0;">
            <h3 style="color: #9b87f5; margin-bottom: 16px;">הוסף ליומן שלך</h3>
            <div class="button-container" style="display: flex; flex-direction: column; gap: 16px;">
              <a href="${google}" class="calendar-button" style="display: inline-block; background-color: #9b87f5; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold; transition: background-color 0.3s ease;">הוסף ליומן Google</a>
              <a href="${outlook}" download="copilot-conference.ics" class="calendar-button" style="display: inline-block; background-color: #8067f0; color: white; padding: 14px 24px; text-decoration: none; border-radius: 8px; text-align: center; font-weight: bold; transition: background-color 0.3s ease;">הוסף ליומן Outlook</a>
            </div>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          
          <p style="color: #666; font-style: italic;">מצפים לראותך באירוע!</p>
          <p style="color: #666; margin-bottom: 0;">בברכה,<br><strong>צוות Microsoft Copilot</strong></p>
        </div>
      </div>
    </div>
</body>
</html>`
  };
};