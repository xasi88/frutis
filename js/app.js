// Каталог Frutis: меню, корзина, заказ готовым текстом в WhatsApp.
(function () {
  'use strict';
  var D = window.FRUTIS;
  var KEY = 'frutis-korzina';
  var korzina = load();
  var tovary = {};
  var $ = function (id) { return document.getElementById(id); };
  var rub = function (n) { return n.toLocaleString('ru-RU') + ' ₽'; };

  D.sections.forEach(function (s) { s.items.forEach(function (t) { tovary[t.id] = t; }); });

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(korzina)); } catch (e) { /* без памяти тоже работает */ }
  }
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function cenaStroki(s) {
    var t = tovary[s.id];
    var cena = s.cena;
    if (t && t.bulk && s.kol >= t.bulk.from) cena = t.bulk.price;
    return cena * s.kol;
  }
  function vsego() { return korzina.reduce(function (a, s) { return a + cenaStroki(s); }, 0); }
  function shtuk() { return korzina.reduce(function (a, s) { return a + s.kol; }, 0); }
  function prostoj(t) { return !t.sizes && !t.flavors; }
  function vKorzine(id) {
    return korzina.filter(function (s) { return s.id === id; }).reduce(function (a, s) { return a + s.kol; }, 0);
  }

  // Меню
  function risuyMenu() {
    var nav = $('razdely'), menu = $('menu');
    D.sections.forEach(function (s) {
      var a = el('a', 'razdely__k', s.name);
      a.href = '#' + s.id;
      nav.appendChild(a);
      var sec = el('section', 'razdel');
      sec.id = s.id;
      sec.appendChild(el('h2', 'razdel__zag', s.name));
      if (s.note) sec.appendChild(el('p', 'razdel__zametka', s.note));
      if (s.banner) {
        var b = el('img', 'razdel__foto');
        b.src = 'img/menu/' + s.banner + '.webp';
        b.alt = s.name + ' Frutis';
        b.loading = 'lazy'; b.width = 720; b.height = 360;
        sec.appendChild(b);
      }
      var ul = el('ul', 'kartochki');
      s.items.forEach(function (t) { ul.appendChild(kartochka(t)); });
      sec.appendChild(ul);
      menu.appendChild(sec);
    });
  }
  function cenaTekst(t) {
    if (t.sizes) {
      var c = t.sizes.map(function (z) { return z.price; });
      var min = Math.min.apply(null, c), max = Math.max.apply(null, c);
      return min === max ? rub(min) : rub(min) + ' / ' + rub(max);
    }
    return rub(t.price);
  }
  function kartochka(t) {
    var li = el('li', 'kartochka');
    li.dataset.id = t.id;
    if (t.img) {
      var f = el('img', 'kartochka__foto');
      f.src = 'img/menu/' + t.img + '-240.webp';
      f.srcset = 'img/menu/' + t.img + '-240.webp 240w, img/menu/' + t.img + '-480.webp 480w';
      f.sizes = '88px';
      f.alt = t.name;
      f.loading = 'lazy'; f.width = 88; f.height = 88;
      li.appendChild(f);
    }
    var txt = el('div', 'kartochka__txt');
    if (t.badge) txt.appendChild(el('span', 'metka', t.badge));
    txt.appendChild(el('h3', 'kartochka__imya', t.name));
    var opis = t.desc || '';
    if (t.sizes) opis = (opis ? opis + '. ' : '') + t.sizes.map(function (z) { return z.name + ' ' + rub(z.price); }).join(', ');
    if (opis) txt.appendChild(el('p', 'kartochka__opis', opis));
    txt.appendChild(el('p', 'kartochka__cena', cenaTekst(t)));
    li.appendChild(txt);
    li.appendChild(el('div', 'kartochka__upr'));
    obnoviKartochku(li);
    return li;
  }
  function obnoviKartochku(li) {
    var t = tovary[li.dataset.id];
    var upr = li.querySelector('.kartochka__upr');
    upr.textContent = '';
    var n = vKorzine(t.id);
    if (prostoj(t) && n > 0) {
      upr.appendChild(knopka('−', 'shag', 'Убрать одну', function () { izmeni(t.id, '', -1); }));
      upr.appendChild(el('span', 'shag__n', n));
      upr.appendChild(knopka('+', 'shag', 'Добавить ещё', function () { izmeni(t.id, '', 1); }));
    } else {
      var b = knopka('+', 'dobavit', 'Добавить: ' + t.name, function () {
        if (prostoj(t)) izmeni(t.id, '', 1); else otkrojVybor(t);
      });
      if (n > 0) b.appendChild(el('span', 'dobavit__n', n));
      upr.appendChild(b);
    }
  }
  function knopka(text, cls, label, fn) {
    var b = el('button', cls, text);
    b.type = 'button';
    b.setAttribute('aria-label', label);
    b.addEventListener('click', fn);
    return b;
  }

  // Корзина
  function izmeni(id, variant, d, cena) {
    var s = korzina.find(function (x) { return x.id === id && x.variant === variant; });
    if (!s) {
      if (d <= 0) return;
      var t = tovary[id];
      s = { id: id, variant: variant, kol: 0, cena: cena != null ? cena : t.price };
      korzina.push(s);
    }
    s.kol += d;
    if (s.kol <= 0) korzina.splice(korzina.indexOf(s), 1);
    save();
    obnovi();
  }
  function obnovi() {
    document.querySelectorAll('.kartochka').forEach(obnoviKartochku);
    var n = shtuk();
    $('korzinaKnopka').hidden = n === 0;
    $('korzinaChislo').textContent = n;
    $('korzinaSumma').textContent = rub(vsego());
    if (!$('korzina').hidden) risuyKorzinu();
  }
  function risuyKorzinu() {
    var ul = $('korzinaSpisok');
    ul.textContent = '';
    if (!korzina.length) { zakryt($('korzina')); return; }
    korzina.forEach(function (s) {
      var t = tovary[s.id];
      var li = el('li', 'stroka');
      var txt = el('div', 'stroka__txt');
      txt.appendChild(el('b', null, t.name));
      if (s.variant) txt.appendChild(el('span', null, s.variant));
      li.appendChild(txt);
      var upr = el('div', 'stroka__upr');
      upr.appendChild(knopka('−', 'shag', 'Убрать одну', function () { izmeni(s.id, s.variant, -1); }));
      upr.appendChild(el('span', 'shag__n', s.kol));
      upr.appendChild(knopka('+', 'shag', 'Добавить ещё', function () { izmeni(s.id, s.variant, 1); }));
      li.appendChild(upr);
      li.appendChild(el('span', 'stroka__summa', rub(cenaStroki(s))));
      ul.appendChild(li);
    });
    var sum = vsego();
    $('itogSumma').textContent = rub(sum);
    var dost = sposob() === 'Доставка';
    $('dostavkaPolya').hidden = !dost;
    $('dostavkaZametka').textContent = !dost ? '' : sum >= D.freeFrom ? 'Доставка бесплатная.'
      : 'Доставка бесплатная от ' + rub(D.freeFrom) + '. До этой суммы цену доставки скажут в WhatsApp.';
  }
  function sposob() { return $('forma').sposob.value; }

  // Выбор размера и вкуса
  var tekushij = null;
  function otkrojVybor(t) {
    tekushij = t;
    $('vyborImya').textContent = t.name;
    $('vyborOpis').textContent = t.desc || '';
    var box = $('vyborVarianty');
    box.textContent = '';
    var spisok = t.sizes || t.flavors.map(function (f) { return { name: f, price: t.price }; });
    var fs = el('fieldset', 'varianty');
    fs.appendChild(el('legend', null, t.sizes ? 'Размер' : 'Вкус'));
    spisok.forEach(function (v, i) {
      var l = el('label', 'variant');
      var r = document.createElement('input');
      r.type = 'radio'; r.name = 'variant'; r.value = i; r.checked = i === 0;
      l.appendChild(r);
      l.appendChild(el('span', null, v.name));
      if (t.sizes) l.appendChild(el('b', null, rub(v.price)));
      fs.appendChild(l);
    });
    box.appendChild(fs);
    tekushij.spisok = spisok;
    otkryt($('vybor'));
  }
  $('vyborDobavit').addEventListener('click', function () {
    var i = +document.querySelector('#vyborVarianty input:checked').value;
    var v = tekushij.spisok[i];
    izmeni(tekushij.id, v.name, 1, v.price);
    zakryt($('vybor'));
  });

  // Окна
  var proshlyj = null;
  function otkryt(o) {
    proshlyj = document.activeElement;
    o.hidden = false;
    document.body.classList.add('bez-prokrutki');
    var z = o.querySelector('.list__zakryt');
    if (z) z.focus();
  }
  function zakryt(o) {
    o.hidden = true;
    if ($('vybor').hidden && $('korzina').hidden) document.body.classList.remove('bez-prokrutki');
    if (proshlyj) proshlyj.focus();
  }
  document.querySelectorAll('[data-zakryt]').forEach(function (b) {
    b.addEventListener('click', function () { zakryt(b.closest('.okno')); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.okno:not([hidden])').forEach(zakryt);
  });
  $('korzinaKnopka').addEventListener('click', function () { risuyKorzinu(); otkryt($('korzina')); });

  // Заказ
  var selo = $('selo');
  D.villages.forEach(function (v) { selo.appendChild(new Option(v, v)); });
  $('forma').addEventListener('change', function (e) { if (e.target.name === 'sposob') risuyKorzinu(); });
  $('forma').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var dost = sposob() === 'Доставка';
    if (dost && !f.adres.value.trim()) {
      $('oshibka').textContent = 'Напишите улицу и дом, чтобы курьер нашёл вас.';
      f.adres.focus();
      return;
    }
    $('oshibka').textContent = '';
    var str = ['Здравствуйте! Хочу заказать в Frutis:', ''];
    korzina.forEach(function (s) {
      var t = tovary[s.id];
      str.push('• ' + t.name + (s.variant ? ' (' + s.variant + ')' : '') + ' × ' + s.kol + ' = ' + rub(cenaStroki(s)));
    });
    str.push('', 'Итого: ' + rub(vsego()));
    str.push(dost ? 'Доставка: с. ' + f.selo.value + ', ' + f.adres.value.trim() : 'Самовывоз');
    if (f.imya.value.trim()) str.push('Имя: ' + f.imya.value.trim());
    if (f.pozhelanie.value.trim()) str.push('Пожелание: ' + f.pozhelanie.value.trim());
    window.location.href = 'https://wa.me/' + D.phone + '?text=' + encodeURIComponent(str.join('\n'));
  });

  risuyMenu();
  obnovi();
})();
