// Existing third-party stock photos must not be presented as garage projects.
export function isIllustration(src?: string) {
  return Boolean(src && /(?:images\.)?unsplash\.com|pexels\.com|pixabay\.com/i.test(src));
}
