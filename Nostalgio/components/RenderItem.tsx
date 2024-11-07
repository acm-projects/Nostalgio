import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { MarkerWithMetadata } from '@/data/recommended';

type Props = {
    item: MarkerWithMetadata;
    index: number;
};

const RenderItem = ({item, index}: Props) => {
    return (
        <View>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    );
};

export default RenderItem;

const styles = StyleSheet.create({
    title:{
        fontWeight: "bold",
        fontFamily: "Unbounded_400Regular",
        fontSize: 16,
        color: 'white',
        paddingVertical: 2,
      },
})
