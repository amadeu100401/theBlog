```
SSR -> Server Side Rendering
CSR -> Client Side Rendering

STATIC -> SSG <- Tenho o HTML pronto
Dynamic -> Não tenho nada pronto, o servidor faz de forma dinâmica
ISR -> Incremental Static Regeneration - depois de um tempo, o servior atualiza o conteudo estático de forma dinamica
ISR -> Depois que eu atualizar algum conteúdo ela atualiza (faz a revalidação do cache, atualizando o cache do servidor)

/ (Rota pública)
/post/[slug] (Rota públca)

/admin/post (Privado - dynamic) - Ler (r) os posts / (D) Delete
/admin/post/[id] (Privado - dynamic) - Atualizar um post (U)
/admin/post/new (Privado - dynamic) - Criar um post (C)

/admin/login (Pública - Dynamic)
```
