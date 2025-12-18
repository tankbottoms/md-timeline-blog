import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith("/custom")) {
        return new Response("custom response");
    }

    console.log(
        event.url.origin,
        event.url.pathname,
        event.request.headers.get("remote-address"),
        event.request.headers.get("CF-Connecting-IP"),
        event.request.headers.get("True-Client-IP"),
        event.request.headers.get("X-Forwarded-For"),
        event.request.headers.get("X-Real-IP"),
    );

    const response = await resolve(event);
    return response;
};
