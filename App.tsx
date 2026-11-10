import { Text, View } from 'react-native'
import { setupNotifications } from './notifications'

setupNotifications()

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>expo-notifications jest repro</Text>
    </View>
  )
}
