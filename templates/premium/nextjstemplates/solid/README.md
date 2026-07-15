# Solid Multi-Page SaaS Website Template

[![Watch Demo](./poster.jpg)](./demo.mp4)

Solid is a faithful reproduction of the Next.js Templates Solid SaaS boilerplate, rebuilt as self-contained HTML, CSS, and JavaScript with no build step. The template spans eight fully linked pages: home, blog listing, blog detail, docs, sign-in, sign-up, support, and 404. It includes animated background lines, a sticky responsive header, persistent light and dark themes, a dashboard hero, brand logos, features, pricing, testimonials, contact forms, and documentation.

## Run

No build step is needed. Open any page directly in a browser, or serve with a static file server for correct relative links:

```sh
open index.html

python3 -m http.server 8080
```

## Pages

| File | Page |
|---|---|
| `index.html` | Home with hero, features, pricing, testimonials, and footer |
| `blog.html` | Blog listing with a six-card grid |
| `blog-details.html` | Blog article with search/categories sidebar |
| `docs.html` | Documentation with sidebar navigation |
| `auth-signin.html` | Sign-in form |
| `auth-signup.html` | Sign-up / registration form |
| `support.html` | Contact / support form with location card |
| `error.html` | 404 error page |

## Notable techniques

- **No-flash dark mode** applies the saved theme before first paint.
- **Scroll reveal** introduces page sections as they enter the viewport.
- **Testimonials carousel** uses [Swiper.js v11](https://swiperjs.com/).
- **Animated background lines** add subtle movement without blocking interaction.
- **Local assets** keep fonts and images available from the project directory.

`prompt.md` holds the full build spec and design token reference; `demo.mp4` shows the template in motion.

## Credits

Faithful clone of an existing design, recreated for study/learning. All credit for the original design goes to its creators.

**Original:** Next.js Templates Solid: <https://solid.demo.nextjstemplates.com/>
