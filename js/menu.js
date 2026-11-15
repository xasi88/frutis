// Меню Frutis. Цены и состав только с их слайдов «Меню» в Instagram (снято 2026-11-15).
// Позиция: id, name, desc, price или sizes [{name, price}], flavors (выбор вкуса), bulk {from, price}.
window.FRUTIS = {
  phone: '79633376252',
  freeFrom: 1000,
  villages: ['Валерик', 'Гехи', 'Катар-Юрт', 'Гехи-Чу', 'Шалажи'],
  sections: [
    { id: 'hity', name: 'Хиты и комбо', items: [
      { id: 'shokoset', name: 'Шокосет', badge: 'Новинка', desc: 'Пончики, панкейки, шокошарики и свежие фрукты в одном большом сете', price: 2200 },
      { id: 'shokochariki', name: 'Шокошарики', desc: 'Маленькие, но мощные', price: 350 },
      { id: 'shokoboks', name: 'Шокобокс', desc: 'Для настоящих ценителей', price: 450 },
      { id: 'salat', name: 'Фруктовый салат', desc: 'Свежесть и вкус', price: 450 },
      { id: 'frutoboks', name: 'Фрутобокс', sizes: [{ name: 'Маленький', price: 600 }, { name: 'Большой', price: 900 }] },
      { id: 'miks-choko', name: 'Микс Чокобокс 2 в 1', desc: 'Двойное удовольствие', price: 600 }
    ] },
    { id: 'frukty', name: 'Фрукты в шоколаде', items: [
      { id: 'klubnika', name: 'Клубника в шоколаде', desc: 'Стакан', sizes: [{ name: 'Малый', price: 550 }, { name: 'Большой', price: 1000 }] },
      { id: 'banan', name: 'Банан в шоколаде', desc: 'Стакан', sizes: [{ name: 'Малый', price: 300 }, { name: 'Большой', price: 550 }] },
      { id: 'banan-klubnika', name: 'Банан и клубника в шоколаде', desc: 'Стакан', sizes: [{ name: 'Малый', price: 500 }, { name: 'Большой', price: 1000 }] },
      { id: 'malina', name: 'Малина в шоколаде', sizes: [{ name: 'Малый', price: 500 }, { name: 'Большой', price: 1000 }] },
      { id: 'granat', name: 'Гранат в шоколаде', sizes: [{ name: 'Малый', price: 500 }, { name: 'Большой', price: 900 }] },
      { id: 'miks-fruktov', name: 'Микс фруктов в шоколаде', desc: 'Стакан', sizes: [{ name: 'Малый', price: 1000 }, { name: 'Большой', price: 2000 }] },
      { id: 'yagodnyj-ponchik', img: 'ponchik', name: 'Ягодный пончик', desc: 'Шоколад с ягодами в форме пончика, цена за штуку', price: 250 },
      { id: 'klubnika-svezhaya', name: 'Клубника свежая с шоколадом', price: 700 },
      { id: 'frukty-svezhie', name: 'Свежие фрукты в стакане', price: 550 }
    ] },
    { id: 'vafli', name: 'Вафли и панкейки', banner: 'pankejki-banner', items: [
      { id: 'vaflya-dubaj', name: 'Дубайская вафля', desc: 'Экзотический вкус', price: 700 },
      { id: 'vaflya-snikers', name: 'Вафля «Сникерс»', desc: 'Классическое сочетание', price: 500 },
      { id: 'vaflya-belg', name: 'Вафля в бельгийском шоколаде', price: 450 },
      { id: 'vaflya-stakan', name: 'Вафля в стакане', desc: 'Удобно и вкусно', price: 400 },
      { id: 'salat-pankejki', name: 'Салат с мини панкейками', desc: 'Неожиданный микс', price: 400 },
      { id: 'pankejki', name: 'Панкейки в шоколаде', price: 350 }
    ] },
    { id: 'ponchiki', name: 'Пончики и трайфлы', items: [
      { id: 'mini-ponchiki', name: 'Мини пончики', sizes: [{ name: '6 шт', price: 250 }, { name: '12 шт', price: 450 }] },
      { id: 'trajfl-korob', name: 'Трайфл в коробе', desc: 'Для компании', price: 400 },
      { id: 'trajfl-stakan', name: 'Трайфл в стакане', sizes: [{ name: 'Классика', price: 150 }, { name: 'Сникерс', price: 200 }] },
      { id: 'trajfl-dubaj', name: 'Дубайский трайфл в стакане', price: 300 },
      { id: 'roll', img: 'roll', name: 'Сладкий ролл или сэндвич', desc: 'Необычные десерты', price: 350 }
    ] },
    { id: 'pirozhnye', name: 'Корпусные пирожные', note: 'От 10 штук по 280 ₽. Для оптовиков своя цена: спросите в WhatsApp.', items: [
      { id: 'pirozhnoe', img: 'pirozhnye', name: 'Корпусное пирожное', desc: 'Выберите вкус. От 10 штук одного вкуса цена 280 ₽', price: 300, bulk: { from: 10, price: 280 },
        flavors: ['Кокос', 'Манго', 'Малина', 'Банан', 'Кофе', 'Бантик (бабл гам)', 'Роза (клубника)', 'Голубика', 'Арахис', 'Персик', 'Грецкий орех'] }
    ] },
    { id: 'torty', name: 'Торты', note: 'Все торты по 1600 ₽.', items: [
      { id: 'tort-mars', name: 'Торт «Марс»', price: 1600 },
      { id: 'tort-milka', name: 'Торт «Милка»', price: 1600 },
      { id: 'tort-klyuchik', name: 'Торт «Золотой ключик»', price: 1600 },
      { id: 'tort-praga', name: 'Торт «Прага»', price: 1600 },
      { id: 'tort-fistashka', name: 'Фисташковый торт', price: 1600 },
      { id: 'tort-napoleon', name: 'Торт «Наполеон»', price: 1600 },
      { id: 'tort-maestro', name: 'Торт «Маэстро»', price: 1600 },
      { id: 'tort-baunti', name: 'Торт «Баунти»', price: 1600 },
      { id: 'tort-oreh', name: 'Ореховый торт', price: 1600 }
    ] },
    { id: 'napitki', name: 'Мохито и тоники', items: [
      { id: 'mohito', name: 'Мохито', desc: 'Выберите вкус', price: 150,
        flavors: ['Ягодный', 'Клубничный', 'Голубая лагуна', 'Ананасовый', 'Манго-маракуйя'] },
      { id: 'tonik', name: 'Тоник с редбулом', price: 300 }
    ] },
    { id: 'dop', name: 'Дополнения', items: [
      { id: 'shokolad-dop', name: 'Дополнительный шоколад', price: 50 },
      { id: 'kruassan', img: 'kruassan', name: 'Круассан', sizes: [{ name: 'Классический', price: 150 }, { name: 'Сладкий', price: 150 }] }
    ] }
  ]
};
