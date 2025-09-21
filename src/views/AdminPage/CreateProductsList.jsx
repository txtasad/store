// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  sudoDeleteProduct,
  getProductsList,
  editProductDataReq,
  onOffProductReq,
} from "../../API/Api";
import Table from "react-bootstrap/Table";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteAlert, DeactivateAlert } from "../../helper/PopupAlert";
import { TbEdit } from "react-icons/tb";
import { AiFillEye } from "react-icons/ai";
import { HiEyeOff } from "react-icons/hi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FaCartArrowDown, FaFireFlameCurved, FaN, FaTags } from "react-icons/fa6";
import getBaseUrl from "../../helper/BackendConnect";
import { rootUser, editUser } from "../../constant/Form";
const BASE_URL = getBaseUrl();
// eslint-disable-next-line react/prop-types

const ProductItem = ({ product, perPage, index }) => {


  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const result = await DeleteAlert();
    if (result.isConfirmed) {
      const deleteResult = await sudoDeleteProduct({ id });
      if (deleteResult) {
        getProductsList(1, perPage, "0");

      }
    }
  };

  const handleEditClick = async (id) => {
    const res = await editProductDataReq(product);
    res ? toast.success(" 🦄 edit data set") : toast.error(" 🦄 edit NOT data set");

  };

  const handleToggleClick = async (id, bullionData) => {

    const result = await DeactivateAlert(bullionData);
    if (result.isConfirmed) {
      try {
        const res = await onOffProductReq({ id, bullionData });
        if (res) {
          toast.success(" 🦄 updated successfully; Active: " + bullionData);
        } else {
          // fetchPackageList();
          toast.error(" 🦄 update error!", res);
        }
        getProductsList(1, perPage, "0");
      } catch (error) {
        console.error("Error updating product (active):", error);
        toast.error("Failed to update product (active)");
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };

  const handleSave = () => {
    navigate("/CreateNewProduct");
  };


  return (
    <>
      <tr className={product?.deleted?.length > 1 ? "dim-product" : !product?.active ? "deactivate-product" : ""}>
        <td>
          {!product?.active ? (<p><i><b>Deactivated on Website</b></i></p>) : null}
          <p>{index + 1 + ") " + product.title}</p>
        </td>
        <td>
          <p><img src={sanitizeImageUrl(BASE_URL + product.thumbnail)}
            style={{ width: "90px", }} /></p>

        </td>
        <td>
          <p
          dangerouslySetInnerHTML={{ __html: product.description }}>
          </p>
          <p><ul>{product.descriptionMarkers.map(i => (<li key={i.category}><i>{i.category + " : " + i.value}</i></li>))}</ul></p>
          <br />
          <br />
          <i>Product Code (not part of description): </i>
          {product._id}
        </td>
        <td>
          <p>
            <i>Created: </i>
            {formatDate(product.created)}
            <br />
            <br />
            <i>Modified: </i>
            {formatDate(product.modified)}
            <br />
            <br />
            <i>{product.deleted?.length > 1 ? "Deleted: " : ""}</i>
            {product.deleted && formatDate(product.deleted)}
          </p>
        </td>
        <td>
          <p>
            {product.priceCurrency + " "}
            {product.price}
          </p>
        </td>

        <td>
          <p>
            {"₹"}
            {product.priceINR}
          </p>
        </td>
        <td>
          <p>
            {product.quantity}
          </p>
        </td>
        <td>
          <p>
            {product.off + "%"}
          </p>
        </td>
        <td className="text-center">
          <p>
            <FaN />
            {product.newListing ? " Yes" : " No"}
          </p>
        </td>
        <td className="text-center package-delete-button">
          <p>
            {product.soldout ? (<FaCartArrowDown />) : null}
            {product.soldout ? " Yes" : " No"}
          </p>
        </td>
        <td className="text-center">
          <p>
            {product.featured ? (
              <span className="featured-shine">
                <FaFireFlameCurved />
              </span>) : null}
            {product.featured ? " Yes" : " No"}
          </p>
        </td>

        <td className="text-center  on-off-button">
          {product?.deleted == null ? product.active ? (
            <AiFillEye
              className="open-button"
              onClick={() => handleToggleClick(product._id, false)}
            />
          ) : (
            <HiEyeOff
              className="off-button"
              onClick={() => handleToggleClick(product._id, true)}
            />
          ) : null}
        </td>


        <td className="member-ship-agent-icon">
          <p>
            {product?.productImages?.map((image, index) => (
              <p key={index}>
                <span>
                  {index + 1 + ") "} {image?.details || (<b>___</b>)}
                  <br />
                  <img src={sanitizeImageUrl(BASE_URL + image.path)}
                    style={{ width: "90px", }} />
                </span>
              </p>
            ))}
          </p>
          <p>
            <b>Product Tags: </b> <br />{product?.tags?.map(item => (<><FaTags /> {item} <br /></>))}
          </p>
        </td>

        <td className="text-center ">
          {product?.deleted == null && (<div onClick={handleSave}>
            <span
              onClick={() => handleEditClick(product._id)}
              className="package-delete-button"
            >
              <TbEdit />
            </span>
          </div>)}
        </td>
        <td className="text-center">
          {product?.deleted == null && (<span
            onClick={() => handleDelete(product._id)}
            className="package-delete-button"
          >
            <AiOutlineDelete />
          </span>)}
        </td>
      </tr>
    </>
  );
};



const CreateProductsList = () => {

  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if (getUser?.[0]?.auth != "admin" || !(getUser?.[0]?.email==rootUser || getUser?.[0]?.email == editUser)) {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }

  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);

  const handleSave = () => {
    navigate("/CreateNewProduct");
  };

  useEffect(() => {
    getProductsList(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);


  const handlePageClick = async (event) => {
    await getProductsList(event.selected + 1, perPage, searchKeyword);
  };


  const searchProductList = useSelector((state) => state.product.searchProductList) || [];
  const Total = useSelector((state) => state.product.searchProductTotal);


  const searchData = async () => {
    console.log('sd');
    await getProductsList(1, perPage, searchKeyword);
  };

  const PageKeyOnChange = async (e) => {
    console.log('pkc');
    const perPage = parseInt(e.target.value);
    setPerPage(perPage);
    await getProductsList(1, perPage, searchKeyword);
  };
  const searchOnChange = async (e) => {
    console.log('soc');
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("0");
      await getProductsList(1, perPage, "0");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="admin-page-main-title pt-5">
            <h2>Create New Products Listings</h2>
            <p>
              Create both Featured and New Listing or Modify Existing Products
            </p>
          </div>
          <div className="row">

            <div className="col-12 col-sm-3 col-md-6 col-lg-3 col-xl-3">
              <select
                onChange={PageKeyOnChange}
                className="form-control form-select-sm form-select form-control-sm"
              >
                <option value="5">5 Per Page</option>
                <option value="10">10 Per Page</option>
                <option value="20">20 Per Page</option>
              </select>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <div className="input-group mb-3">
                <input
                  onChange={searchOnChange}
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Search.."
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  onClick={searchData}
                  className="btn  btn-outline-primary btn-sm mb-0"
                  type="button"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 col-xl-2 text-center align-items-center justify-content-center">
              <div className="cancel-admin-button "><button onClick={handleSave}>Create Product</button></div>
            </div>
          </div>

          <div className="table-responsive pt-3">
            <Table striped bordered hover>
              <thead>
                <tr className="thead-css">
                  <th>Product Name</th>
                  <th>Thumbnail</th>
                  <th>Product Description</th>
                  <th>Dates</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">INR Price</th>
                  <th className="text-center">in Stock</th>
                  <th className="text-center">Discount</th>
                  <th className="text-center">New</th>
                  <th className="text-center">Sold Out</th>
                  <th className="text-center">Featured</th>
                  <th className="text-center">Active</th>
                  <th className="text-center">Product Images</th>
                  <th className="text-center">Edit</th>
                  <th className="text-center">Delete</th>
                </tr>
              </thead>
              <tbody>

                {searchProductList?.map((item, i) => (
                  <ProductItem key={i} product={item} perPage={perPage} index={i} />
                ))}



              </tbody>
            </Table>
          </div>

        </div>

        <div className="col-12 mt-5">
          <nav aria-label="Page navigation example">
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageCount={Total / perPage}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CreateProductsList;
