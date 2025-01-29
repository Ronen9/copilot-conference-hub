export const getEmailStyles = () => `
  body { 
    margin: 0; 
    padding: 0; 
    font-family: Arial, sans-serif; 
    -webkit-text-size-adjust: 100%; 
  }
  .container { 
    max-width: 600px; 
    margin: 0 auto; 
    padding: 20px; 
  }
  .header { 
    background-color: #9b87f5; 
    padding: 20px; 
    text-align: center; 
  }
  .content { 
    background-color: #ffffff; 
    padding: 24px; 
  }
  .button { 
    display: inline-block; 
    background-color: #9b87f5; 
    color: #ffffff !important; 
    padding: 12px 24px; 
    text-decoration: none; 
    border-radius: 5px; 
    margin: 10px; 
    font-weight: bold; 
  }
  .details { 
    margin: 20px 0; 
    padding-left: 15px; 
    border-left: 4px solid #9b87f5; 
  }
  .rtl-details { 
    margin: 20px 0; 
    padding-right: 15px; 
    border-right: 4px solid #9b87f5; 
    border-left: none; 
  }
  @media only screen and (max-width: 600px) {
    .container { 
      width: 100% !important; 
      padding: 10px !important; 
    }
    .button { 
      display: block !important; 
      width: auto !important; 
      margin: 10px 0 !important; 
      text-align: center; 
    }
    .logo { 
      width: 150px !important; 
    }
  }
`;