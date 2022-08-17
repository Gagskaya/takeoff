import React from "react";
import { useAppDispatch } from "../../hooks/store";
import { useSelector } from "react-redux";

import { selectIsActiveAddContactModal } from "../../store/selectors/contacts";

import { Dialog } from "@mui/material";
import { toggleAddContactModal } from "../../store/reducers/contacts";

const AddContactModal = () => {
  const dispatch = useAppDispatch();
  const isActiveAddContactModal = useSelector(selectIsActiveAddContactModal);

  const onClose = () => {
    dispatch(toggleAddContactModal(false));
  };
  console.log(isActiveAddContactModal);

  return (
    <Dialog onClose={onClose} open={isActiveAddContactModal}>
      <button onClick={onClose}>ASDASDASDASD</button>
    </Dialog>
  );
};

export default AddContactModal;
