import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window');

export interface ImageCardProps {
    image: string
}

const ImageCard = ({image}: ImageCardProps) => {
    return (
          
        <Image
         source={ { uri: image}}
         resizeMode='cover'
         style={{
          height: 300,
          width:  width *0.8,
         }}
        />
    )
}

export default ImageCard

const styles = StyleSheet.create({})