import React from "react"
import { Picker } from "emoji-mart"
import styled, { keyframes } from "styled-components"

const theAnim = keyframes`
0% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`

const StyledEmojiPicker = styled.div`
  animation: ${theAnim} 0.2s linear;
`
const EmojiPicker = props => {
  return (
    <StyledEmojiPicker>
      <Picker
        set="apple"
        title="EmojiCatch.com"
        emoji="mag"
        sheetSize={32}
        onClick={e => props.onPickerSelect(e)}
        exclude={["recent"]}
      />
    </StyledEmojiPicker>
  )
}

export default EmojiPicker
