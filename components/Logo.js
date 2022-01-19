import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue, Icon } from "@chakra-ui/react";
import { GiHighGrass } from "react-icons/gi";

import styled from "@emotion/styled";

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;
`;

const Logo = () => {
  const footPrintImg = `/images/footprint${useColorModeValue("", "-dark").png}`;
  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Icon as={GiHighGrass} height="20px" width="20px" />
          <Text
            color={useColorModeValue("grey.800", "whiteAlpha.900")}
            fontFamily="'Zen Antique'"
            fontWeight="thin"
            letterSpacing={5}
            ml={3}
          >
            grass
          </Text>
        </LogoBox>
      </a>
    </Link>
  );
};

export default Logo;
