import {useState} from "react";
import ProfileDialog from "./ProfileDialog";
import AuthingDialog from "./App";

export default function ProfileIndex( {serverSync} ) {
    const [profileExist, setProfileExist] = useState(false);
    const toggleProfileDialog = () => {
        setProfileExist((prev) => !prev);
    }
    return (
        <div id="authing-floater">
            <AuthingDialog serverSync={serverSync} toggleDialog={toggleProfileDialog} />
            { profileExist ? <ProfileDialog closeDialog={toggleProfileDialog} /> : null }
        </div>
    )
}