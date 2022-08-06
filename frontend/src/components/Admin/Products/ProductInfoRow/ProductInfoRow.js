import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import * as MdIcons from "react-icons/md";
import Confirmation from "../../../UI/Confirmation/Confirmation";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../../../store/productSlice/productActions";

const ProductInfoRow = (props) => {
  const { product: el } = props;
  const dispatch = useDispatch();
  const [confirmationModel, setConfirmationModel] = useState(false);

  const setConfirm = () => {
    setConfirmationModel((prev) => !prev);
  };
  const onDeleteConfrim = () => {
    dispatch(deleteProduct(el._id));
    setConfirmationModel((prev) => !prev);
  };
  return (
    <Fragment>
      <Confirmation
        open={confirmationModel}
        onBackdropClick={setConfirm}
        onConfirm={onDeleteConfrim}
        text={`Are You Sure To Delete ${el.model} ?`}
      />
      <div className="all-product-info__row">
        <div className="all-product-info__row-details">
          <div className="all-product-info__row-details__div-1 all-product-info__row-details__div">
            <span className="all-product-info__row-name">
              Brand: {el.brand}
            </span>

            <span className="all-product-info__row-name">
              Model :{el.model}
            </span>
          </div>

          <div className="all-product-info__row-details__div-1 all-product-info__row-details__div">
            <span className="all-product-info__row-id">Id: {el._id}</span>
            <span className="all-product-info__row-stock">Stock :200</span>
          </div>
        </div>

        <div className="all-product-info__row-icons">
          <Link to={`/addProduct/${el._id}`}>
            <MdIcons.MdModeEditOutline />
          </Link>
          <MdIcons.MdDelete onClick={setConfirm} />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductInfoRow;
