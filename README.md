# Amiru Mallawa Arachchi - AI Engineer Portfolio

A high-end, anti-gravity themed portfolio website showcasing AI/ML projects, blog posts, and professional experience.

## 🌟 Features

- **Dark Theme with Scrolling Animations**: Elegant black background with white text
- **3D Laptop Animation**: Interactive Three.js scroll animation in the About section
- **Responsive Cursor**: Interactive cursor that responds to hover states
- **Home Page**: Comprehensive overview with skills, experience, education, and interests
- **Projects**: Portfolio showcase with detailed project pages
- **Blog**: Medium post integration with card-based layout
- **Contact**: Direct email functionality with beautiful form design
- **Smooth Animations**: Framer Motion powered micro-interactions

## 🚀 Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion
- **Database**: Supabase
- **Deployment**: Vercel

## 📁 Project Structure

```
amiru-portfolio/
├── app/                    # Next.js app directory
│   ├── contact/           # Contact page
│   ├── blog/              # Blog listing page
│   ├── projects/          # Projects pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── providers/         # Context providers
│   ├── AboutSection.tsx   # About with 3D laptop
│   ├── Hero.tsx           # Hero section
│   ├── Navigation.tsx     # Navigation component
│   └── ...                # Other sections
├── public/               # Static assets
├── tailwind.config.ts    # Tailwind configuration
└── package.json          # Dependencies
```

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/amirunoel/amiru-portfolio.git
   cd amiru-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your environment variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - EMAILJS_PUBLIC_KEY
   - EMAILJS_SERVICE_ID
   - EMAILJS_TEMPLATE_ID

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📸 Adding Your Assets

1. **Profile Picture**: Replace `/public/profile.png` with your photo
2. **Favicon**: Replace `/public/favicon.ico` with your star logo
3. **Resume**: Place your resume at `/public/Amiru_Mallawa_Arachchi_Resume.pdf`
4. **Project Images**: Add project images to `/public/projects/`
5. **Blog Images**: Add blog post images to `/public/blog/`

## 🚀 Deployment

### Deploying to Vercel

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Connect your GitHub repository
   - Add environment variables in Vercel dashboard
   - Deploy!

### Supabase Setup

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Configure environment variables**
   - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to your environment

## 📧 Email Setup with EmailJS

1. **Create an EmailJS account**
   - Sign up at [emailjs.com](https://www.emailjs.com)
   - Create an email service
   - Create an email template

2. **Configure in code**
   - Update `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, and `EMAILJS_TEMPLATE_ID` in `.env.local`
   - The template should have fields: `from_name`, `from_email`, `message`, `to_email`

## ✨ Customization Tips

### Modifying Colors
Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme:
- Change `--background` and `--foreground` CSS variables
- Update gradient classes for different effects

### 3D Laptop Animation
The 3D laptop is in `components/AboutSection.tsx`. You can:
- Modify the laptop geometry
- Change the rotation and animation
- Add different 3D models

### Cursor Effects
Update `components/providers/CursorProvider.tsx` to customize:
- Cursor size and appearance
- Hover effects
- Animation timing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🙏 Acknowledgments

- Framer Motion for smooth animations
- Three.js for 3D graphics
- Tailwind CSS for styling
- Vercel for hosting
- Supabase for database services

---

Made with ❤️ by [Amiru Mallawa Arachchi](https://amirunoel.dev)