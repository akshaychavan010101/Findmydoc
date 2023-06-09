import styles from "./Navbar.module.css";
import logo from "../../assets/logo.png";
import patientLogo from "../../assets/patientLogo.png";
import Swal from "sweetalert2";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { ChevronDownIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUserName = sessionStorage.getItem("userName");
    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    } else {
      setIsLoggedIn(false);
      setUserName("Sign In");
    }
  }, []);

  function Logout() {
    Swal.fire("Logout Successful").then(() => {
      setTimeout(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        window.location.href = `/`;
      }, 1000);
    });
  }

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        className={styles.navbarContainer}
      >
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          wrap={{ base: "wrap", md: "nowrap" }} // Added wrap property
        >
          <Box marginLeft={"30px"}>
            <Link to="/">
              <img src={logo} alt="Logo" width={"100px"} />
            </Link>
          </Box>

          <Flex
            alignItems={"center"}
            display={{ base: "none", md: "flex" }} // Added display property
            justifyContent={"space-evenly"}
            width={"40%"} // Added width property
            className={styles.navBtn}
            whiteSpace={"nowrap"} // Added whiteSpace property
          >
            <Link to="/">
              <Box
                className={styles.navBtnChild}
                padding={"6px 8px"}
                _hover={{
                  backgroundColor: "rgb(218, 230, 230)",
                  color: "black",
                }}
              >
                Home
              </Box>
            </Link>
            <Link to="/ourdoctors">
              <Box
                className={styles.navBtnChild}
                padding={"6px 8px"}
                _hover={{
                  backgroundColor: "rgb(218, 230, 230)",
                  color: "black",
                }}
              >
                Our Doctors
              </Box>
            </Link>
            <Box
              className={styles.navBtnChild}
              padding={"6px 8px"}
              _hover={{ backgroundColor: "rgb(218, 230, 230)", color: "black" }}
            >
              <Link to="/services">Our Services</Link>
            </Box>
            <Box
              className={styles.navBtnChild}
              padding={"6px 8px"}
              _hover={{ backgroundColor: "rgb(218, 230, 230)", color: "black" }}
              style={{display : isLoggedIn ? "block" : "none"}}
            >
              <Link to="/appointment">Appointments</Link>
            </Box>
            {isLoggedIn ? (
              <Box
                className={styles.navBtnChild}
                padding={"6px 8px"}
                // _hover={{ backgroundColor: "rgb(218, 230, 230)", color: "black" }}
              >
                Hie {userName}
              </Box>
            ) : (
              <Link to="/user/login">
                <Box
                  className={styles.signin}
                  padding={"6px 8px"}
                  _hover={{ backgroundColor: "rgb(218, 230, 230)" }}
                >
                  Sign In
                </Box>
              </Link>
             
            )}
          </Flex>
          <Link to="/notifications" style={{display : sessionStorage.getItem("login") ? "block" : "none"}}>
            🔔
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  outline={"auto"}
                  minW={0}
                >
                  <Avatar outline={"auto"} size={"sm"} src={patientLogo} />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar size={"xl"} src={patientLogo} margin={"0 auto"} />
                  </Center>
                  <br />
                  {isLoggedIn ? (
                    <Box id="userName" fontWeight={"bold"} textAlign={"center"}>
                      Hi {userName}
                    </Box>
                  ) : (
                    <Box id="userName" fontWeight={"bold"} textAlign={"center"}>
                      User
                    </Box>
                  )}

                  {/* <Box textAlign={"center"}>john.doe@example.com</Box> */}
                  <br />
                  <MenuItem style={{display : isLoggedIn ? "block" : "none"}}>Change Profile Photo</MenuItem>
                  <MenuItem style={{display : isLoggedIn ? "block" : "none"}}>
                    <Link to="/user/dashboard">Dashboard</Link>
                  </MenuItem>
                  <MenuItem onClick={Logout} style={{display : isLoggedIn ? "block" : "none"}}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
