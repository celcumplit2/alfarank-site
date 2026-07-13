import {
  clean,
  currentSalesUser,
  expiredSessionCookie,
  jsonResponse,
  publicUsers,
  salesUsers,
  sessionCookieFor,
  type SalesEnv
} from "./_shared";

type LoginPayload = {
  username?: unknown;
  pin?: unknown;
};

async function parsePayload(request: Request): Promise<LoginPayload> {
  try {
    return (await request.json()) as LoginPayload;
  } catch {
    return {};
  }
}

export const onRequestGet: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const user = await currentSalesUser(request, env);

  return jsonResponse({
    authenticated: Boolean(user),
    user,
    users: publicUsers(env)
  });
};

export const onRequestPost: PagesFunction<SalesEnv> = async ({ request, env }) => {
  const payload = await parsePayload(request);
  const username = clean(payload.username, 80).toLowerCase();
  const pin = clean(payload.pin, 80);
  const user = salesUsers(env).find((entry) => entry.username === username && entry.pin === pin);

  if (!user) {
    return jsonResponse({ error: "Неверный пользователь или пароль." }, 401);
  }

  const { pin: _pin, ...publicUser } = user;
  return jsonResponse(
    {
      authenticated: true,
      user: publicUser,
      users: publicUsers(env)
    },
    200,
    {
      "set-cookie": await sessionCookieFor(publicUser, env, request.url)
    }
  );
};

export const onRequestDelete: PagesFunction<SalesEnv> = async ({ request }) =>
  jsonResponse(
    {
      authenticated: false,
      user: null
    },
    200,
    {
      "set-cookie": expiredSessionCookie(request.url)
    }
  );
