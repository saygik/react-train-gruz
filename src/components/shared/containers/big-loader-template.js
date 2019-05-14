import React from 'react'
import BigLoader from "../bigloader/index"

const BigLoaderTemplate = (props) =>
            <>
                {props.children.props.firstLoad ? <BigLoader/> : props.children }
            </>
export default BigLoaderTemplate