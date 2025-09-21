import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  socialMediaCreateReq,
  deleteSocialMediaReq,
  readSocialMediaAdminReq,
  onOffSocialMediaReq,
  updateAssistantPositionInDB,
  socialMediaUpdateReq,
} from "../../API/Api";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { DeleteAlert } from "../../helper/PopupAlert";
import { AiFillEye } from "react-icons/ai";
import { HiEyeOff } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDragIndicator } from "react-icons/md";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Accordion } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { rootUser } from "../../constant/Form";

const SocialMediaSetting = () => {
  const navigate=useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if(getUser?.[0]?.auth!="admin" || getUser?.[0]?.email!=rootUser  || getUser?.[0]?.email != editUser)
  {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const socialMediaLinkRef = useRef();
  const socialMediaIconRef = useRef();
  const [loading, setLoading] = useState(false);
  const [mediaLink, setMediaLink] = useState(null);
  const [mediaIcon, setMediaIcon] = useState();
  const [ide, setIde] = useState();
  const [searchKeyword, setSearchKeyword] = useState("0");
  const [perPage, setPerPage] = useState(5);

  const allAssistant = useSelector(
    (state) => state.assistantStore.assistantTableAdmin
  );

  const handleEditClick = (id) => {
    const findMedia = allAssistant.find((item) => item._id === id);
    if (findMedia) {
      setMediaLink(findMedia.mediaLink);
      setMediaIcon(findMedia.mediaIcon);
      setIde(findMedia._id);
    } else {
      console.log(`Assistant with id ${id} not found.`);
    }
  };

  useEffect(() => {
    readSocialMediaAdminReq(1, perPage, searchKeyword);
  }, [perPage, searchKeyword]);

  useEffect(() => {
    readSocialMediaAdminReq(1, perPage, searchKeyword);
  }, []);
  const total = useSelector((state) => state.assistantStore.assistantTotal);

  const handlePageClick = async (event) => {
    await readSocialMediaAdminReq(event.selected + 1, perPage, searchKeyword);
  };

  const searchData = async () => {
    await readSocialMediaAdminReq(1, perPage, searchKeyword);
  };

  const PageKeyOnChange = async (e) => {
    const perPage = parseInt(e.target.value);
    setPerPage(perPage);
    await readSocialMediaAdminReq(1, perPage, searchKeyword);
  };

  const searchOnChange = async (e) => {
    setSearchKeyword(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKeyword("0");
      await readSocialMediaAdminReq(1, perPage, "i");
    }
  };
  useEffect(() => {
    readSocialMediaAdminReq(1, perPage, searchKeyword);
  }, []);

  const deleteItem = async (id) => {
    const Result = await DeleteAlert();
    if (Result.isConfirmed) {
      const DeleteResult = await deleteSocialMediaReq(id);
      if (DeleteResult) {
        await readSocialMediaAdminReq(1, perPage, searchKeyword);
      }
    }
  };

  const handleUpdateMedia = (id) => {
    const updatedMediaLink = socialMediaLinkRef.current.value;
    const updatedMediaIcon = socialMediaIconRef.current.value;
    if (!updatedMediaLink) {
      toast.error("Social Media Link is required");
      return;
    }
    if (!updatedMediaIcon) {
      toast.error("Social Media Icon is required");
      return;
    }

    setLoading(true);
    const updatedMediaInfo = { updatedMediaLink, updatedMediaIcon, id };

    socialMediaUpdateReq(updatedMediaInfo)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Media Updated Successfully");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
    setTimeout(() => {
      setLoading(false);
      toast.success("Media Updated Successfully");
    }, 1500);
  };

  const handleGenerateClick = () => {
    const newMediaLink = socialMediaLinkRef.current.value;
    const newMediaIcon = socialMediaIconRef.current.value;

    if (!newMediaLink) {
      toast.error("Social Media Link is required");
      return;
    }
    if (!newMediaIcon) {
      toast.error("Social Media Icon is required");
      return;
    }
    setLoading(true);
    const newMediaInfo = { newMediaLink, newMediaIcon };

    socialMediaCreateReq(newMediaInfo)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Media Created Successfully");
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });

    setTimeout(() => {
      setLoading(false);
      toast.success("Media Created Successfully");
    }, 1500);
  };

  const handleToggleClick = async (id, bullionData) => {
    try {
      const res = await onOffSocialMediaReq({ id, bullionData });
      if (res && res.status === 200) {
        await readSocialMediaAdminReq(1, perPage, searchKeyword);
        toast.success("Updated successfully");
      } else {
        await readSocialMediaAdminReq(1, perPage, searchKeyword);
        toast.success("Update successfully");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;
    const draggedItemId = allAssistant[source.index]._id;
    const newPosition = destination.index;
    try {
      await updateAssistantPositionInDB(draggedItemId, newPosition);
      await readSocialMediaAdminReq(1, perPage, searchKeyword);
      toast.success("Assistant reordered successfully");
    } catch (error) {
      console.error("Error updating assistant position:", error);
      toast.error("Failed to reorder assistant");
    }
  };

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>AI Default Chat Assistant</h2>
        <p style={{color:"red"}}>
        This section isn't activated yet. Please don't create any Listing yet! 
        </p>
      </div>
      <div className="row  justify-content-md-center">
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 text-to-content-input">
          <div className="mt-2">
            <Accordion>
              <Accordion.Item eventKey="0" className="mb-4">
                <Accordion.Header>Add Social Media</Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-12 col-sm-6 col-md-6 col-lg-12 col-xl-12 social-media-setting">
                      <label>Social Media Link</label>
                      <input
                        defaultValue={mediaLink}
                        ref={socialMediaLinkRef}
                      />
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-12 col-xl-12 social-media-setting mt-3">
                      <label>Social Media Icon</label>
                      <input
                        defaultValue={mediaIcon}
                        ref={socialMediaIconRef}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  ">
                    <button
                      className="admin-plan-button mt-3 pt-3 pb-3"
                      onClick={() => {
                        if (ide) {
                          handleUpdateMedia(ide);
                        } else {
                          handleGenerateClick();
                        }
                      }}
                      disabled={loading}
                    >
                      {ide ? "Update Media" : "Create Media"}
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      <section className="mt-5 mb-5">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                      <h5>All Created Assistant</h5>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-2">
                      <select
                        onChange={PageKeyOnChange}
                        className="form-control form-select-sm form-select form-control-sm"
                      >
                        <option value="5">5 Per Page</option>
                        <option value="10">10 Per Page</option>
                        <option value="20">20 Per Page</option>
                        <option value="30">30 Per Page</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
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
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="table-responsive data-table">
                        <table className="table">
                          <thead className="sticky-top ">
                            <tr className="thead-css">
                              <th
                                className="text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                                scope="col"
                              >
                                #
                              </th>
                              <th
                                className="text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 "
                                scope="col"
                              >
                                Social media Icon
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Social media Link
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Date
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Status
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Edit
                              </th>
                              <th className="text-center text-uppercase text-secondary text-xxl font-weight-bolder opacity-7 ">
                                Action
                              </th>
                            </tr>
                          </thead>

                          <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                              droppableId={allAssistant.map((item) => item._id)}
                              type="assistant"
                            >
                              {(provided) => (
                                <tbody
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                >
                                  {[...allAssistant]
                                    .sort(
                                      (a, b) =>
                                        parseInt(a.position) -
                                        parseInt(b.position)
                                    )
                                    .map((item, index) => (
                                      <Draggable
                                        key={item._id}
                                        draggableId={item._id}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <tr
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <td className="pt-4 table-drag-icon">
                                              <MdOutlineDragIndicator />
                                            </td>
                                            <td>
                                              <p className=" text-xs font-weight-bold pt-2 table-icon">
                                                <span
                                                  dangerouslySetInnerHTML={{
                                                    __html: item.mediaIcon,
                                                  }}
                                                />
                                              </p>
                                            </td>

                                            <td>
                                              <p className="text-center text-xs font-weight-bold pt-4">
                                                {item.mediaLink}
                                              </p>
                                            </td>

                                            <td>
                                              <p className="text-center text-xs font-weight-bold pt-4">
                                                {new Date(
                                                  item.createDate
                                                ).toLocaleDateString("en-US", {
                                                  year: "2-digit",
                                                  month: "2-digit",
                                                  day: "2-digit",
                                                })}
                                              </p>
                                            </td>
                                            <td className="text-center pt-4 on-off-button">
                                              {item.active === "true" ? (
                                                <AiFillEye
                                                  className="open-button"
                                                  onClick={() =>
                                                    handleToggleClick(
                                                      item._id,
                                                      "false"
                                                    )
                                                  }
                                                />
                                              ) : (
                                                <HiEyeOff
                                                  className="off-button"
                                                  onClick={() =>
                                                    handleToggleClick(
                                                      item._id,
                                                      "true"
                                                    )
                                                  }
                                                />
                                              )}
                                            </td>
                                            <td className="text-center pt-3 ">
                                              <button
                                                onClick={() =>
                                                  handleEditClick(item._id)
                                                }
                                                className="btn btn-outline-dark text-danger mb-0 ms-2"
                                              >
                                                <TbEdit />
                                              </button>
                                            </td>
                                            <td className="text-center pt-3 ">
                                              <button
                                                onClick={deleteItem.bind(
                                                  this,
                                                  item._id
                                                )}
                                                className="btn btn-outline-dark text-danger mb-0  ms-2"
                                              >
                                                <AiOutlineDelete />
                                              </button>
                                            </td>
                                          </tr>
                                        )}
                                      </Draggable>
                                    ))}
                                  {provided.placeholder}
                                </tbody>
                              )}
                            </Droppable>
                          </DragDropContext>
                        </table>
                      </div>
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
                        pageCount={total / perPage}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialMediaSetting;
