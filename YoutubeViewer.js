import React from "react";
import { Button, View, ScrollView, StyleSheet, Text, Image, ImageBackground } from "react-native";
import Constants from 'expo-constants';
import { useState, useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { TextInput } from "react-native";


const YoutubeViewer = (props) => {
    const [playing,setPlaying] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState("tEm9EyEPMYM")

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
          setPlaying(false);
          Alert.alert("video has finished playing!");
        }
      }, []);
    
      const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev);
      }, []);
    
      return (
        <ScrollView>
          <YoutubePlayer
            height={300}
            play={playing}
            videoId={playingVideoId}
            onChangeState={onStateChange}
          />
          <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
          <TextInput
              style={styles.input}
              onChangeText={setPlayingVideoId}
              value={playingVideoId}
      />
        </ScrollView>
      );
    }

    const styles = StyleSheet.create({
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        },
      });
       


export default YoutubeViewer;