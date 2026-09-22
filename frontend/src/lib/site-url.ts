import { headers } from 'next/headers';
export async function siteUrl(path: string) {
  const configured = process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL;
  if (configured) return new URL(path, configured).toString();
  const requestHeaders = await headers();
  const host = requestHeaders.get('host') || 'localhost:3000';
  const protocol = requestHeaders.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  return new URL(path, `${protocol}://${host}`).toString();
}
