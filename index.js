const http = require('http');
const mineflayer = require('mineflayer');

// Render canlı tutma sunucusu
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot 7/24 Aktif!');
});
server.listen(PORT, () => console.log(`Web sunucusu ${PORT} portunda aktif.`));

// Bot Konfigürasyonu
const config = {
  host: 'oyna.CapeNW.org',
  port: 25565,
  username: 'gta2',
  password: 'Gta2FarmBot123' // Otomatik belirlenmiş varsayılan şifre
};

function createBot() {
  console.log('Bot sunucuya bağlanıyor...');

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username
  });

  bot.on('spawn', () => {
    console.log(`${bot.username} başarıyla bağlandı. İşlemler başlatılıyor...`);

    // 1. ADIM: Kayıt Ol & Giriş Yap (3 saniye sonra)
    setTimeout(() => {
      bot.chat(`/register ${config.password} ${config.password}`);
      bot.chat(`/login ${config.password}`);
      console.log('Giriş/Kayıt komutları atıldı.');
    }, 3000);

    // 2. ADIM: Survival Sunucusuna Geç (7 saniye sonra)
    setTimeout(() => {
      bot.chat('/survival');
      console.log('Survival komutu atıldı.');
    }, 7000);

    // 3. ADIM: "gta" Oyuncusuna TP İsteği At (12 saniye sonra)
    setTimeout(() => {
      bot.chat('/tpa gta');
      console.log('gta oyuncusuna TP isteği gönderildi.');
    }, 12000);

    // Anti-AFK: Sunucudan atılmamak için her 60 saniyede bir zıplar
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  // Sunucu sohbetini Render Logs ekranında izlemek için
  bot.on('message', (message) => {
    console.log(`[Sunucu]: ${message.toAnsi()}`);
  });

  bot.on('end', (reason) => {
    console.log(`Bot sunucudan koptu (${reason}). 10 saniye sonra tekrar bağlanılıyor...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Hata oluştu:', err.message);
  });
}

createBot();
