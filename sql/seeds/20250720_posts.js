/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const seed = async (knex) => {
  // Спочатку видаляємо старі дані (залежності потрібно дропати в правильному порядку)
  await knex('post_hashtags').del();
  await knex('posts').del();
  await knex('hashtags').del();

  const postsData = [
    {
      id: '5',
      slug: 'rehome-help-find-housing-for-idps',
      title: 'ReHome — Допоможемо знайти житло для ВПО',
      images: ['rehome-ezgif.com-optijpeg.jpg'],
      tags: ['ВПО', 'молодь', 'ТОТ'],
      category: 'житло',
      excerpt:
        'ReHome — це платформа для збору інформації про занедбані будівлі, які можуть бути відновлені та використані як житло для переселенців (ВПО).',
      content:
        '<div class="text-gray-800 p-2">\nДжерело: <a href="https://www.rehome.com.ua/">www.rehome.com.ua</a>\n<UContainer class="mt-2">\n<UCard class="text-gray-800 bg-white">\n<template #header>\n<h1 class="text-xl font-semibold">ReHome</h1>\n</template>\n<p>ReHome — це платформа для збору інформації про занедбані будівлі, які можуть бути відновлені та використані як житло для переселенців (ВПО).</p>\n<p class="mt-4">Ми допомагаємо громадам та владі знаходити такі об’єкти, щоб дати їм нове життя.</p>\n<div class="mt-3">\n<iframe width="560" height="315" src="https://www.youtube.com/embed/BReii-bvgKY?si=trGkNRJTJ4qj2o_f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>\n</div>\n</UCard>\n<UCard class="bg-blue-50">\n<template #header>\n<h2 class="text-lg font-semibold">Які об’єкти підходять?</h2>\n</template>\n<div class="grid md:grid-cols-2 gap-6">\n<ul class="space-y-6 text-gray-700">\n<li class="flex items-start gap-4">\n<div class="bg-orange-500 text-white flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold">1</div>\n<span>Колишні гуртожитки, школи, лікарні, адміністративні будівлі</span>\n</li>\n<li class="flex items-start gap-4">\n<div class="bg-orange-500 text-white flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold">2</div>\n<span>Покинуті житлові будинки, які можна відновити</span>\n</li>\n<li class="flex items-start gap-4">\n<div class="bg-orange-500 text-white flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold">3</div>\n<span>Будівлі у комунальній або державній власності</span>\n</li>\n<li class="flex items-start gap-4">\n<div class="bg-orange-500 text-white flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold">4</div>\n<span>Приватні будинки, власники яких готові їх надати</span>\n</li>\n<li class="flex items-start gap-4">\n<div class="bg-gray-600 text-white flex items-center justify-center w-12 h-12 rounded-full text-lg font-bold">✖</div>\n<span>Не підходять: аварійні об’єкти, пам’ятки архітектури без дозволу на реконструкцію</span>\n</li>\n</ul>\n</div>\n</UCard>\n</UContainer>\n<UContainer class="space-y-10 py-10">\n<UCard>\n<template #header>\n<h2 class="text-lg font-semibold text-center">Як зафіксувати об’єкт?</h2>\n</template>\n<div class="grid md:grid-cols-3 gap-6 text-center">\n<div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center">\n<UAvatar src="https://www.rehome.com.ua/wp-content/uploads/2025/04/1.png" alt="Фото будівлі" size="xl" class="mb-4" />\n<p>Зробіть фото будівлі з <br />різних ракурсів</p>\n</div>\n<div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center">\n<UAvatar src="https://www.rehome.com.ua/wp-content/uploads/2025/04/2.png" alt="Адреса" size="xl" class="mb-4" />\n<p>Запишіть адресу або точку <br />на карті</p>\n</div>\n<div class="bg-gray-50 rounded-2xl p-6 flex flex-col items-center">\n<UAvatar src="https://www.rehome.com.ua/wp-content/uploads/2025/04/3.png" alt="Стан будівлі" size="xl" class="mb-4" />\n<p>Опишіть стан: є дах, вікна, <br />комунікації чи ні</p>\n</div>\n</div>\n</UCard>\n<UCard class="bg-white text-gray-800">\n<p>Після цього завантажте інформацію на сайт <strong>ReHome</strong>, і ми передамо її відповідним органам влади для перевірки та подальшого відновлення.</p>\n<p class="mt-4 font-semibold">Долучайтеся до змін! Разом ми можемо знайти нові домівки для людей, які цього потребують.</p>\n<div class="mt-6">\n<UButton to="https://www.rehome.com.ua/%d0%b4%d0%be%d0%b4%d0%b0%d1%82%d0%b8-%d0%be%d0%b1%d1%94%d0%ba%d1%82/" color="primary" size="lg">Додати об’єкт</UButton>\n</div>\n</UCard>\n<UCard>\n<template #header>\n<h2 class="text-lg font-semibold">Контактні дані представників проєкту</h2>\n</template>\n<div class="space-y-8">\n<div class="flex items-start gap-4">\n<img src="https://www.rehome.com.ua/wp-content/themes/rehome-template/public/images/location.fdacd0.png" class="w-16" alt="Локація" />\n<div>\n<h4 class="text-[20px] font-bold">Головний офіс:</h4>\n<p class="mt-2">м.Дніпро, Сонячна Набережна, 2</p>\n</div>\n</div>\n<div class="flex items-start gap-4">\n<img src="https://www.rehome.com.ua/wp-content/themes/rehome-template/public/images/at.585f60.png" class="w-16" alt="Email" />\n<div>\n<h4 class="text-[20px] font-bold">Email:</h4>\n<a href="mailto:info@rehome.org.ua" class="text-blue-300 hover:underline">info@rehome.org.ua</a>\n</div>\n</div>\n</div>\n</UCard>\n</UContainer>\n</div>',
      createdAt: '2025-07-17',
    },
    {
      id: '4',
      slug: 'ukraine-awaits-youth-from-tot',
      title: 'Україна чекає на молодь з ТОТ',
      images: [
        'molod-free-(1).jpg',
        'molod-free-(2).jpg',
        'molod-free-(3).jpg',
        'molod-free-(4).jpg',
        'molod-free-(5).jpg',
      ],
      tags: ['ВПО', 'молодь', 'ТОТ'],
      category: 'ВПО',
      excerpt:
        'Інформація для абітурієнтів з тимчасово окупованих територій України...',
      content:
        '\n<div class="flex flex-col space-y-4 px-4 py-6">\n <a href="https://linktr.ee/vstup_tot" target="_blank" class="text-blue-700 hover:underline text-sm">\n Джерело: https://linktr.ee/vstup_tot\n </a>\n\n <div class="text-center">\n <h1 class="text-2xl font-bold mb-2">Вступ для абітурієнтів з ТОТ</h1>\n <h2 class="text-lg font-bold">Інформація для абітурієнтів з тимчасово окупованих територій України</h2>\n <h2 class="text-lg font-bold">Хочеш виїхати з тимчасово окупованих територій для навчання чи безпеки?</h2>\n <h2 class="text-lg font-bold">Ми допоможемо.</h2>\n </div>\n\n <p class="text-sm leading-6">\n Ви можете виїхати: самостійно для вступу до українського навчального закладу або разом із родиною, якщо небезпечно\n залишатися. Транспорт, житло, допомога з документами, супровід, психологічна та медична допомога — усе\n безкоштовно, безпечно та конфіденційно. Ця допомога надається в межах ініціативи Президента України\n  <strong>Bring Kids Back UA</strong>, яка спрямована на порятунок та повернення українських дітей з ТОТ та\n  території РФ. Звертайтесь — ми допоможемо. Все буде добре.\n  </p>\n\n  <h2 class="text-lg font-bold">Контакти для безпечного виїзду та підтримки</h2>\n\n  <ul class="list-disc space-y-3 pl-6 text-sm leading-6">\n   <li>\n  🔹 <strong>Bring Kids Back UA</strong><br />\n  <a href="mailto:osvita.tot@bringkidsback.org.ua" class="text-blue-700 hover:underline">\n  osvita.tot@bringkidsback.org.ua\n  </a>\n  </li>\n  <li>\n 🔹 <strong>Save Ukraine</strong><br />\n  <a href="tel:0800333129" class="text-blue-700 hover:underline">0 800 33 31 29</a><br />\n  <a href="mailto:info@saveukraineua.org" class="text-blue-700 hover:underline">info@saveukraineua.org</a><br />\n  <a href="https://t.me/SaveUkraineOfficial" target="_blank" class="text-blue-700 hover:underline">Telegram</a><br />\n  <a href="https://www.saveukraineua.org" target="_blank" class="text-blue-700 hover:underline">Сайт saveukraineua.org</a>\n  </li>\n  </ul>\n\n <p class="text-center">\n  <a href="https://www.osvita-tot.com/" target="_blank" class="text-lg font-bold text-blue-700 hover:underline">\n  Сайт для абітурієнтів з ТОТ osvita-tot.com\n  </a>\n  </p>\n  <p class="text-center">\n  <a href="https://www.crimea-ed.org/" target="_blank" class="text-lg font-bold text-blue-700 hover:underline">\n  Сайт для абітурієнтів з ТОТ Криму crimea-ed.org\n </a>\n </p>\n</div>\n<p>\n  <a href="https://tr.ee/nWnKdmwO1J" target="_blank" class="block max-w-sm">\n <img\n src="https://ugc.production.linktr.ee/91b94900-2c5d-46e2-8ffc-c65d89fe4e79_image.png"\n  alt="Інформаційна картинка"\n class="rounded-md shadow-md w-full h-auto object-contain"\n loading="lazy"\n  />\n  </a>\n</p>\n\n<h2 class="text-lg font-bold">Контакти для абітурієнтів</h2>\n\n<ul class="list-disc space-y-3 pl-6 text-sm leading-6">\n  <li>\n 🔹 <strong>Гаряча лінія з питань освіти для мешканців ТОТ:</strong><br />\n <a href="tel:0800504425" class="text-blue-700 hover:underline">0 800 50 44 25</a>\n  </li>\n  <li>\n 🔹 <strong>ГО «ЦГП «Альменда»</strong><br />\n <a href="tel:+380951364727" class="text-blue-700 hover:underline">+38 095 136 47 27</a> (Signal, Telegram,\n WhatsApp, Viber)<br />\n <a href="mailto:info@almenda.org" class="text-blue-700 hover:underline">info@almenda.org</a>\n  </li>\n  <li>\n 🔹 <strong>ГО «Донбас СОС»</strong><br />\n <a href="tel:0800309110" class="text-blue-700 hover:underline">0 800 309 110</a><br />\n <a href="tel:+380935006918" class="text-blue-700 hover:underline">+38 093 500 69 18</a> (Telegram, WhatsApp,\n Viber)<br />\n <a href="mailto:info@donbasssos.org" class="text-blue-700 hover:underline">info@donbasssos.org</a>\n  </li>\n  <li>\n 🔹 <strong>ГО «Крим СОС»</strong><br />\n <a href="tel:+380630771619" class="text-blue-700 hover:underline">+38 063 077 16 19</a><br />\n <a href="tel:+380962240123" class="text-blue-700 hover:underline">+38 096 224 01 23</a><br />\n  <a href="tel:+380952775355" class="text-blue-700 hover:underline">+38 095 277 53 55</a> (Signal, Telegram,\n WhatsApp, Viber)<br />\n <a href="mailto:help@krymsos.com" class="text-blue-700 hover:underline">help@krymsos.com</a>\n  </li>\n  <li>\n 🔹 <strong>БФ «Схід SOS»</strong><br />\n <a href="tel:0800332614" class="text-blue-700 hover:underline">0 800 332 614</a><br />\n  <a href="tel:+380688272895" class="text-blue-700 hover:underline">+38 068 827 2895</a> (Telegram)<br />\n  <a href="tel:+380953748270" class="text-blue-700 hover:underline">+38 095 374 82 70</a> (Viber)<br />\n <a href="mailto:tatyana.petrova@east-sos.org" class="text-blue-700 hover:underline">\n tatyana.petrova@east-sos.org\n </a>\n </li>\n <li>\n 🔹 <strong>Уповноважений ВРУ з прав людини</strong><br />\n <a href="tel:0800501720" class="text-blue-700 hover:underline">0800 50 17 20</a><br />\n <a href="tel:+380934068017" class="text-blue-700 hover:underline">+38 093 406 80 17</a> (WhatsApp, Viber,\n  Telegram)<br />\n <a href="mailto:hotline@ombudsman.gov.ua" class="text-blue-700 hover:underline">hotline@ombudsman.gov.ua</a>\n  </li>\n</ul>\n<a href="https://linktr.ee/vstup_tot" target="_blank" class="text-blue-700 hover:underline text-sm">\n  Джерело: https://linktr.ee/vstup_tot\n</a>\n',
      createdAt: '2025-07-17',
    },
    {
      id: 3,
      slug: 'vpo-from-legal-advice-to-empowerment',
      title: 'Ради ВПО: від адаптації до впливу',
      images: ['diaosvita-radivpo.webp'],
      tags: ['ВПО', 'освіта', 'права'],
      category: 'ВПО',
      excerpt:
        'Освітній серіал про створення й розвиток Рад ВПО як ефективного інструменту захисту прав та інтересів переселенців',
      content: `<div><a href="https://osvita.diia.gov.ua/courses/idp-councils-from-adaptation-to-impact" target="_blank" rel="noopener noreferrer" class="block bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 transition duration-200 space-y-3"><button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200" @click.stop>Розпочати</button><p>Освітній серіал «Ради ВПО: від адаптації до впливу» створено для підтримки розвитку Рад з питань внутрішньо переміщених осіб в Україні. У восьми серіях експерти розкривають усі аспекти діяльності Рад ВПО — від правових засад створення до практичних інструментів впливу на місцеву політику.</p><p>Ви дізнаєтеся про структуру та повноваження Рад, особливості співпраці з партнерами, розробку та моніторинг місцевих програм, стратегічне планування й ефективну комунікацію.</p><p>Освітній серіал створено благодійним фондом «Стабілізейшен Суппорт Сервісез» за підтримки Агентства ООН у справах біженців в Україні (УВКБ ООН) для платформи Дія.Освіта.</p><p>До 7 серпня (до 15:00) триває розіграш двох сертифікатів на книжки номіналом 1 000 грн за проходження освітнього серіалу. Дізнавайтеся умови участі в соцмережах БФ «Стабілізейшен Суппорт Сервісез».</p></a>Джерело: <a href="https://osvita.diia.gov.ua/courses/idp-councils-from-adaptation-to-impact" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">osvita.diia.gov.ua</a></div>`,
      createdAt: '2025-07-05',
    },
    {
      id: 2,
      slug: 'healthcare-access',
      title: 'Доступ до медичних послуг для ВПО',
      excerpt: 'Як отримати медичну допомогу та ліки...',
      content:
        'Повний текст статті про доступ до медичних послуг для внутрішньо переміщених осіб.',
      createdAt: '2025-07-10',
    },
    {
      id: 1,
      slug: 'employment-opportunities',
      title: 'Можливості працевлаштування для ВПО',
      excerpt: 'Де шукати роботу та як отримати допомогу у працевлаштуванні...',
      content:
        'Повний текст статті про можливості працевлаштування для внутрішньо переміщених осіб.',
      createdAt: '2025-07-20',
    },
  ];

  for (const post of postsData) {
    const { tags, createdAt, ...postData } = post;

    // Вставка публікації
    const [postId] = await knex('posts')
      .insert({
        ...postData,
        created_at: createdAt,
        updated_at: createdAt,
        status: 'published',
      })
      .returning('id');

    // Якщо є теги — додаємо
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        let hashtag = await knex('hashtags').where({ name: tag }).first();
        if (!hashtag) {
          const [tagId] = await knex('hashtags')
            .insert({
              name: tag,
              created_at: createdAt,
            })
            .returning('id');
          hashtag = { id: tagId.id || tagId };
        }

        await knex('post_hashtags').insert({
          post_id: postId.id || postId,
          hashtag_id: hashtag.id,
        });
      }
    }
  }
};
