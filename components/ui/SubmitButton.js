import { Pressable, StyleSheet, Text } from 'react-native'
import { Colors } from '../../constants/colors'

const SubmitButton = ({ onPress, children }) => {
    return <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

export default SubmitButton

const styles = StyleSheet.create({
    btn: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
        backgroundColor: Colors.primary800,
        elevation: 2,
        shadowOpacity: 0.15,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        borderRadius: 4,
    },
    pressed: {
        opacity: 0.7,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        color: Colors.primary50,
    },
})