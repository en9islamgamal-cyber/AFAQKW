/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 👇 الألوان الجديدة الخاصة بالهوية الفاتحة لشركة آفاق
        afaq: {
          bg: '#FFFFFF',          // أبيض ناصع للخلفية الأساسية
          section: '#F8F9FA',     // أبيض مكسور لتمييز السكاشن عن بعضها
          textMain: '#1F2937',    // رمادي داكن (قريب للأسود) للنصوص عشان القراءة
          blue: '#0F172A',        // كحلي هندسي داكن جداً للوجو والعناوين
          orange: '#FF6A00',      // لونكم البرتقالي المعتاد للزراير
        },
        // سيبت لك الألوان القديمة مؤقتاً عشان الموقع مايضربش لحد ما نعدل كل الصفحات
        navy: {
          900: '#0B0F17',
          800: '#141B2A',
          700: '#1C2538',
        },
        orange: {
          DEFAULT: '#FF6A00',
        },
        gray: {
          cool: '#A9B3C7',
          light: '#E5E7EB', // ضفتلك رمادي فاتح للحدود (Borders)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'hero': 'clamp(44px, 5vw, 84px)',
        'section': 'clamp(34px, 3.6vw, 56px)',
        'body': 'clamp(14px, 1.1vw, 18px)',
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 18px 50px rgba(0,0,0,0.08)", // قللت الشادو شوية عشان يليق مع الفواتح
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
