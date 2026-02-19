# 💧 HydroCalc - Hydration Calculator

A beautiful, fast hydration calculator built with React, TypeScript, and Tailwind CSS. Calculate your optimal daily water intake based on weight, activity level, and climate.

## ✨ Features

- 🎯 **Accurate Calculations** - Science-based hydration formulas
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- 💾 **Local History** - Saves your last 10 calculations (browser localStorage)
- ⚡ **Lightning Fast** - Pure client-side, no backend needed
- 🌐 **Free Hosting** - Deployed on GitHub Pages

## 🚀 Live Demo

Visit: `https://YOUR_USERNAME.github.io/hydration-calculator/`

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **Vite** - Build tool
- **GitHub Pages** - Hosting

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/hydration-calculator.git
cd hydration-calculator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚢 Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

This will:
1. Build your app
2. Create/update the `gh-pages` branch
3. Deploy to GitHub Pages

Make sure to:
1. Update `homepage` in `package.json`
2. Update `base` in `vite.config.ts`
3. Enable GitHub Pages in repository settings

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── select-custom.tsx
│   └── WaveBackground.tsx
├── lib/
│   └── utils.ts         # Utility functions
├── pages/
│   └── Home.tsx         # Main calculator page
├── App.tsx              # Root component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🧮 Calculation Formula

The calculator uses a multi-factor approach:

1. **Base hydration**: `Weight (lbs) × 0.5 oz`
2. **Activity adjustments**:
   - Sedentary: +0 oz
   - Light: +12 oz
   - Moderate: +24 oz
   - Active: +30 oz
   - Extra Active: +40 oz
3. **Climate multipliers**:
   - Moderate: ×1.0
   - Dry & Hot: ×1.12
   - Humid: ×1.07

## 🎨 Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: 199 89% 48%;  /* Main blue */
  --secondary: 180 50% 96%; /* Soft teal */
  /* ... */
}
```

### Fonts
Change fonts in `index.html` and `tailwind.config.js`:
```js
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
  display: ['Your Display Font', 'sans-serif'],
}
```

### Formula
Modify the `calculateWaterNeeds` function in `src/pages/Home.tsx`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Design inspired by modern water tracking apps
- Built with components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/YOUR_USERNAME/hydration-calculator](https://github.com/YOUR_USERNAME/hydration-calculator)

---

Made with 💧 and ⚛️