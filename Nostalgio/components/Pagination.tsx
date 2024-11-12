import { StyleSheet, Text, View } from "react-native";
import React from 'react';
import Dot from "./Dot";
import { MarkerWithMetadata, markers } from '@/data/recommended';

type Props = {
    paginationIndex: number;
};

const Pagination = ({paginationIndex} : Props) => {
    return (
        <View style={styles.container}>
            {markers.map((_, index) => {
                return <Dot index={index} key={index} paginationIndex={paginationIndex}/>
            })}
        </View>
    )
}

export default Pagination;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '100%',
        zIndex: 3
    }
})