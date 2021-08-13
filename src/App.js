/* global chrome */
import './App.css';
import {useState, useRef, useEffect} from "react";
import {useLanguage} from "uselanguage";
import {AuthingGuard, useAuthing} from "@authing/react-ui-components";
import {appId, appHost, guardConfig} from "./config";
import '@authing/react-ui-components/lib/index.min.css'
import {createUserRequest} from "./api/request"

function AuthingDialog({serverSync, toggleDialog}) {
    const [guardOpen, setGuardOpen] = useState(true);
    const [profileOpen, setProfileOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isReg, setIsReg] = useState(false);
    const currAuthClient = useRef(null);

    const handleGuardLoaded = async (authClient) => {
        currAuthClient.current = authClient;
        const currUser = await authClient.getCurrentUser();
        console.log("loaded: "+currUser)
        if (currUser) {
            if (process.env.REACT_APP_CHROME_EXT == 'true') {
                chrome.storage.local.set({infraUser: currUser}, () => {
                    console.log("injection success")
                })
            }
            console.log(currUser);
            let data = {
                type: "FROM_PAGE",
                text: "login",
                user: currUser
            };
            await createUserRequest(currUser.id,currUser.nickname??currUser.username).then((response)=>{
                console.log(response.data)
            })
            await window.postMessage(data, "*");
            console.log("message sent");
            setGuardOpen(false);
            setUser(currUser);
            toggleDialog();
        } else {

        }
    }
    const handleGuardLogin = async (user) => {
        console.log(user);
        setUser(user);
        let data = {
            type: "FROM_PAGE",
            text: "login",
            user: user
        };
        await createUserRequest(user.id,user.nickname??user.username).then((response)=>{
            console.log(response.data)
        })
        await window.postMessage(data, "*");
        console.log("message sent");
        setGuardOpen(false);
        toggleDialog();

    }
    const handleGuardClose = () => {
        setGuardOpen(false);
    }
    const handleRegisterSuccess = (user) => {
        setUser(user);
        setIsReg(true);
        setGuardOpen(false);
    }
    const handleProfileButton = () => {
        if (user) {
            //openDialog(); // change to toggleDialog

        } else {
            setGuardOpen(true);
        }
    }
    useEffect(() => {
        const initialRequest = async () => {
            const auth = currAuthClient.current;
            const { status } = await auth.checkLoginStatus();
            if (!status) return;
            if (isReg) {
                await serverSync(user);
                // eslint-disable-next-line no-restricted-globals
                location.reload();
            }
        }
        if (user) {
            initialRequest();
        }
    }, [user, isReg]);
    return (
        <div>
            <AuthingGuard
                visible={guardOpen}
                onRegisterInfoCompleted={handleRegisterSuccess}
                onLoad={handleGuardLoaded}
                onLogin={handleGuardLogin}
                onClose={handleGuardClose}
                appId={appId}
                config={guardConfig}
            />
        </div>
    );
}

export default AuthingDialog;
