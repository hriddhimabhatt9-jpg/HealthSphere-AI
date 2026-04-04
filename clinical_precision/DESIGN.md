# Design System Documentation: Clinical Precision & Fluid Intelligence

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Clinical Sanctuary."** 

We are moving away from the cluttered, utilitarian aesthetic of traditional healthcare software. Instead, we are building a space that feels as calm as a high-end clinic and as intelligent as a modern laboratory. This system prioritizes **Atmospheric Clarity**—using light, breath, and depth to guide the clinician’s eye. 

We break the "template" look by rejecting rigid grid lines in favor of **intentional asymmetry** and **tonal layering**. Elements don't just sit on a page; they inhabit a three-dimensional space where data is elevated and administrative noise is receded.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in medical authority but executed with editorial sophistication.

### The Palette
- **Primary (Authority):** `primary` (#003d9b) and `primary_container` (#0052cc). This is our pulse. Use it for high-intent actions and meaningful brand moments.
- **Secondary (Vitality):** `secondary` (#006e28) and `secondary_container` (#6ffb85). Used to denote health, recovery, and success.
- **Neutral (Atmosphere):** A sophisticated range of whites and cool grays (`surface` to `surface_container_highest`).

### The "No-Line" Rule
**Explicit Instruction:** Sectioning via 1px solid borders is prohibited. In this system, boundaries are defined by **Background Shifts**. To separate a sidebar from a main content area, transition from `surface_container_low` to `surface`. This creates a seamless, modern interface that feels "built" rather than "drawn."

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:
1.  **Base Layer:** `background` (#f8f9fb)
2.  **Structural Sections:** `surface_container_low` (#f3f4f6)
3.  **Interactive Cards:** `surface_container_lowest` (#ffffff)
4.  **Floating Modals/Popovers:** `surface_bright` with Glassmorphism.

### The "Glass & Gradient" Rule
To evoke "Fluid Intelligence," use semi-transparent `surface_container_lowest` (80% opacity) with a `24px` backdrop blur for floating navigation or hovering analytics cards. For primary CTAs, apply a subtle linear gradient from `primary` to `primary_container` at 135 degrees to add "soul" and depth.

---

## 3. Typography
We use a dual-font strategy to balance high-end editorial feel with clinical legibility.

- **Display & Headlines (Manrope):** Chosen for its modern, geometric structure. Use `display-lg` through `headline-sm` to create authoritative entry points for pages. The wider apertures of Manrope feel welcoming yet precise.
- **Body & Labels (Inter):** The industry standard for legibility. Used for all data-dense areas, `body-md`, and `label-sm`. Inter’s tall x-height ensures that even complex medical terminology is easily scannable.

**Hierarchy Strategy:** Always pair a `headline-md` (Manrope) with a `body-md` (Inter) at 60% opacity (`on_surface_variant`). This contrast in weight and color creates a clear narrative path for the user.

---

## 4. Elevation & Depth
We eschew "flat design" for **Tonal Layering**.

- **The Layering Principle:** Depth is achieved by "stacking." A card (`surface_container_lowest`) should sit on a section (`surface_container_low`). The eye perceives the lighter color as being closer, creating a natural lift.
- **Ambient Shadows:** Shadows must be felt, not seen. Use a 32px blur with 4% opacity, using a tint of `on_surface` (#191c1e). This mimics natural clinical lighting.
- **The "Ghost Border" Fallback:** If a container requires more definition (e.g., in high-density data tables), use a "Ghost Border": the `outline_variant` token at **15% opacity**.
- **Glassmorphism:** Use for elements that exist "above" the workflow, such as temporary notifications or floating action buttons. This keeps the user grounded in their current context.

---

## 5. Components

### Dashboard Cards
- **Style:** Forbid divider lines. Separate header from body using `24px` of vertical whitespace. 
- **Corner Radius:** Use `lg` (1rem) for main dashboard cards to feel approachable.
- **Nesting:** Inner data points should sit on a `surface_container_high` background with a `sm` (0.25rem) radius.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), white text, `md` corner radius.
- **Secondary:** `surface_container_high` background with `on_surface` text. No border.
- **Tertiary:** No background. Underline only on hover to maintain a clean "Apple-esque" aesthetic.

### Analytics & Charts
- **Visuals:** Use `primary` for main data strands and `secondary_fixed_dim` (#53e16f) for comparative data.
- **Interaction:** Hover states on charts should trigger a Glassmorphic tooltip that blurs the data behind it.

### Sidebar Navigation
- **Surface:** Use `surface_container_low`.
- **Active State:** Instead of a box, use a vertical "pill" indicator in `primary` (4px wide) on the left of the nav item, with the text shifting to `on_surface`.

### Medical Status Badges
- **Style:** Small, pill-shaped (`full` roundedness). 
- **Color:** Use `secondary_container` for "Stable" and `error_container` for "Critical." The text should always be the "on-container" variant for AAA accessibility.

---

## 6. Do’s and Don’ts

### Do
- **Do** use generous whitespace (32px+) between major dashboard modules.
- **Do** use `Manrope` for numbers in analytics—its geometric nature makes data feel like a premium asset.
- **Do** use Tonal Layering to guide the user's focus during complex medical intake forms.

### Don’t
- **Don't** use 100% black text. Always use `on_surface` (#191c1e) to reduce eye strain for clinicians.
- **Don't** use "Drop Shadows" that look like fuzzy grey halos. Keep them wide, thin, and tinted.
- **Don't** use solid dividers to separate list items. Use a `8px` gap and a subtle background hover state change.
- **Don't** crowd the interface. If a screen feels busy, increase the whitespace before you decrease the font size.