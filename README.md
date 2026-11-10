# expo-notifications + jest-expo: `handleSubscription.remove is not a function`

Minimal reproduction: calling `Notifications.setNotificationHandler()` under
`jest-expo` throws on SDK 58.

| Package | Version |
| --- | --- |
| `expo` | 58.0.23 |
| `expo-notifications` | 58.1.8 |
| `jest-expo` | 58.0.14 |
| `react-native` | 0.88.1 |

## Reproduce

```sh
pnpm install
pnpm test
```

Expected: both tests pass. Actual:

```
TypeError: handleSubscription.remove is not a function
  at Object.remove (node_modules/expo-notifications/build/NotificationsHandler.ts:94:24)
  at setNotificationHandler (notifications.ts:7:17)
```

(npm/yarn also work; this repo was created with pnpm.)

## Cause

- `expo-notifications/build/NotificationsHandler.js` (changed in 58.0.0,
  expo/expo#49072) now runs `subscribe(defaultNotificationHandler)` on import
  (lines 99-101), so `handleSubscription` is set before app code runs.
- Any later `setNotificationHandler()` call executes `handleSubscription.remove()`
  (lines 63-66).
- Under `jest-expo`, `ExpoNotificationsHandlerModule` has no
  `expo-notifications/mocks/ExpoNotificationsHandlerModule`, so it falls back to
  the descriptor in `jest-expo/src/preset/moduleMocks/expoModules.js` (~line 1497),
  whose `addListener` returns an empty object with no `remove()`.

## Workaround

`pnpm run test:workaround` runs the same tests with
`workaround/jest.setup.js`, which mocks
`expo-notifications/build/NotificationsHandlerModule.native` so `addListener`
returns `{ remove() {} }`. Both tests pass.

## Suggested fix

Add `expo-notifications/mocks/ExpoNotificationsHandlerModule.js` (the path
`jest-expo`'s `setup.js` already looks up) returning a subscription from
`addListener`, or make `jest-expo`'s generated `addListener` stubs return
`{ remove() {} }`.
