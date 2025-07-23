/**
 * Seed file for inserting initial partner organizations
 * Requires that the 'partners' table supports 'jsonb' for tags, contacts, etc.
 */

export const seed = async function (knex) {
  // Clean duplicates before insert
  await knex('partners').del();

  const partners = [
    {
      id: 2,
      slug: 'ngo-rehabilitation-and-recovery-center',
      title: 'Громадська організація «Центр реабілітації та відновлення»',
      images: ['logo-centr-recovery.jpg'],
      tags: ['Благодійність', 'Реабілітація', 'Відновлення'],
      category: 'Благодійність',
      url: 'https://www.rehabilitation-recovery-center.org.ua/',
      excerpt: 'Наша мета – щоб кожна людина стала духовно цілісною!',
      content: `<div class="">
        <h1>Центр реабілітації та відновлення:</h1>
      </div>
        <div class="">
          <div class="">
        </div>
      </div>
      <div class="">
        <ul>
          <li>надає інформацію з питань соціального захисту, медичної, правової допомоги, адміністративних послуг;</li>
          <li>супроводжує у складних життєвих ситуаціях;</li>
          <li>займається представництвом інтересів та посередництвом;</li>
          <li>надає допомогу у розвитку та вихованні дітей;</li>
          <li>організовує фахову психологічну підтримку.</li>
        </ul>
      </div>
      <div>
        <a class="" target="_self" href="https://www.rehabilitation-recovery-center.org.ua/causes/">
          <span class="fusion-button-text">докладніше</span>
        </a>
      </div>`,
      address: 'м.Хмельницький, вул.Гагаріна 13/1',
      contacts: JSON.stringify({
        address: 'м.Хмельницький, вул.Гагаріна 13/1',
        phone: '+3800931568887',
        email: 'info@rehabilitation-recovery-center.org.ua',
        socials: {
          facebook: 'https://www.facebook.com/Rehabilitation.Recovery.centers',
        },
      }),
      created_at: new Date('2025-07-22'),
    },
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
      content: `<p>Виконавчий комітет Старокостянтинівської міської ради — це колегіальний орган, що здійснює виконавчі функції місцевого самоврядування. До його повноважень входить попередній розгляд і схвалення проєктів місцевих програм соціально-економічного та культурного розвитку, прогнозу і проєкту місцевого бюджету, а також інших рішень, які вносяться на розгляд ради.</p>
                <p>Виконком координує діяльність відділів, управлінь та інших виконавчих органів ради, а також підприємств, установ і організацій, що належать до комунальної власності громади. Має право заслуховувати звіти керівників таких структур.</p> 
                <p>Крім того, виконавчий комітет має право змінювати або скасовувати акти підпорядкованих виконавчих органів та їх посадових осіб. У межах повноважень, визначених законодавством, рада може додатково розмежовувати функції між виконкомом, відділами та головою ради для ефективнішого надання адміністративних послуг.</p>`,
      address:
        'Хмельницька область, м.Старокостянтинів, вул. Острозького, 41, ',
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
      id: 3,
      slug: 'charitable-foundation-of-social-reforms-hope',
      title: 'Благодійний фонд соціальних реформ та підтримки «Надія»',
      images: ['cfhope-logo-tranparent.png'],
      tags: ['Благодійність', 'Соціальні реформи', 'Підтримка'],
      category: 'Благодійність',
      url: 'https://cfhope.in.ua',
      excerpt:
        'Благодійний фонд соціальних реформ та підтримки «Надія» займається наданням допомоги внутрішньо переміщеним особам та людям, які постраждали від війни в Україні.',
      content:
        'Благодійний фонд соціальних реформ та підтримки «Надія» з 2016 року працює над наданням допомоги внутрішньо переміщеним особам та людям, які постраждали від війни в Україні. Ми організовуємо гуманітарну допомогу, медичну підтримку та соціальні програми для покращення якості життя наших підопічних.',
      address: 'вул. Нечаєва, буд.16, м.Авдіївка, Донецької області, Україна',
      contacts: JSON.stringify({
        address: 'вул. Нечаєва, буд.16, м.Авдіївка, Донецької області, Україна',
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
