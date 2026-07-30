// Render'ın botu canlı algılaması için basit HTTP web sunucusu
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot 7/24 Aktif Durumda!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda çalışıyor.`);
});

// --- MINEFLAYER BOT KODLARI ---
const mineflayer = require('mineflayer');

// Sunucu ve Bot Ayarları
const config = {
  host: 'oyna.CapeNW.org', // Sunucu IP adresi eklendi
  port: 25565,
  username: 'gta2'          // Kullanıcı adı eklendi
};

function createBot() {
  console.log('Bot sunucuya bağlanıyor...');

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username
  });

  // Oyuna giriş yapıldığında
  bot.on('spawn', () => {
    console.log(`${bot.username} başarıyla sunucuya girdi!`);
    
    // Eğer sunucuya şifre ile giriliyorsa alttaki // işaretini kaldırıp şifreni yaz:
    // bot.chat('/login SIFRENIZ');

    // Anti-AFK: Sunucudan atılmamak için her 60 saniyede bir zıplar
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  // Sunucudan düşerse otomatik tekrar bağlanır
  bot.on('end', (reason) => {
    console.log(`Bot sunucudan koptu (${reason}). 10 saniye sonra tekrar bağlanılıyor...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Hata oluştu:', err.message);
  });
}

// Botu başlat
createBot();// Render'ın botu canlı algılaması için basit HTTP web sunucusu
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Bot 7/24 Aktif Durumda!');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Web sunucusu ${PORT} portunda çalışıyor.`);
});

// --- MINEFLAYER BOT KODLARI ---
const mineflayer = require('mineflayer');

// Sunucu ve Bot Ayarları
const config = {
  host: 'oyna.CapeNW.org', // Sunucu IP adresi eklendi
  port: 25565,
  username: 'gta2'          // Kullanıcı adı eklendi
};

function createBot() {
  console.log('Bot sunucuya bağlanıyor...');

  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username
  });

  // Oyuna giriş yapıldığında
  bot.on('spawn', () => {
    console.log(`${bot.username} başarıyla sunucuya girdi!`);
    
    // Eğer sunucuya şifre ile giriliyorsa alttaki // işaretini kaldırıp şifreni yaz:
    // bot.chat('/login SIFRENIZ');

    // Anti-AFK: Sunucudan atılmamak için her 60 saniyede bir zıplar
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 60000);
  });

  // Sunucudan düşerse otomatik tekrar bağlanır
  bot.on('end', (reason) => {
    console.log(`Bot sunucudan koptu (${reason}). 10 saniye sonra tekrar bağlanılıyor...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Hata oluştu:', err.message);
  });
}

// Botu başlat
createBot();