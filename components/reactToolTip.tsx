"use client"

import ReactTooltip from "react-tooltip"

type ToolTipProps = {
    name: string;
    desc: string;
    className?: string;
}

const ToolTip = ({name, desc,className} : ToolTipProps) => {
    return (
        <>
            <ReactTooltip
                id={name}
                effect="solid"
                arrowColor="#fff"
                className={className}
            >
                {desc}
            </ReactTooltip>
        </>
    )
}

export default ToolTip