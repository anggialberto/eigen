import { StepWithImage } from "app/Components/StepWithImage/StepWithImage"
import { Box, ImageIcon, Join, Payment2Icon, Spacer, Tag2Icon, Text } from "palette"

const STEPS = [
  {
    icon: ImageIcon,
    title: "Upload photos",
    text: "Submit images of an artwork in your collection, along with relevant details.",
  },
  {
    icon: Tag2Icon,
    title: "Get a sales option",
    text: "If your artwork is accepted, our specialists will give you a price estimate and the best sales option.",
  },
  {
    icon: Payment2Icon,
    title: "Sell your artwork",
    text: "We’ll find the best buyer for your work and arrange shipping and secure payment.",
  },
]

export const HowItWorks: React.FC = () => {
  return (
    <Box px={2}>
      <Text variant="lg-display">How it works</Text>

      <Spacer mb={2} />
      <Join separator={<Spacer mb={2} />}>
        {STEPS.map((step, index) => (
          <StepWithImage key={index} {...step} />
        ))}
      </Join>
    </Box>
  )
}
