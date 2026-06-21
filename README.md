Initial commit

```
blog
├─ .prettierrc.json
├─ AGENTS.md
├─ blog
├─ CLAUDE.md
├─ components.json
├─ containers
│  └─ docker-compose.yml
├─ drizzle.config.js
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ images
│  │  ├─ bryen_0.png
│  │  ├─ bryen_1.png
│  │  ├─ bryen_2.png
│  │  ├─ bryen_3.png
│  │  ├─ bryen_4.png
│  │  ├─ bryen_5.png
│  │  ├─ bryen_6.png
│  │  ├─ bryen_7.png
│  │  ├─ bryen_8.png
│  │  └─ bryen_9.png
│  ├─ next.svg
│  ├─ screenshot-desktop.png
│  ├─ screenshot-mobile.png
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ ROTAS.md
├─ src
│  ├─ actions
│  │  ├─ auth
│  │  │  └─ user
│  │  │     └─ create-user-action.ts
│  │  ├─ cache
│  │  │  └─ revalidate-exemple.ts
│  │  ├─ images
│  │  │  └─ upload-image-action.ts
│  │  └─ post
│  │     ├─ create-post-action.ts
│  │     ├─ delete-post-action.ts
│  │     └─ update-post-action.ts
│  ├─ app
│  │  ├─ (auth)
│  │  │  ├─ forgot-password
│  │  │  │  └─ page.tsx
│  │  │  ├─ login
│  │  │  │  └─ page.tsx
│  │  │  ├─ register
│  │  │  │  └─ page.tsx
│  │  │  └─ reset-password
│  │  │     └─ page.tsx
│  │  ├─ admin
│  │  │  ├─ layout.tsx
│  │  │  └─ post
│  │  │     ├─ new
│  │  │     │  └─ page.tsx
│  │  │     ├─ page.tsx
│  │  │     └─ [id]
│  │  │        └─ page.tsx
│  │  ├─ error.tsx
│  │  ├─ exemplo
│  │  │  └─ [id]
│  │  │     └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ not-found.tsx
│  │  ├─ page.tsx
│  │  └─ post
│  │     └─ [slug]
│  │        └─ page.tsx
│  ├─ application
│  │  ├─ DTOs
│  │  │  ├─ post
│  │  │  │  └─ dtos.ts
│  │  │  └─ user
│  │  │     └─ dtos.ts
│  │  └─ UseCase
│  │     └─ user
│  │        └─ create-user.use-case.ts
│  ├─ components
│  │  ├─ Admin
│  │  │  ├─ deletePostButton
│  │  │  │  └─ index.tsx
│  │  │  ├─ imageManager
│  │  │  │  └─ index.tsx
│  │  │  ├─ managePostForm
│  │  │  │  ├─ defaultDiv.tsx
│  │  │  │  └─ index.tsx
│  │  │  ├─ menuAdmin
│  │  │  │  └─ index.tsx
│  │  │  └─ postListAdmin
│  │  │     └─ index.tsx
│  │  ├─ Auth
│  │  │  ├─ authHeading
│  │  │  │  └─ index.tsx
│  │  │  ├─ passwordStrength
│  │  │  │  └─ index.tsx
│  │  │  ├─ registeForm
│  │  │  │  └─ index.tsx
│  │  │  └─ socialButton
│  │  │     └─ index.tsx
│  │  ├─ Container
│  │  │  └─ index.tsx
│  │  ├─ DefaultButton
│  │  │  └─ index.tsx
│  │  ├─ Dialog
│  │  │  └─ index.tsx
│  │  ├─ ErrorMessage
│  │  │  └─ index.tsx
│  │  ├─ Footer
│  │  │  └─ inde.tsx
│  │  ├─ Header
│  │  │  └─ index.tsx
│  │  ├─ ImageDefault
│  │  ├─ InputCheckbox
│  │  │  └─ index.tsx
│  │  ├─ InputText
│  │  │  └─ index.tsx
│  │  ├─ LinkWrapper
│  │  │  └─ index.tsx
│  │  ├─ MarkdownEditor
│  │  │  └─ index.tsx
│  │  ├─ PostCoverImage
│  │  │  └─ index.tsx
│  │  ├─ PostDate
│  │  │  └─ index.tsx
│  │  ├─ PostFeatured
│  │  │  └─ index.tsx
│  │  ├─ PostHeading
│  │  │  └─ index.tsx
│  │  ├─ PostLists
│  │  │  └─ index.tsx
│  │  ├─ PostSummary
│  │  │  └─ index.tsx
│  │  ├─ SafeMarkdown
│  │  │  └─ index.tsx
│  │  ├─ SinglePost
│  │  │  └─ index.tsx
│  │  ├─ SpinLoader
│  │  │  └─ index.tsx
│  │  └─ ui
│  │     ├─ navigation-menu.tsx
│  │     └─ sonner.tsx
│  ├─ domain
│  │  ├─ entities
│  │  │  ├─ posts
│  │  │  │  └─ post-model.ts
│  │  │  └─ user
│  │  │     ├─ user.entity.ts
│  │  │     └─ user.factory.ts
│  │  └─ repositories
│  │     ├─ post-repository.interface.ts
│  │     └─ user-repository.interface.ts
│  ├─ DTOs
│  │  └─ user
│  │     └─ dtos.ts
│  ├─ infrastructure
│  │  └─ db
│  │     ├─ drizzle
│  │     │  ├─ index.ts
│  │     │  ├─ migrations
│  │     │  │  ├─ 0000_mature_madame_web.sql
│  │     │  │  └─ meta
│  │     │  │     ├─ 0000_snapshot.json
│  │     │  │     └─ _journal.json
│  │     │  ├─ schemas.ts
│  │     │  └─ seed.ts
│  │     ├─ mappers
│  │     │  └─ user.mapper.ts
│  │     ├─ repositories
│  │     │  ├─ post
│  │     │  │  ├─ drizzle
│  │     │  │  │  └─ drizzle-post-repository.ts
│  │     │  │  ├─ index.ts
│  │     │  │  └─ json-post-repository.ts
│  │     │  └─ user
│  │     │     ├─ drizzle-user-repository.ts
│  │     │     └─ index.ts
│  │     └─ seed
│  │        └─ posts.json
│  ├─ interfaces
│  │  └─ image-storage.interface.ts
│  ├─ lib
│  │  ├─ auth
│  │  │  └─ auth-manual.ts
│  │  ├─ cache
│  │  │  ├─ Consts
│  │  │  │  └─ cache-tag.ts
│  │  │  └─ utils
│  │  │     ├─ cache-revalidates.ts
│  │  │     └─ cahce-tag-builder.ts
│  │  ├─ data
│  │  │  ├─ external
│  │  │  │  └─ Supabase
│  │  │  │     ├─ admin.ts
│  │  │  │     └─ client.ts
│  │  │  └─ sql
│  │  │     ├─ post
│  │  │     │  └─ queries
│  │  │     │     ├─ admin.ts
│  │  │     │     └─ public.ts
│  │  │     └─ user
│  │  │        └─ user-queries.ts
│  │  ├─ utils.ts
│  │  └─ validates
│  │     ├─ post-validations.ts
│  │     └─ user-validations.ts
│  ├─ types
│  │  ├─ action-result.ts
│  │  └─ upload-result.ts
│  └─ util
│     ├─ async-delay.ts
│     ├─ format-datetime.ts
│     ├─ get-zod-error-messages.ts
│     ├─ http-context.ts
│     ├─ is-url-or-relative-path.ts
│     ├─ log-color.ts
│     ├─ make-random-strings.ts
│     ├─ make-slug-from-text.ts
│     └─ validate-image.ts
└─ tsconfig.json

```
