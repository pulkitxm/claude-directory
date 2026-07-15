# templates/ — agent notes

## Layout

- First-party template experiments live directly under `templates/<project>/`.
- Same-to-same clones of real third-party templates are grouped by provider under
  `templates/premium/<provider>/<project>/` (e.g. `templates/premium/aceternity/sidefolio-portfolio-template/`,
  `templates/premium/nextjstemplates/finorio-saas-landing/`).

## Counting rule

**Premium templates count toward the total.** Every leaf project — including everything nested
under `templates/premium/<provider>/` — is one template. The headline count in
`templates/README.md` and the templates table in the root `README.md` must equal the number of
leaf projects on disk:

```
find templates -name prompt.md -not -path "*/.reference/*" | wc -l
```

When you add or move a premium template, update that headline count and both README tables so they
still match this number. Do not exclude `premium/` from the count.
