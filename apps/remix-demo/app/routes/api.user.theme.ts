import { ActionFunctionArgs, data } from 'react-router';
import { setChakraColorModeCookie } from '../config';

export async function action({ request }: ActionFunctionArgs) {
  const body = (await request.json()) as { theme?: string };
  const newTheme = body['theme'] ?? null;

  if (newTheme === null) {
    const message = `Parameter 'theme' is required`;
    console.error(`[v1.user.theme:action] ${message}`);
    return data({ success: false, message });
  }

  const newCookie = setChakraColorModeCookie(newTheme);
  const headers = new Headers();
  headers.set('Set-Cookie', newCookie);

  console.log('[api/user/theme] new theme:', newTheme, 'newCookie:', newCookie);

  return new Response(JSON.stringify({ success: true }), {
    headers,
  });
}
