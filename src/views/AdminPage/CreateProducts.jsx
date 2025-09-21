// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import { isEmpty } from "../../helper/Validation";
import { toast } from "react-toastify";
import {
  createProductReq,
  updateProductData,
  editProductDataReq,
} from "../../API/Api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { FaProductHunt, FaTags } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { rootUser, editUser } from "../../constant/Form";
import getBaseUrl from "../../helper/BackendConnect";
import { FaCirclePlus, FaCircleXmark } from "react-icons/fa6";
import JoditEditor from "jodit-react";
const BASE_URL = getBaseUrl();


const CreateNewProductForm = () => {
  const navigate = useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if (getUser?.[0]?.auth != "admin" || !(getUser?.[0]?.email == rootUser || getUser?.[0]?.email == editUser)) {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const [productTagOptions, setProductTagOptions] = useState([]);
  const [selectedTag, setSelectedTag] = useState([]);
  const [specifications, setSpecifications] = useState([]);
  const [isNewListing, setIsNewListing] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTournament, setIsTournament] = useState(false);
  const [isTournamentDetails, setIsTournamentDetails] = useState(false);
  const [isTournamentPOT, setIsTournamentPOT] = useState(false);
  const [packageCurrency, setPackageCurrency] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productImagesCount, setProductImagesCount] = useState(1);
  const [productImagesUpdated, setProductImagesUpdated] = useState({});
  const [productImagesDetail, setProductImagesDetail] = useState(Array(10).fill(""));

  const editorDes = useRef(null);
  const [editorDesState, seteditorDesState] = useState("");

  const editProductData = useSelector(
    (state) => state.product.editProductData
  );

  const handleCancel = () => {
    editProductDataReq({})
    navigate("/CreateProducts");
  };

  const handleAddCategories = (a) => {
    if (isEmpty(catRef?.current) || isEmpty(catValueRef?.current))
      toast.success("Add previous category data!");
    else {
      const newField = { category: catRef.current, value: catValueRef.current }
      setSpecifications([...specifications, newField])
      catRef.current = "";
      catValueRef.current = "";
    }
  };

  const handleOnChangeCategory = (a, index) => {
    try {
      if (specifications?.[index]?.category) {
        const newSpecifications = JSON.parse(JSON.stringify(specifications));
        newSpecifications[index].category = a.target.value;
        setSpecifications(newSpecifications);
      }
      else
        catRef.current = a.target.value;
    } catch (e) {
      console.log('error update category markers', e)
    }

  };

  const handleOnChangeCategoryValue = (a, index) => {
    try {
      if (specifications?.[index]?.value) {
        const newSpecifications = JSON.parse(JSON.stringify(specifications));
        newSpecifications[index].value = a.target.value;
        setSpecifications(newSpecifications);
      }
      else
        catValueRef.current = a.target.value;
    } catch (e) {
      console.log('error update category markers', e)
    }
  };


  const handleOnChangePIDetail = (a, index) => {
    try {
      const pid = [...productImagesDetail];
      pid[index] = a.target.value;
      setProductImagesDetail(pid);
      console.log('pid', productImagesDetail)
    } catch (e) {
      console.log('error update product image detail', e)
    }
  };

  const handleRemoveCategories = (r, item, index) => {
    if (specifications?.length <= 1)
      toast.error("at least one category needed!");
    else if (index == specifications.length)
      toast.warn("category not added previously");
    else {
      const sp = JSON.parse(JSON.stringify(specifications));
      const delItem = sp.splice(index, 1);
      setSpecifications(sp);
      catRef.current = "";
      catValueRef.current = "";
      console.log('rem', index, delItem, sp);
    }
  };

  useEffect(() => {
    setProductImagesUpdated({ updated: false, count: 0, i: [] });
    if (editProductData && editProductData._id) {
      console.log('udata', editProductData);
      setSpecifications(editProductData.descriptionMarkers);
      setIsActive(editProductData.active);
      setIsFeatured(editProductData.featured);
      setIsSoldOut(editProductData.soldout);
      setIsNewListing(editProductData.newListing);
      const selectedTags = editProductData.tags.map((v) => ({
        value: v,
        label: (
          <span>
            <FaTags />
            &nbsp;{v}
          </span>
        )
      }));
      setSelectedTag(selectedTags);
      setPackageCurrency(editProductData.priceCurrency);
      setProductImagesCount(editProductData?.productImages?.length + 1 || 1);
      const d = Array(10).fill("");
      editProductData?.productImages?.map((i, index) => d[index] = i.details);
      setProductImagesDetail(d);
    }
  }, [editProductData]);

  const titleRef = useRef();
  const descriptionRef = useRef("");
  const priceRef = useRef();
  const discountRef = useRef();
  const quantityRef = useRef();
  const priceINRRef = useRef();
  const catRef = useRef("");
  const catValueRef = useRef("");

  const handleSubmitUpdateProduct = (e, id) => {
    e.preventDefault();
    e.target.disabled = true;
    const title = titleRef?.current?.value;
    const price = priceRef?.current?.value;
    const discount = discountRef?.current?.value;
    const quantity = quantityRef?.current?.value;
    const priceINR = priceINRRef?.current?.value;
    const currency = packageCurrency;
    const description = descriptionRef?.current?.value;
    const descriptionMarkers = specifications;
    const active = isActive;
    const soldout = isSoldOut;
    const newlisting = isNewListing;
    const featured = isFeatured;

    const tags = [];
    selectedTag?.forEach(a => tags.push(a?.value));

    const productImagesPath = productImages.map(item => item.path);

    if (isEmpty(title)) {
      toast.warn("Title is Required");
      e.target.disabled = false;
      return;
    }
    if (isEmpty(price)) {
      toast.error("Price Required");
      e.target.disabled = false;
      return;
    }
    if (
      isEmpty(priceINR) ||
      isEmpty(discount) ||
      isEmpty(quantity) ||
      isEmpty(description) ||
      isEmpty(tags) ||
      isEmpty(descriptionMarkers) ||
      isEmpty(currency) ||
      isEmpty(active) ||
      isEmpty(soldout) ||
      isEmpty(newlisting) ||
      isEmpty(featured)
    ) {
      toast.error("All fields are required");
      e.target.disabled = false;
      return;
    }
    // for /n newline to br .replace(/(?:\r\n|\r|\n)/g, '<br>')
    // Create the post body
    let count = 0;
    const updateFormData = new FormData();
    updateFormData.append("id", id)
    if (editProductData.title != title) { updateFormData.append("title", title); count++; }
    if (editProductData.description != description) { updateFormData.append("description", description); count++; }
    if (editProductData.price != price) { updateFormData.append("price", price); count++; }
    if (editProductData.priceINR != priceINR) { updateFormData.append("priceINR", priceINR); count++; }
    if (editProductData.off != discount) { updateFormData.append("off", discount); count++; }
    if (editProductData.quantity != quantity) { updateFormData.append("quantity", quantity); count++; }
    if (editProductData.priceCurrency != currency) { updateFormData.append("priceCurrency", currency); count++; }
    if (editProductData.active != active) { updateFormData.append("active", active); count++; }
    if (editProductData.soldout != soldout) { updateFormData.append("soldout", soldout); count++; }
    if (editProductData.featured != featured) { updateFormData.append("featured", featured); count++; }
    if (editProductData.newListing != newlisting) { updateFormData.append("newListing", newlisting); count++; }
    if (JSON.stringify(tags) != JSON.stringify(editProductData.tags)) { updateFormData.append("tags", tags); count++; }
    if (JSON.stringify(descriptionMarkers) != JSON.stringify(editProductData.descriptionMarkers)) {
      descriptionMarkers.forEach(item =>
        updateFormData.append("descriptionMarkers[]", JSON.stringify(item)));
      count++;
    }

    if (thumbnail != undefined && thumbnail != null && thumbnail?.name) { updateFormData.append("thumbnail", thumbnail); count++; }

    if (!isEmpty(productImagesDetail)) { updateFormData.append("productImagesDetail", JSON.stringify(productImagesDetail)); count++; }

    if (productImagesUpdated.updated && productImagesUpdated.count > 0) {
      productImagesPath.forEach(item => updateFormData.append("productImages", item, item.name));
      updateFormData.append("productImagesUpdated", JSON.stringify(productImagesUpdated));
      updateFormData.append("editProductImages", JSON.stringify(editProductData?.productImages));
      count++;
    }


    if (count == 0) {
      toast.error("No changes detected!");
      e.target.disabled = false;
      return;
    }
    console.log('frm data', updateFormData);

    updateProductData(updateFormData)
      .then((res) => {
        if (res === true) {
          toast.success("Data saved successfully");
          handleCancel();
        }
      })
      .catch((error) => {
        toast.error("UPR01: Request failed. Please try again.");
        console.error(error);
        e.target.disabled = false;
      });
    editProductDataReq({})
  };


  const handleSubmitCreateProduct = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    const title = titleRef?.current?.value;
    const price = priceRef?.current?.value;
    const discount = discountRef?.current?.value;
    const quantity = quantityRef?.current?.value;
    const priceINR = priceINRRef?.current?.value;
    const currency = packageCurrency;
    const description = descriptionRef?.current?.value;
    const descriptionMarkers = specifications;
    const active = isActive;
    const soldout = isSoldOut;
    const newlisting = isNewListing;
    const featured = isFeatured;

    const tags = [];
    selectedTag?.forEach(a => tags.push(a?.value));

    const productImagesPath = productImages.map(item => item.path);


    if (isEmpty(title)) {
      toast.warn("Title is Required");
      e.target.disabled = false;
      return;
    }
    if (isEmpty(price)) {
      toast.error("Price Required");
      e.target.disabled = false;
      return;
    }
    if (
      isEmpty(priceINR) ||
      isEmpty(discount) ||
      isEmpty(quantity) ||
      isEmpty(description) ||
      isEmpty(thumbnail) ||
      isEmpty(productImages) ||
      isEmpty(tags) ||
      isEmpty(descriptionMarkers) ||
      isEmpty(currency) ||
      isEmpty(active) ||
      isEmpty(soldout) ||
      isEmpty(newlisting) ||
      isEmpty(featured)
    ) {
      toast.error("All fields are required");
      e.target.disabled = false;
      return;
    }
    else
      toast.success('so far so good!')

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("priceINR", priceINR);
    formData.append("off", discount);
    formData.append("quantity", quantity);
    formData.append("description", description);
    formData.append("thumbnail", thumbnail);
    formData.append("tags", tags);
    formData.append("priceCurrency", currency);
    formData.append("active", active);
    formData.append("soldout", soldout);
    formData.append("newListing", newlisting);
    formData.append("featured", featured);

    productImagesPath.forEach(item =>
      formData.append("productImages", item, item.name));

    descriptionMarkers.forEach(item =>
      formData.append("descriptionMarkers[]", JSON.stringify(item)));

    createProductReq(formData)
      .then((res) => {
        if (res === true) {
          toast.success("Data saved successfully");
          handleCancel();
        }
      })
      .catch((error) => {
        toast.error("CPR01: Request failed. Please try again.");
        console.error(error);
        e.target.disabled = false;

      });
  };


  useEffect(() => {
    const defaultTags = ["Books", "Finance", "AI", "Technology", "Quotes"];
    const modDefaultTags = defaultTags.map((v) => ({
      value: v,
      label: (
        <span>
          <FaTags />
          &nbsp;{v}
        </span>
      ),
      assistantIcon: null,
      assistantName: v,
    }));
    setProductTagOptions(modDefaultTags);

  }, []);

  const handleTagsChange = (selectedOptions) => {
    setSelectedTag(selectedOptions);
  };



  // function for image upload
  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    const sizeLimit = 1 * 1000 * 1024;
    if (file) {
      var dimen;
      if (validateFileTypeSize(file, sizeLimit)) { dimen = await imageDimensions(file); }
      console.log('dimen', dimen)
      if (dimen?.width <= 700 && dimen?.height <= 750) {
        setThumbnail(file);
      } else {
        toast.error("Invalid File!");
      }
    } else {
      console.error("No file selected");
    }
  };
  // function for image upload
  const handleProductImagesChange = async (e, index) => {
    const file = e.target.files[0];
    const sizeLimit = 2 * 1000 * 1024;
    if (file) {
      var dimen;
      if (validateFileTypeSize(file, sizeLimit)) { dimen = await imageDimensions(file); }
      console.log('dimen', dimen, index)
      if (dimen?.width <= 1080 && dimen?.height <= 1280) {
        const npi = [...productImages];

        if (productImages?.length != 0 && index <= productImages?.length - 1 && !editProductData?.productImages) {
          npi[index] = { path: file, details: "" };
          setProductImages(npi);
          console.log('to be updated exist normal', index);
        }

        else if (editProductData?.productImages?.length > 0) {
          console.log('to be updated exist edit data', index);
          const piu = productImagesUpdated;
          const existing = piu.i.includes(index);
          piu.updated = true;
          piu.count = existing ? piu.count : piu.count + 1;
          piu.i = existing ? piu.i : [...piu.i, index];

          if (productImages?.length != 0 && existing) {
            npi[piu.i.indexOf(index)] = { path: file, details: "" };
            setProductImages(npi);
          }
          else {
            npi.push({ "path": file, "details": "" });
            setProductImages(npi);
            productImagesCount < 10 && !existing && index >= editProductData?.length ? setProductImagesCount(picount => picount + 1) : productImagesCount >= 10 ? toast.error("Edit Error: At Max 10 product images allowed!") : null;
          }
          setProductImagesUpdated(piu);
        }
        else {
          npi.push({ "path": file, "details": "" });
          setProductImages(npi);
          productImagesCount < 10 ? setProductImagesCount(picount => picount + 1) : toast.error("At Max 10 product images allowed!");
          console.log('to be a new insert normal', index);
        }
      } //end dimen if
      else {
        toast.error("Invalid File!");
      }
    } else {
      console.error("No file selected");
    }
  };

  // Function to validate file type
  const validateFileTypeSize = (file, sizeLimit) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const testExtension = allowedExtensions.test(file.name);
    const testSize = file.size < sizeLimit ? true : false;
    return testExtension && testSize;
  };

  function imageDimensions(file) {
    const img = document.createElement("img");
    const objectUrl = URL.createObjectURL(file);
    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        // Natural size is the actual image size regardless of rendering.
        // The 'normal' `width`/`height` are for the **rendered** size.
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        // Resolve promise with the width and height
        URL.revokeObjectURL(objectUrl)
        resolve({ width, height });
      };
      // Reject promise on error
      img.onerror = reject;
    });
    // Setting the source makes it start downloading and eventually call `onload`
    img.src = URL.createObjectURL(file);

    return promise;
  }
  const PIUploadRenderer = ({ src, index }) => {
    return (
      <>
        <div>
          <label htmlFor="productImages" className="form-label">
            Product Images with Short Description (Max: 10 images; Max width: 1080px;){" "}
            <span className="price-title-point">*</span>
          </label>
          <img
            src={src}
            width="350px"
            alt={"Product Image Placeholder : " + (index + 1)} />
          <div className="pt-2 text-center">
            <input
              type="file"
              name="productImages[]"
              id={"productImages" + index}
              onChange={(e) => handleProductImagesChange(e, index)}
            />
            <label htmlFor={"productImages" + index} className="custom-label">
              Upload Product Image : {index + 1} <FiUpload />
            </label>
          </div>
        </div>
      </>)
  }

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2><FaProductHunt /> Create a New Product</h2>
        <p></p>
      </div>
      <div className="pt-3 admin-price-plan">
        <div className="row mb-3 justify-content-md-center">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-8">
            <div className="cancel-admin-button">
              <button onClick={handleCancel}>Cancel</button>
            </div>
            <div className="row">
              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-12 pt-3">
                <label htmlFor="titleRef" className="form-label">
                  Product Title <span className="price-title-point">*</span>
                </label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    ref={titleRef}
                    defaultValue={editProductData?.title || ""}
                  />
                </div>
              </div>

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-12 pt-3">
                <label htmlFor="descriptionRef" className="form-label">
                  Product Description <span className="price-title-point">*</span>
                </label>
                <div className="">
                  {/* <textarea
                    type="text"
                    className="form-control"
                    ref={descriptionRef}
                    rows={20}
                    wrap="soft"
                    defaultValue={editProductData?.description || ""}
                  /> */}

                  <JoditEditor
                    ref={descriptionRef}
                    value={editProductData?.description || ""}
                    // value={editorDesState}
                    tabIndex={1}
                  // onChange={(newContent) => {console.log("editor: ",newContent);seteditorDesState(newContent)}}
                  />
                </div>
              </div>

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-6  col-xl-6 pt-3 ">
                <label htmlFor="isNewListing" className="form-label">
                  New Listing <span className="price-title-point">* </span>
                  <i> (* usually have discount running on them)</i>
                </label>
                <div className="">
                  <select
                    id="isNewListing"
                    className="form-select"
                    value={isNewListing}
                    onChange={(e) => setIsNewListing(e.target.value)}
                  >
                    <option value="">Select Yes / No</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-6  col-xl-6 pt-3 ">
                <label htmlFor="isSoldOut" className="form-label">
                  Sold-Out Product <span className="price-title-point">* </span>
                </label>
                <div className="">
                  <select
                    id="isSoldOut"
                    className="form-select"
                    value={isSoldOut}
                    onChange={(e) => setIsSoldOut(e.target.value)}
                  >
                    <option value="">Select Yes / No</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
              </div>

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-6  col-xl-6 pt-3 ">
                <label htmlFor="isActive" className="form-label">
                  Product Active on Website <span className="price-title-point">* </span>
                </label>
                <div className="">

                  <input
                    type="radio"
                    name="isActive"
                    id="isActive"
                    defaultChecked={editProductData.active}
                    value={true}
                    onChange={(e) => setIsActive(e.target.value)} /> Yes {"  "}

                  <input
                    type="radio"
                    name="isActive"
                    id="isActive"
                    value={false}
                    defaultChecked={!editProductData.active}
                    onChange={(e) => setIsActive(e.target.value)} /> No

                </div>
              </div>

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-6  col-xl-6 pt-3 ">
                <label htmlFor="isFeatured" className="form-label">
                  Featured <span className="price-title-point">* </span>
                </label>
                <div className="">

                  <input
                    type="radio"
                    name="isFeatured"
                    id="isFeatured"
                    value={true}
                    defaultChecked={editProductData.featured}
                    onChange={(e) => setIsFeatured(e.target.value)} /> Yes {"  "}

                  <input
                    type="radio"
                    name="isFeatured"
                    id="isFeatured"
                    value={false}
                    defaultChecked={!editProductData.featured}
                    onChange={(e) => setIsFeatured(e.target.value)} /> No

                </div>
              </div>


              <div className="admin-price-list col-sm-12 col-md-12 col-lg-6  col-xl-6 pt-3 ">
                <label htmlFor="isTournament" className="form-label">
                  Tournament - Listing <span className="price-title-point">* </span>
                </label>
                <div className="">

                  <input
                    type="radio"
                    name="isTournament"
                    id="isTournament"
                    value={true}
                    defaultChecked={editProductData.tournament}
                    onChange={(e) => setIsTournament(e.target.value)} /> Yes {"  "}

                  <input
                    type="radio"
                    name="isTournament"
                    id="isTournament"
                    value={false}
                    defaultChecked={!editProductData.tournament}
                    onChange={(e) => setIsTournament(e.target.value)} /> No

                </div>
              </div>

              {<div className="admin-price-list col-sm-12 col-md-12 col-lg-6  col-xl-6 pt-3 ">
                <label htmlFor="isTournamentDetails" className="form-label">
                  Tournament Details - Redirect Allowed <span className="price-title-point">* </span>
                </label>
                <div className="">

                  <input
                    type="radio"
                    name="isTournamentDetails"
                    id="isTournamentDetails"
                    value={true}
                    defaultChecked={editProductData?.tournamentDetailsObject?.tournamentRedirect}
                    onChange={(e) => setIsTournament(e.target.value)} /> Yes {"  "}

                  <input
                    type="radio"
                    name="isTournamentDetails"
                    id="isTournamentDetails"
                    value={false}
                    defaultChecked={!editProductData?.tournamentDetailsObject?.tournamentRedirect}
                    onChange={(e) => setIsTournamentDetails(e.target.value)} /> No

                </div>
              </div>}

              {<div className="admin-price-list col-sm-12 col-md-12 col-lg-6  col-xl-6 pt-3 ">
                <label htmlFor="isTournamentPOT" className="form-label">
                  Player of The Month - Listing <span className="price-title-point">* </span>
                </label>
                <div className="">

                  <input
                    type="radio"
                    name="isTournamentPOT"
                    id="isTournamentPOT"
                    value={true}
                    defaultChecked={editProductData?.tournamentDetailsObject?.pom}
                    onChange={(e) => setIsTournament(e.target.value)} /> Yes {"  "}

                  <input
                    type="radio"
                    name="isTournamentPOT"
                    id="isTournamentPOT"
                    value={false}
                    defaultChecked={!editProductData?.tournamentDetailsObject?.pom}
                    onChange={(e) => setIsTournamentPOT(e.target.value)} /> No

                </div>
              </div>}

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-12 pt-3">
                <label htmlFor="specifications" className="form-label">
                  Specifications <i>(these categories and their values are displayed on product description page on SIDEBAR)</i> <span className="price-title-point">*</span>
                  <br /> {"---> "} click + category to ADD previous category! {" <---"}
                </label>
                {[...specifications, {}].map((item, i) => (
                  <div className="row py-1" key={"sp" + item?.category} style={item?.category?.length > 1 ? { backgroundColor: "seagreen" } : null}>
                    <div className="col-5 col-xl-5">
                      <input
                        type="text"
                        id="specifications-cat"
                        className="form-control"
                        defaultValue={item?.category || ""}
                        onChange={(e) => handleOnChangeCategory(e, i)}
                        placeholder="category"
                      /></div>
                    <div className="col-5 col-xl-5">
                      <input
                        type="text"
                        id="specifications-cat-value"
                        className="form-control"
                        defaultValue={item?.value || ""}
                        onChange={(e) => handleOnChangeCategoryValue(e, i)}
                        placeholder="category value"
                      /></div>
                    <div className="col-2 col-xl-2 px-3 cancel-admin-button py-3"><button onClick={(r) => handleRemoveCategories(r, item, i)}><FaCircleXmark /></button></div>
                  </div>))}
                <div className="mt-2 px-4 py-2 cancel-admin-button text-center"><button onClick={(a) => handleAddCategories(a)}><FaCirclePlus /> Category</button></div>
              </div>

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-12 pt-3">
                <label htmlFor="packageType" className="form-label">
                  Product Tags <span className="price-title-point">*</span>
                </label>
                <div style={{ width: "100%" }}>
                  <Select
                    isMulti
                    options={productTagOptions}
                    value={selectedTag}
                    onChange={handleTagsChange}
                    placeholder="Select tags..."
                    isSearchable
                  />
                </div>
              </div>

              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-6 pt-3">
                <label htmlFor="currencyRef" className="form-label">
                  Currency <span className="price-title-point">*</span>
                </label>
                <div className="">
                  <select
                    id="currencyRef"
                    className="form-select"
                    value={packageCurrency}
                    onChange={(e) => setPackageCurrency(e.target.value)}
                  >
                    <option value="">Select Package Currency</option>
                    <option value="$">$</option>
                    <option value="€">€</option>
                    <option value="¥">¥</option>
                    <option value="£">£</option>
                    <option value="Fr">Fr</option>
                    <option value="₹">₹</option>
                    <option value="Mex$">Mex$</option>
                    <option value="R$">R$</option>
                    <option value="R">R</option>
                    <option value="S$">S$</option>
                    <option value="HK$">HK$</option>
                    <option value="NZ$">NZ$</option>
                    <option value="₩">₩</option>
                    <option value="kr">kr</option>
                    <option value="د.إ">د.إ</option>
                    <option value="ر.س">ر.س</option>
                    <option value="Rp">Rp</option>
                  </select>
                </div>
              </div>
              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-6 pt-3">
                <label htmlFor="priceRef" className="form-label">
                  Price <span className="price-title-point">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  ref={priceRef}
                  defaultValue={editProductData?.price || ""}
                />
              </div>
              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-6 pt-3">
                <label htmlFor="priceINRRef" className="form-label">
                  Price in INR<span className="price-title-point">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  ref={priceINRRef}
                  defaultValue={editProductData?.priceINR || ""}
                />
              </div>
              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-6 pt-3">
                <label htmlFor="discountRef" className="form-label">
                  Discount % {" "}
                  <span className="price-title-point">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  ref={discountRef}
                  defaultValue={editProductData?.off || ""}
                />
              </div>
              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-6 pt-3">
                <label htmlFor="quantityRef" className="form-label">
                  Quantity (in stock items){" "}
                  <span className="price-title-point">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  ref={quantityRef}
                  defaultValue={editProductData?.quantity || ""}
                />
              </div>





              <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-6 pt-3">
                <label htmlFor="thumbnail-upload" className="form-label">
                  Thumbnail (Max: 1 image; Max width: 600px; Max size: 1MB){" "}
                  <span className="price-title-point">*</span>
                </label>
                <img
                  src={
                    thumbnail
                      ? URL.createObjectURL(thumbnail)
                      : editProductData?.thumbnail
                        ? `${BASE_URL}${editProductData?.thumbnail}`
                        : null
                  }
                  width="350px"
                  alt="Thumbnail Placeholder"
                />
                <div className="pt-2 text-center">
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail-upload"
                    onChange={handleThumbnailChange}
                  />
                  <label htmlFor="thumbnail-upload" className="custom-label">
                    Upload Thumbnail <FiUpload />
                  </label>
                </div>
              </div>
              {
                productImagesCount <= 10 && [...Array.from(Array(productImagesCount).keys())].map((x, i) =>
                  <div className="admin-price-list col-sm-12 col-md-12 col-lg-12  col-xl-6 pt-3" key={"pi-upload-" + i}>
                    <input
                      type="text"
                      id="specifications-cat-value"
                      className="form-control"
                      defaultValue={productImagesDetail?.[i] || editProductData?.productImages?.[i]?.details}
                      onChange={(e) => handleOnChangePIDetail(e, i)}
                      placeholder={i + 1 + ". Image Detail - Will appear on slider (Optional)"} />
                    <PIUploadRenderer
                      key={i}
                      src={productImagesUpdated.updated && productImagesUpdated?.i?.includes(i) ?
                        URL.createObjectURL(productImages?.[productImagesUpdated.i.indexOf(i)]?.path) :
                        editProductData && editProductData._id && i < editProductData?.productImages?.length ?
                          `${BASE_URL}${editProductData?.productImages?.[i]?.path}` :
                          productImages?.length > 0 && i < productImages?.length
                            ? URL.createObjectURL(productImages[i]?.path)
                            : null}
                      index={i}
                    />
                  </div>
                )
              }
            </div>

            <div className="col-md-12 pt-2 mb-5">
              <button
                className="admin-plan-button mt-5 pt-3 pb-3"
                onClick={(e) => {
                  if (editProductData && editProductData._id) {
                    handleSubmitUpdateProduct(e, editProductData._id);
                  } else {
                    handleSubmitCreateProduct(e);
                  }
                }}
              ><FaProductHunt />
                {editProductData && editProductData._id
                  ? " Update Product"
                  : " Create Product "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewProductForm;