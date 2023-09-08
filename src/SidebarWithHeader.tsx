import React, { ReactNode, useContext } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { Link as ReachLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";

import { AiFillAppstore } from "react-icons/ai";

import { BiSearchAlt, BiCheckShield, BiShieldX } from "react-icons/bi";
import { FaLaptopCode, FaUserSlash, FaUserCheck} from "react-icons/fa";
import { LuClipboardList } from "react-icons/lu";

import { IconType } from "react-icons";
import { ReactText } from "react";

import { Context } from "./context/context";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  underline : string;
  sub: Array<SubLinkItemProps>;
}
interface SubLinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "หน้าหลัก", icon: AiFillAppstore, href: "/", sub: [] , underline : "true"},
  { name: "ค้นหา", icon: BiSearchAlt, href: "/search", sub: [] , underline : "fasle"},
  {
    name: "คำสั่งห้ามออกนอกประเทศ",
    icon: FaUserSlash,
    href: "",
    underline : "true",
    sub: [
      { name: "รายการคำสั่ง", icon: FiTrendingUp, href: "/injunctions" },
      { name: "สร้างคำสั่ง", icon: FiTrendingUp, href: "/injunction" },
    ],
  },
  {
    name: "เพิกถอนคำสั่งห้ามออกนอกประเทศ",
    icon: FaUserCheck,
    href: "",
    underline : "false",
    sub: [
      { name: "รายการคำสั่ง", icon: FiTrendingUp, href: "/injunction_res" },
      { name: "สร้างคำสั่ง", icon: FiTrendingUp, href: "/injunction_re" },
    ],
  },
  {
    name: "อนุญาตให้ออกนอกประเทศชั่วคราว",
    icon: BiCheckShield,
    href: "",
    underline : "false",
    sub: [
      { name: "รายการคำสั่ง", icon: FiTrendingUp, href: "/temp_injunctions" },
      { name: "สร้างคำสั่ง", icon: FiTrendingUp, href: "/temp_injunction" },
    ],
  },
  {
    name: "เพิกถอนอนุญาตชั่วคราว",
    icon: BiShieldX,
    href: "",
    underline : "false",
    sub: [
      {
        name: "รายการคำสั่ง",
        icon: BiCheckShield,
        href: "/temp_injunction_res",
      },
      { name: "สร้างคำสั่ง", icon: FiTrendingUp, href: "/temp_injunction_re" },
    ],
  },
  { name: "รายงานสถิติ", icon: FiSettings, href: "/stat", sub: [] ,underline : "true"},
  { name: "ตั้งค่าหนังสือ", icon: FiSettings, href: "/setting", sub: [] ,underline : "false" },
  { name: "คู่มือการใช้งาน", icon: FiSettings, href: "/manual", sub: [],underline : "false" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const { state, dispatch } = useContext(Context);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} px="8" py="2">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
    
  };

  const isBorder = (border) => {
    if(border == "true"){
      return ""
    }
    return "none"
  }
  // const { isOpenToggle, onOpenToggle } = useDisclosure()
  return (
    <Box
      transition="3s ease"
      // bg={useColorModeValue('green', 'gray.900')}
      bgGradient="linear(to-t, green.600, green.900)"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 64 }}
      pos="fixed"
      h="full"
      color="white"
      {...rest}
    >

      {/* HEADER */}
      <Flex h="20" alignItems="center" mx="8">
        <Icon as={LuClipboardList} fontSize={"4xl"}></Icon>
        <Text fontSize="4xl" fontFamily="Fantasy" fontWeight="bold" ml={2}>
          CEBG
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      <Accordion allowToggle>
        {LinkItems.map((link, index) => (
          <>
            <AccordionItem id={generateKey(index)} style={{border: isBorder(link.underline)}} pt={"2"}>
              <h2>
                <Link
                  as={ReachLink}
                  to={link.href ?? "#"}
                  style={{ textDecoration: "none" }}
                  _focus={{ boxShadow: "none" }}
                  key={generateKey(index + 1)}
                >
                  <AccordionButton
                    w="100%"
                    //bgColor={"orange"}
                    key={generateKey(index)}
                   // _expanded={{ bg: 'tomato', color: 'white' }}
                   _hover={{ bg: 'tomato', color: 'white' }}
                  >
                    <Icon as={link.icon} fontSize={"2xl"} color="white" />
                    <Text
                      as="span"
                      flex="1"
                      textAlign="left"
                      id={generateKey(index)}
                      pl="2"
                      fontSize={"lg"}
                    >
                      {link.name}
                    </Text>
                    {link.sub.length > 0 && <AccordionIcon />}
                  </AccordionButton>
                </Link>
              </h2>
              <Box m="2" bgColor={"white"} borderRadius={"lg"}>
                {link.sub.length > 0 &&
                  link.sub.map((sub, index) => (
                    <Link
                      key={generateKey(index)}
                      as={ReachLink}
                      to={sub.href}
                      style={{ textDecoration: "none" }}
                      _focus={{ boxShadow: "none" }}
                    >
                      <AccordionPanel
                        key={generateKey(index)}
                        //bgColor={"white"}
                        _hover={{ backgroundColor: "gray.300" }}
                        borderRadius={"lg"}
                      >
                        <Text
                          as="span"
                          flex="1"
                          textAlign="left"
                          pl="6"
                          key={generateKey(index)}
                          color={"blackAlpha.800"}
                        >
                          {sub.name}
                        </Text>
                      </AccordionPanel>
                    </Link>
                  ))}
              </Box>
            </AccordionItem>
          </>
        ))}
      </Accordion>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      as={ReachLink}
      to={href ?? "#"}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { state, dispatch } = useContext(Context);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                {/* <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                /> */}

                <Avatar bg="teal.500" />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="xl">{state !== null && state.username}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {state !== null && state.officeName}
                  </Text>
                </VStack>

                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
