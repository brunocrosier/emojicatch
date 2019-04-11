import React from 'react'
import { Picker } from "emoji-mart"

const EmojiPicker = (props) => {
    return (
        <Picker
            set="apple"
            title="EmojiCatch.com"
            emoji="mag"
            sheetSize={32}
            onClick={e => props.onPickerSelect(e)}
            exclude="recent"
          />
    )
}

export default EmojiPicker