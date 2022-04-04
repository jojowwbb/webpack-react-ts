import React, { FC } from 'react'

interface IProps {
    name: string
}

const Hello: React.FC<IProps> = (props) => {
    const { name } = props
    return <h1>hello {name}</h1>
}

export default Hello
