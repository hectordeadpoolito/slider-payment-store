import React from "react";
import {Route} from "react-router-dom";
import PropTypes from "prop-types";

const RutaPublica = (props) => {
    const {layout: layout, component: Component, ...rest} = props;
    return(
        <Route
        {...rest}
        render={(matchProps) => <Layout>{<Component {...matchProps} />}</Layout>}
        />
    );
};

RutaPublica.propTypes = {
    component: PropTypes.any.isRequired,
    layout: PropTypes.any.isRequired,
    path: PropTypes.string,
};

export default RutaPublica