import * as Notifications from 'expo-notifications'
import { setupNotifications } from '../notifications'

it('can call setNotificationHandler under jest-expo', () => {
  expect(() => setupNotifications()).not.toThrow()
})

it('can call setNotificationHandler(null) after the default handler', () => {
  expect(() => Notifications.setNotificationHandler(null)).not.toThrow()
})
