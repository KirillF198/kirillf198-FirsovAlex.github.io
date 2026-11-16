// Основные данные психолога. При необходимости изменяйте их здесь.
const siteConfig = {
  fullName: 'Фирсов Александр Игоревич',
  telegram: 'copyfash',        // Telegram без @
  phone: '+7 920 293 30 18', // Номер для связи
  format: 'Уточняется при записи',
  duration: 'Уточняется при записи',
  price: 'Уточняется при записи',
  education: 'Обучение по направлению «Психологическое консультирование».'
};

function putText(selector, value) {
  document.querySelectorAll(selector).forEach(element => { element.textContent = value; });
}

putText('[data-full-name]', siteConfig.fullName);
putText('[data-format]', siteConfig.format);
putText('[data-duration]', siteConfig.duration);
putText('[data-price]', siteConfig.price);
putText('[data-education]', siteConfig.education);
document.title = `${siteConfig.fullName} — психолог-консультант`;
document.getElementById('year').textContent = String(new Date().getFullYear());

const dialog = document.getElementById('contact-dialog');
const telegram = document.querySelector('[data-telegram]');
const phone = document.querySelector('[data-phone]');
const missingContacts = document.getElementById('missing-contacts');
const telegramFooter = document.querySelector('[data-telegram-footer]');
const phoneFooter = document.querySelector('[data-phone-footer]');

const telegramUser = siteConfig.telegram.trim().replace(/^@/, '');
const hasTelegram = /^[a-zA-Z0-9_]{5,32}$/.test(telegramUser);
if (hasTelegram) {
  const url = `https://t.me/${telegramUser}`;
  telegram.href = url;
  telegram.hidden = false;
  telegramFooter.href = url;
  telegramFooter.textContent = `Telegram · @${telegramUser}`;
} else {
  telegramFooter.hidden = true;
}

const phoneNumber = siteConfig.phone.trim();
const dialNumber = phoneNumber.replace(/[^+\d]/g, '');
const hasPhone = /^\+?\d{10,15}$/.test(dialNumber);
if (hasPhone) {
  const url = `tel:${dialNumber}`;
  phone.href = url;
  phone.hidden = false;
  phoneFooter.href = url;
  phoneFooter.textContent = phoneNumber;
} else {
  phone.hidden = true;
  phoneFooter.hidden = true;
}
missingContacts.hidden = hasTelegram || hasPhone;

let lastTrigger = null;
document.querySelectorAll('[data-open-contact]').forEach(button => {
  button.addEventListener('click', () => {
    lastTrigger = button;
    if (!dialog.open) dialog.showModal();
  });
});
document.querySelector('[data-close-contact]').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  if (lastTrigger) lastTrigger.focus();
});
