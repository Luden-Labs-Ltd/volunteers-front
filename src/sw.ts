/// <reference lib="webworker" />

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare const self: ServiceWorkerGlobalScope;

// Управление версией кеша
clientsClaim();

// Предкэширование ресурсов
precacheAndRoute(self.__WB_MANIFEST);

// Обработка навигации
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL('/index.html'),
);

// Кеширование изображений
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  }),
);

// Кеширование API запросов
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 10,
  }),
);

// Кеширование статических ресурсов
registerRoute(
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  }),
);

// Обработка push-уведомлений
self.addEventListener('push', (event: PushEvent) => {
  if (!event.data) {
    return;
  }

  let notificationData: {
    title: string;
    body: string;
    icon?: string;
    badge?: string;
    data?: Record<string, any>;
    tag?: string;
  };

  try {
    notificationData = event.data.json();
  } catch (error) {
    console.error('Failed to parse push notification data:', error);
    return;
  }

  const options: NotificationOptions = {
    body: notificationData.body,
    icon: notificationData.icon || '/pwa-192x192.png',
    badge: notificationData.badge || '/pwa-192x192.png',
    data: notificationData.data || {},
    tag: notificationData.tag,
    requireInteraction: false,
    vibrate: [200, 100, 200],
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options),
  );
});

// Обработка кликов по уведомлениям
self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  const notificationData = event.notification.data;
  const urlToOpen = notificationData?.taskId
    ? `/tasks/${notificationData.taskId}`
    : '/tasks';

  event.waitUntil(
    self.clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((clientList) => {
        // Если окно уже открыто, фокусируемся на нем
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // Иначе открываем новое окно
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      }),
  );
});
