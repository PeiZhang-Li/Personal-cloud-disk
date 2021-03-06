let nodemailer = require('nodemailer');
let sendemail = {
    sends: function (emailUrl) {
        return new Promise(resolve => {
            let transporter = nodemailer.createTransport({
                // 使用qq发送邮件
                // 更多请查看支持列表：https://nodemailer.com/smtp/well-known/
                service: 'qq',
                port: 465, // SMTP 端口
                secureConnection: true, // 使用了 SSL
                auth: {
                    user: '593872818@qq.com',
                    pass: 'mcpviisjisqwbcaj',
                }
            });
            let now = new Date().getTime();
            let nowstr = String(Number(now))
            let nows = nowstr.substring(nowstr.length - 6, nowstr.length);
            let mailOpt = {
                from: `"Hello,云" <593872818@qq.com>`, // 你到qq邮箱地址
                to: `${emailUrl}`, // 接受人,可以群发填写多个逗号分隔
                subject: '重置您的账户密码', // 主题名(邮件名)
                html: `<b>您的验证码为${nows}</b>` // html
            };
            transporter.sendMail(mailOpt, (error, info = {}) => {
                if (error) {
                    resolve('-1')
                    console.log(error)
                } else {
                    resolve(nows)
                }
            });
        })
    }
};
module.exports = sendemail;