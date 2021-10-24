import React, { useEffect } from "react";
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../components/Feedback/LoadingBox";
import MessageBox from "../components/Feedback/MessageBox";
import { useHistory, useRouteMatch } from "react-router-dom";
import {
  createProduct,
  listProducts,
  deleteProduct,
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../store/actions/product";

const ProductList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  let match = useRouteMatch("/productList/seller");
  let sellerMode = match?.isExact ? true : false;

  const productList = useSelector((state) => state.productList);
  const { products, error, loading } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      history.push(`/products/${createdProduct._id}/edit`);
    }

    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : "" }));
  }, [
    createdProduct,
    dispatch,
    history,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const deleteHandler = (product) => {
    if (window.confirm(`Do you want to delete the product?`)) {
      dispatch(deleteProduct(product._id));
    }
  };

  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="productList">
      <div className="header">
        <h1>Products</h1>
        <button className="createProductBtn" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingDelete && <LoadingBox />}
      {errorDelete && <MessageBox message="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox />}
      {errorCreate && <MessageBox variant="danger">{errorCreate} </MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="error">{error}</MessageBox>
      ) : (
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Actions</th>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    className="small"
                    onClick={() => history.push(`/product/${product._id}/edit`)}
                  >
                    Edit
                  </button>
                  <button
                    className="small"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
