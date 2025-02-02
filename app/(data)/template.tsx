export default [
  {
    name: 'Content Generator',
    desc: 'AI tool that generates content based on the provided outline or topic.',
    category:'Blog',
    icon: 'https://cdn-icons-png.flaticon.com/128/9079/9079294.png',
    aiPrompt: 'Generate detailed content based on the provided outline or topic. Provide the result in rich text editor format.',
    slug: 'generate-content',
    form: [
        {
            label: 'Enter your content topic',
            field: 'input',
            name: 'topic',
            required: true,
        },
        {
            label: 'Enter content outline (optional)',
            field: 'textarea',
            name: 'outline',
        }
    ]
},
]