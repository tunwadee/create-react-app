import { Box, Stack, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

export const Stat = (props) => {
  const { title, value, color, ...rest } = props
  return (
    <Stack direction="column-reverse" maxW="24rem" mx="auto" as="dl" textAlign="center" {...rest}>
      <Box as="dt" color={useColorModeValue('gray.600', 'whiteAlpha.700')} fontWeight="medium">
        <b>{title}</b>
      </Box>
      {value}
      {value == "ยอดบริจาคครบแล้ว" ?
        <Box as="dd" fontSize="45px" fontWeight="extrabold" color={'teal'} >
          {value}
        </Box>
        :
        <Box as="dd" fontSize="5xl" fontWeight="extrabold" color={color} >
          {value}
        </Box>
      }
    </Stack>
  )
}