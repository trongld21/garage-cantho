/** Generate URL slugs from Vietnamese names while preserving manually edited URLs. */
export function slugify(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '').slice(0, 255).replace(/-+$/g, '');
}

export function slugForName(name: string, previousName = '', previousSlug = '', id?: number): string {
  return !id && (!previousSlug || previousSlug === slugify(previousName)) ? slugify(name) : previousSlug;
}
