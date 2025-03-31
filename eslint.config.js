import antfu from '@antfu/eslint-config'

export default antfu({
    stylistic: {
        indent: 4, // 4, or 'tab'
        quotes: 'single', // or 'double'
    },

    react: true,
    typescript: true,
    vue: false,
    astro: true,
    markdown: false,

    rules: {
        'no-console': 'off',
        'curly': ['error', 'all'],
        'node/prefer-global/process': 'off',
        'brace-style': ['error', '1tbs'],
    },

    jsonc: false,
    yaml: false,
})
