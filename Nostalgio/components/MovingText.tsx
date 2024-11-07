import {useEffect} from 'react'
import Animated,  {
    StyleProps,
    useAnimatedStyle,
    useSharedValue,
    Easing,
    withDelay,
    withRepeat,
    withTiming,
    cancelAnimation
} from 'react-native-reanimated'

export type MovingTextProps = {
    text: string
    animationThreshold: number
    style?: StyleProps
}

export const MovingText = ({text, animationThreshold, style} : MovingTextProps) => {
    const translateX = useSharedValue(0);
    const shouldAnimate = text.length >= animationThreshold
    
    const textWidth = text.length * 3;

    useEffect(() => {
        if(!shouldAnimate) return
        translateX.value = withDelay(
            2000, 
            withRepeat(
                withTiming(-textWidth, {
                    duration: 6000, 
                    easing: Easing.linear,
                }),
                -1, 
                true,
            ),
        )

        return () => {
            cancelAnimation(translateX)
            translateX.value = 0
        }

    }, [translateX, text, animationThreshold, shouldAnimate, textWidth])
    const animatedStyle = useAnimatedStyle(() => {
        return{
            transform: [{ translateX: translateX.value}]
        }
    })

    return <Animated.Text numberOfLines={1} style={[
        style,
        animatedStyle,
        shouldAnimate && {
            width: 9999,
        }
    ]}>{text}</Animated.Text>
}
