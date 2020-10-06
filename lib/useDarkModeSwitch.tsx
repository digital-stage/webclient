import React, {useEffect, useState} from "react";
import {useStages} from "./digitalstage/useStages";

export interface DarkModeProps {
    darkMode: boolean,

    setDarkMode: (enabled: boolean) => void
}

export const DarkModeContext = React.createContext<DarkModeProps>(undefined);

export const useDarkModeSwitch = () => React.useContext(DarkModeContext);

export const DarkModeStageProvider = (props: {
    children: React.ReactNode
}) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const {stageId} = useStages();

    useEffect(() => {
        setDarkMode(stageId !== undefined);
    }, [stageId]);

    return (
        <DarkModeContext.Provider value={{
            darkMode,
            setDarkMode
        }}>
            {props.children}
        </DarkModeContext.Provider>
    )
};

export const withDarkMode = (Component) => {
    const WithDarkMode = (props) => {
        const {darkMode, setDarkMode} = useDarkModeSwitch();
        return (
            <Component darkMode={darkMode} setDarkMode={setDarkMode} {...props} />
        )
    };
    return WithDarkMode;
};