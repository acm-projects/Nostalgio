import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//import { FlatList } from 'react-native-reanimated/lib/typescript/Animated';
import  {ImageSlider} from '@/location/SliderData'
import markers from '@/app/(tabs)/index'
import SliderItem from './SliderITem';

/*export const Slider = () => {
    return(
        <View>
            <FlatList 
            data={ImageSlider} 
            renderItem={({item, index}) => (
                <SliderItem item={item} index={index}/>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            />
        </View>
    )
}*/