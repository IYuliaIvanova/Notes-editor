import React from "react";

interface ITitle {
    children: React.ReactNode
}

export const Title = ({ children }: ITitle) => {
    return (
        <h1 className="title">{children}</h1>
    )
}