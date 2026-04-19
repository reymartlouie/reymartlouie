import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#111111',
        accent: '#0099ff',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-archivo-black)', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1440px',
      },
      containers: {
        xs:  '240px',
        sm:  '340px',
        md:  '460px',
        lg:  '600px',
        xl:  '760px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

export default config
