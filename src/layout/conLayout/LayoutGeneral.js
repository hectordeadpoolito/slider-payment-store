import React from "react";


const LayoutGeneral = (props) => {
    const {children} = props;
    return (
        <>
        <Menu/>
        <section style={{marginTop: "75"}}>
            <div>{children}</div>
        </section> {" "}
        </>
    );
};

export default LayoutGeneral