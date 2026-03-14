import { headers } from 'next/headers';

export async function checkAdminAuth() {
  const headersList = await headers();
  const password = headersList.get('x-admin-password');
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password !== adminPassword) {
    return false;
  }
  return true;
}
