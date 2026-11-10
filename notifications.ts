import * as Notifications from 'expo-notifications'

// Common pattern from the docs: configure the foreground handler.
// Calling this a second time (after the library's own default handler
// subscribed on import) is what throws under jest-expo.
export function setupNotifications(): void {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  })
}
