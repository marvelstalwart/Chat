import { createSlice } from "@reduxjs/toolkit"

const initialState = ({
    eyes:"",
    eyebrows:"",
    mouth:"",
    hair:"",
    facialHair:"",
    clothing:"",
    accessory:"",
    graphic:"",
    hat:"",
    body:"",
    hairColor:"",
    clothingColor:"",
    circleColor:"",
    lipColor:"",
    hatColor:"",
    faceMaskColor:"",
    mask:"",
    faceMask:"",
    lashes:""

})

export const avatarSlice = createSlice({
    name: "avatar",
    initialState,
    reducers: {
        setAvatarProps: (state, action)=> {
            state.eyes= action.payload.body
            state.eyebrows= action.payload.eyebrows
            state.mouth = action.payload.mouth
            state.hair = action.payload.hair
            state.facialHair = action.payload.facialHair
            state.clothing = action.payload.clothing
            state.accessory = action.payload.accessory
            state.graphic = action.payload.graphic
            state.hat = action.payload.hat
            state.body = action.payload.body
            state.hairColor = action.payload.hairColor
            state.clothingColor = action.payload.clothingColor
            state.circleColor = action.payload.circleColor
            state.lipColor = action.payload.lipColor
            state.hatColor = action.payload.hatColor
            state.faceMaskColor = action.payload.faceMaskColor
            state.mask = action.payload.mask
            state.faceMask = action.payload.faceMask
            state.lashes = action.payload.lashes
        }

    }
})
export const {setAvatarProps} = avatarSlice.actions
export default avatarSlice.reducer