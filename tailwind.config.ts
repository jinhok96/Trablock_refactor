import { Config } from 'tailwindcss/types';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        spin: 'spin 0.9s linear infinite'
      },
      backgroundColor: {
        overlay: 'rgba(0, 0, 0, 0.6)',
        'overlay-light': 'rgba(0, 0, 0, 0.3)'
      },
      boxShadow: {
        modal: '0 0 0.625rem 0 rgba(0, 0, 0, 0.10)',
        toast: '0 0 0.5rem 0 rgba(0, 0, 0, 0.10)',
        dropdown: '0 0 0.5rem 0 rgba(0, 0, 0, 0.10)',
        button: '0 0 0.5rem 0 rgba(0, 0, 0, 0.08)',
        bottom: '0 0.25rem 0.75rem -0.1rem rgba(0, 0, 0, 0.05)'
      },
      screens: {
        rdp: '510px',
        '3xl': '2561px'
      },
      transitionProperty: {
        'max-height': 'max-height'
      },
      zIndex: {
        toast: '9999',
        modal: '9998'
      },
      fontFamily: {
        pretendard: 'Pretendard, sans-serif'
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%'
      },
      colors: {
        black: {
          '01': '#2D3136',
          '02': '#3C4352',
          '03': '#697586'
        },
        gray: {
          '01': '#A0AAB8',
          '02': '#DDE2E9',
          '03': '#EDEFF2'
        },
        white: {
          '01': '#FFFFFF'
        },
        red: {
          '01': '#ED1C24'
        },
        primary: {
          '01': '#4F80FF',
          '02': '#DEEBFF',
          '03': '#F7F9FD'
        },
        secondary: {
          '01': '#F5BA07',
          '02': '#FFF6DC'
        },
        block: {
          pink: {
            '01': '#FB2F85',
            '02': '#FFEFF4'
          },
          green: {
            '01': '#55B135',
            '02': '#F1FBED'
          },
          purple: {
            '01': '#9747FF',
            '02': '#F4ECFF'
          },
          orange: {
            '01': '#F35802',
            '02': '#FFF0EA'
          }
        },
        point: '#FF6060',
        kakao: '#FEE500'
      }
    }
  },
  plugins: [require('tailwind-scrollbar-hide')]
};
export default config;
