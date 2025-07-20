/**
 * Seed file for inserting initial partner organizations
 * Requires that the 'partners' table supports 'jsonb' for tags, contacts, etc.
 */

export const seed = async function (knex) {
  // Clean duplicates before insert
  await knex('partners').del();

  const partners = [
    {
      id: 1,
      slug: 'executive-committee-of-starokostyantyniv-city-council',
      title: 'Виконавчий комітет Старокостянтинівської міської ради',
      images: ['Coat_of_Arms_of_Starkon.png'],
      tags: ['ОМС', 'місто', 'влада'],
      category: 'ОМС',
      url: 'https://starkon.gov.ua/',
      excerpt:
        'Виконавчий комітет Старокостянтинівської міської ради, колегіальний виконавчим орган, що координує діяльність відділів ради, розглядає проєкти місцевих програм і бюджету, а також має право скасовувати акти підпорядкованих органів.',
      content:
        '<p>Виконавчий комітет Старокостянтинівської міської ради — це колегіальний орган...</p>',
      contacts: JSON.stringify({
        address:
          'Хмельницька область, м.Старокостянтинів, вул. Острозького, 41, ',
        phone: '(038-54) 3-23-55',
        email: 'stkrada@starkon.gov.ua',
        socials: {
          facebook: 'https://www.facebook.com/starkon',
        },
      }),
      created_at: new Date('2025-07-10'),
    },
    {
      id: 2,
      slug: 'charitable-foundation-of-social-reforms-hope',
      title: 'Благодійний фонд соціальних реформ та підтримки «Надія»',
      images: ['cfhope-logo-tranparent.png'],
      tags: ['Благодійність', 'Соціальні реформи', 'Підтримка'],
      category: 'Благодійність',
      url: 'https://cfhope.in.ua',
      excerpt:
        'Благодійний фонд соціальних реформ та підтримки «Надія» займається наданням допомоги...',
      content:
        'Благодійний фонд соціальних реформ та підтримки «Надія» з 2016 року працює...',
      contacts: JSON.stringify({
        address: 'вул. Грушевського, 1, Київ, Україна',
        phone: '+380 95 466 41 90',
        email: 'boss@cfhope.in.ua',
        socials: {
          facebook: 'https://www.facebook.com/cfhope',
          instagram: 'https://www.instagram.com/cfhope',
          twitter: 'https://twitter.com/cfhope',
        },
      }),
      created_at: new Date('2025-07-10'),
    },
  ];

  await knex('partners').insert(partners);
};
