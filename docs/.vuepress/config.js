const isDeployPreview = process.env.hasOwnProperty('DEPLOY_PREVIEW');

const meta = {
  title: 'Vue ss-select | Renderless Select Component',
  description: 'Stylable searchable select component for VueJS. This component is renderless so you are free to customize it however you need to!',
  url: 'https://5ce13d113346fb00089966db--festive-edison-f92c64.netlify.com/',
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
  title: 'Vue ss-select',
  description: meta.description,
  head,
  plugins: {},
  themeConfig: {
    editLinks: true,
    docsDir: 'docs',
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Github', link: 'https://github.com/miggiboy/ss-select'},
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
