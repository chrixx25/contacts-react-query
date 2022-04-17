import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from 'react-router-dom';
import { useCookie } from "react-use";
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from "material-ui-popup-state/hooks";
import { useAppState } from "../context";
import { useUser } from 'contexts/UserProvider';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Header = () => {
    const popupState = usePopupState({ variant: "popover", popupId: "account-menu" });
    const [state, dispatch] = useAppState();
    const navigate = useNavigate();
    const [, , deleteCookie] = useCookie(process.env.REACT_APP_TOKEN);
    const user = useUser()[0]?.result;
    const avatarLetters = `${user?.firstName?.substring(0, 1) || ''}${user?.lastName?.substring(0, 1) || ''}`;

    const handleLogout = () => {
        deleteCookie();
        navigate("/login");
    };

    return (
        <AppBar position="fixed" open={state.sidebarCollapsed}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => dispatch('sidebarCollapsed')}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(state.sidebarCollapsed && { display: "none" })
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                    CONTACT MANAGER
                </Typography>
                <Tooltip title="Account settings">
                    <IconButton
                        {...bindTrigger(popupState)}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={state.sidebarCollapsed ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={state.sidebarCollapsed ? "true" : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>{avatarLetters}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    id="account-menu"
                    onClick={popupState.close}
                    {...bindMenu(popupState)}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1
                            },
                            "&:before": {
                                content: '""',
                                display: "block",
                                position: "absolute",
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: "background.paper",
                                transform: "translateY(-50%) rotate(45deg)",
                                zIndex: 0
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                    <MenuItem>
                        <Avatar /> Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Change Password
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

export default Header