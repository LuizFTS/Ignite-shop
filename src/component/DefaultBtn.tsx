import { Button } from "@/styles/components/DefaultBtn";
import { ReactNode } from "react";

interface DefaultBtnProps {
    children: ReactNode,
    disabled?: boolean,
    onClick?: () => void
}

export default function DefaultBtn({children, disabled, onClick}: DefaultBtnProps){
    return (
        <Button disabled={disabled} onClick={onClick}>
            {children}
        </Button>
    )
}