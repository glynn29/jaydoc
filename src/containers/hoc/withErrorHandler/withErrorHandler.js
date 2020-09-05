import React from "react";

import Modal from "../../../components/UI/Modal/Modal";
import Aux from "../Auxillary/Auxillary";

const withErrorHandler = (WrappedComponent) => {
    return props =>{
        const {error, clearError} = props;

            return (
                <Aux>
                    <Modal
                    show={error}
                    modalClosed={clearError}>
                       {error? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>
            );
        }
};

export default withErrorHandler;
