const isDeployPreview = process.env.hasOwnProperty('DEPLOY_PREVIEW');

const meta = {
  title: 'Vue SS Select | Renderless Select Component',
  description: 'Searchable stylable select component for VueJS. This component is `renderless` so you are free to customize it however you need to!',
  url: 'https://vue-ss-select.com',
};

let head = [
  ['meta', {name: 'msapplication-TileColor', content: '#000000'}],
  ['meta', {name: 'title', content: meta.title}],
  ['meta', {name: 'description', content: meta.description}],
  [
    'link',
    {
      href: 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css',
      rel: 'stylesheet',
      type: 'text/css',
    }
   ],
];

if (isDeployPreview) {
  head.push(
    ['meta', {name: 'robots', content: 'noindex'}],
    ['meta', {name: 'googlebot', content: 'noindex'}],
  );
}

module.exports = {
  title: 'Vue SS Select',
  description: meta.description,
  head,
  plugins: {},
  themeConfig: {
    editLinks: true,
    docsDir: 'docs',
    nav: [
      {text: 'Home', link: '/'},
    ],
    sidebar: {
      '/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            ['markdown/Installation', 'Installation'],
            ['markdown/Components', 'Components'],
            ['markdown/Features', 'Features'],
          ],
        },
      ],
    },
  },
}
