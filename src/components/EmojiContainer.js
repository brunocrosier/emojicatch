import posed from "react-pose"
import styled from 'styled-components'

const UnstyledEmojiContainer = posed.div({
  visible: {
    y: 0,
    opacity: 1,
    delay: 0,
    transition: {
      y: { type: "spring", stiffness: 1000, damping: 15 },
      default: { duration: 100 }
    },
    applyAtStart: { display: "block" }
  },
  hidden: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 },
    applyAtEnd: { display: "none" }
  }
})

const EmojiContainer = styled(UnstyledEmojiContainer)`
  position: absolute;
  width: 338px;
  right: 0px;
  padding-top: 1rem;
`

export default EmojiContainer
