const conf = require('dotenv')
const sendgrid = require('@sendgrid/mail')

conf.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (receiver , source , subject,content)=> {
    try{
        const data = {
            to : receiver,
            from : source,
            subject,
            html : content,
        }; 
        return sendgrid.send(data);
    }
    catch (e){
        return new Error(e)

    }
}

module.exports = sendEmail;