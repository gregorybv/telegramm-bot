// https://t.me/MyCourseNewEchoBot

const {Telegraf, Markup} = require('telegraf');

const bot = new Telegraf('7478098844:AAEkVnG7tl4ult8Z6nLGTMPetYzuRIVNvgo');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCoinSide = () => getRandomInt(0, 1) === 0 ? 'Орёл' : 'Решка';
const coinInlineKeyboard = Markup.inlineKeyboard([Markup.button.callback('Подбросить ещё раз', 'flip_a_coin'),]);

bot.hears('Подбросить монетку 🪙', ctx => ctx.reply(getCoinSide(), coinInlineKeyboard));

bot.action('flip_a_coin', async (ctx) => {
  let newCoinSide;
  do {
    newCoinSide = getCoinSide();
  } while (newCoinSide === ctx.callbackQuery.message.text.split('\n')[0]);
  await ctx.editMessageText(`${newCoinSide}`, coinInlineKeyboard);
});

const getRandomNumber = () => getRandomInt(0, 100);

const praises = ['Вы молодец!', 'Отличная работа!', 'Вы просто супер!', 'Великолепно!', 'Превосходно!', 'Вы замечательный!', 'Вы великий человек!', 'Вы вдохновляете!', 'Вы потрясающий!', 'Продолжайте в том же духе!'];

const getPraise = () => praises[getRandomInt(0, praises.length - 1)];

const numberInlineKeyboard = Markup.inlineKeyboard([Markup.button.callback('Сгенерировать новое', 'random_number'),]);

const praiseInlineKeyboard = Markup.inlineKeyboard([Markup.button.callback('Похвалить ещё раз', 'praise'),]);

bot.hears('Случайное число 🤞', ctx => ctx.reply(getRandomNumber().toString(), numberInlineKeyboard));

bot.action('random_number', async (ctx) => {
  let newRandomNumber;
  do {
    newRandomNumber = getRandomNumber();
  } while (newRandomNumber.toString() === ctx.callbackQuery.message.text.split('\n')[0]);
  await ctx.editMessageText(`${newRandomNumber}`, numberInlineKeyboard);
});

bot.hears('Похвалить Вас 😊', ctx => ctx.reply(getPraise(), praiseInlineKeyboard));

bot.action('praise', async (ctx) => {
  let newPraise;
  do {
    newPraise = getPraise();
  } while (newPraise === ctx.callbackQuery.message.text.split('\n')[0]);
  await ctx.editMessageText(`${newPraise}`, praiseInlineKeyboard);
});

bot.use(async (ctx) => {
  await ctx.reply('Что нужно сделать?', Markup
    .keyboard([['Подбросить монетку 🪙', 'Случайное число 🤞', 'Похвалить Вас 😊'],]).resize());
});

bot.launch().then(() => console.log(''));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
