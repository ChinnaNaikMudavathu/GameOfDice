import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { backgroundColor: 'rgb(129,118,201)', flex: 1, justifyContent: 'center', alignItems: 'center' },
    contentContainer: {width: 300, height: 300, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center'},
    inputStyle: { height: 45, borderRadius: 16, borderWidth: 0.5, marginBottom: 8},
    buttonContainer: { height: 45, borderWidth: 0.5, backgroundColor: 'green', borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    buttonText: { fontSize: 20, color: "#fff", paddingHorizontal: 16 , textAlign: 'center' },
})