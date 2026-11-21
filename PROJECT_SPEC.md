# FOOTBALL CLUB OFFICIAL WEBSITE — PROJECT SPECIFICATION

## 1. Project Overview
Build a premium, modern official website for a Japanese youth football club operating multiple age categories and football schools.

The website must feel like an established professional football club website, with editorial sports photography, refined typography, sophisticated motion design, and clear navigation.

## 2. Design Concept
MODERN FOOTBALL × PREMIUM ACADEMY

- Clean white canvas and spacious layouts.
- Deep navy, royal blue, and muted gold brand identity.
- Large editorial typography and bold section numbering.
- Cinematic football photography.
- Asymmetric grids and overlapping content blocks.
- Subtle, polished motion design.
- Professional, trustworthy, energetic, and premium atmosphere.

## 3. Color System
- Main background: #FFFFFF
- Secondary background: #F8FAFC
- Brand dark: #00236a
- Brand primary: #0054a7
- Accent gold: #bbab54
- Main text: #1E293B
- Secondary text: #64748B

Use CSS variables or design tokens. Do not introduce unrelated brand colors. Ensure accessible contrast, especially for small text and buttons.

## 4. Recommended Technology
- JavaScript
- HTML
- CSS

Use the versions and configuration already present in the repository where possible. Do not replace existing project configuration without a reason.

## 5. Global Layout
- Responsive header with logo, navigation, and prominent JOIN US CTA.
- Desktop mega menu or dropdown navigation.
- Mobile hamburger navigation with accessible keyboard controls.
- Breadcrumbs on subpages.
- Consistent footer with club information, navigation, social links, and sponsors.
- Persistent but unobtrusive inquiry/tryout CTA.

## 6. Homepage Sections
1. Full-width cinematic hero with football imagery, headline, and CTA.
2. Next Match with home/away team, date, venue, and status.
3. Latest News with editorial cards.
4. Club Philosophy with large typography and image composition.
5. Our Teams with dynamically generated age-category cards.
6. Match Results and competition information.
7. Academy and Football School introduction.
8. Join Us recruitment CTA.
9. Partners and sponsors logo grid.
10. Instagram/YouTube social section.
11. Comprehensive footer.

## 7. Required Pages
- Home
- About / Club Philosophy / History / Facilities
- Teams / U-8 / U-10 / U-12 / U-15 / U-18 / Staff
- Matches / Fixtures / Results / Standings
- News / News Detail
- Academy / Development Policy / Coaches / Career Paths
- School / Classes / Locations / Fees / Trial Application
- Join Us / Recruitment / Selection / FAQ
- Community / Events
- Partners / Sponsorship
- Contact

Categories and schools must be data-driven. Never hardcode age categories into layout components.

## 8. Motion Design
- Hero: subtle image zoom, staggered headline reveal, and CTA fade-in.
- Scroll reveal: fade-up with slight vertical movement.
- Section transitions: subtle parallax where performance allows.
- Cards: image scale on hover, text transition, and subtle elevation.
- Navigation: smooth dropdown and underline transitions.
- Buttons: color transition and restrained directional movement.
- Number labels: animated entrance.
- Page transitions: subtle fade where supported.

Use reduced-motion preferences. Avoid excessive animation, scroll hijacking, and layout shifts. Keep all content accessible without animation.

## 9. Reusable Components
- SiteHeader
- MobileNavigation
- SiteFooter
- HeroSection
- SectionHeading
- PrimaryButton
- SecondaryButton
- NewsCard
- MatchCard
- TeamCard
- CategoryGrid
- StaffCard
- SponsorGrid
- RecruitmentBanner
- SchoolCard
- Breadcrumbs
- AnimatedSection

## 10. Content and Data
Create typed mock data for categories, players, staff, matches, news, schools, facilities, and sponsors. Separate data from UI components. Use realistic Japanese-language sample content, but clearly treat all team names, scores, schedules, and achievements as fictional placeholders.

## 11. Responsive Requirements
- Mobile-first implementation.
- Support 360px mobile screens and larger.
- Tablet and desktop layouts.
- No horizontal overflow.
- Touch-friendly buttons and menus.
- Responsive typography and image ratios.

## 12. Accessibility and Performance
- Semantic HTML.
- Keyboard navigation and visible focus states.
- Alt text for meaningful images.
- WCAG 2.2 AA contrast target.
- Optimized images using Next.js Image.
- Lazy-load below-the-fold media.
- Avoid unnecessary client components.
- Respect prefers-reduced-motion.
- SEO metadata and Open Graph metadata.

## 13. Implementation Rules
- Use strict JavaScript.
- Prefer reusable components and data-driven rendering.
- Keep components small and maintainable.
- Avoid duplicated markup and magic values.
- Centralize design tokens.
- Use accessible labels and error states for forms.
- Do not create fake working forms or buttons: connect them to appropriate mock behavior and clearly label prototype functionality.
- Do not invent real club facts. Use placeholders for unknown information.

## 14. Development Workflow
1. Inspect the existing repository and package configuration.
2. Report the proposed implementation plan.
3. Build the global design system and typography.
4. Implement the responsive header and footer.
5. Implement the homepage section by section.
6. Implement secondary pages using reusable templates.
7. Add motion design and interaction states.
8. Validate responsive layouts and accessibility.
9. Run lint, type-check, and production build.
10. Fix all errors and summarize completed work.

## 15. Quality Standard
The final result must look like a carefully art-directed professional football club website, not a generic SaaS template or a basic sports landing page. Prioritize strong visual hierarchy, excellent spacing, cinematic imagery, refined transitions, and consistent branding.