import React from "react";
import {Image, Text, Button, View, StyleSheet, TouchableOpacity} from 'react-native';

function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/KakaoTalk_20221215_234627020_02.jpg')}
                style={{width:400,height:500}}    
            />
            <TouchableOpacity
                style={styles.buttoneContainer}
                onPress={() => navigation.navigate('Layout')}
            >
                <Text style={styles.buttonTest}>Go To Square Game</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f52314'
    },
    buttoneContainer:{
        backgroundColor:'green',
        borderRadius:20,
        padding:10,
        margin:10

    },
    buttonTest:{
        fontSize:15,
        color:'#fff'

    }
})

export default Home