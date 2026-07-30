const http = require('http');
const mineflayer = require('mineflayer');

// Render'ın botu canlı algılaması için HTTP web sunucusu
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot 7/24 Aktif Durumda!');
});

server.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda aktif.`);
});

// Bot Ayarları
const config = {
  host: 'oyna.CapeNW.org',
  port: 25565,
  username: 'gta2'
};

function createBot() {
  console.log('Bot sunucuya bağlanıyor...');

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username
  });

  bot.on('spawn', () => {
    console.log(`${bot.username} başarıyla sunucuya girdi!`);
    
    // Sunucuda şifre girişi gerekiyorsa alt satırdaki // kaldırıp şifreni yazabilirsin:
    // bot.chat('/login SIFRENIZ');

    // Anti-AFK (60 saniyede bir zıplar)
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
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
