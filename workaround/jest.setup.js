// Workaround: give the auto-mocked native module's addListener a real subscription.
jest.mock('expo-notifications/build/NotificationsHandlerModule.native', () => ({
  __esModule: true,
  default: {
    addListener: () => ({ remove: () => undefined }),
    handleNotificationAsync: () => Promise.resolve(),
    removeListeners: () => undefined,
  },
}))
