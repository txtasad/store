// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllTemplateUserReq } from "../../../API/Api";
const HomeCardPage = () => {
  const [search, setSearch] = useState("");
  const [showAllCards, setShowAllCards] = useState(false);
  useEffect(() => {
    getAllTemplateUserReq();
  }, []);
  const commonTemplate = useSelector(
    (state) => state.templateTable.commonTemplate
  );
  const articleTemplate = useSelector(
    (state) => state.templateTable.articleTemplate
  );
  const socialMediaTemplate = useSelector(
    (state) => state.templateTable.socialMediaTemplate
  );
  const economicsTemplate = useSelector(
    (state) => state.templateTable.economicsTemplate
  );
  const emailTemplate = useSelector(
    (state) => state.templateTable.emailTemplate
  );
  const websiteTemplate = useSelector(
    (state) => state.templateTable.websiteTemplate
  );
  const blogPostTemplate = useSelector(
    (state) => state.templateTable.blogPostTemplate
  );
  const marketingTemplate = useSelector(
    (state) => state.templateTable.marketingTemplate
  );

  const filterItems = (items) =>
    items.filter((item) => item.title.toLowerCase().includes(search));

  const renderItems = (items, onClickHandler) =>
    items.length > 0 && (
      <div className="row">
        {items.slice(0, showAllCards ? items.length : 12).map((item, i) => (
          <div
            key={item._id}
            className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-4"
            onClick={() => onClickHandler(item, i)}
          >
            <div className="custom-cart">
              <CardTemplateHome
                id={item._id}
                title={item.templateName}
                photo={
                  <span
                    dangerouslySetInnerHTML={{ __html: item.templateIcon }}
                  />
                }
                desc={item.title}
                packageType={item.packageType}
                favorite={item.favorite}
                brandIcon={
                  <span dangerouslySetInnerHTML={{ __html: item.brandIcon }} />
                }
              />
            </div>
          </div>
        ))}
      </div>
    );

  const filterArticleTemplate = filterItems(articleTemplate);
  const filterCommonTemplate = filterItems(commonTemplate);
  const filterBlogPostTemplate = filterItems(blogPostTemplate);
  const filterEconomicsTemplate = filterItems(economicsTemplate);
  const filteredWebsiteTemplate = filterItems(websiteTemplate);
  const filterEmailTemplate = filterItems(emailTemplate);
  const filterSocialMediaTemplate = filterItems(socialMediaTemplate);
  const filterMarketingTemplate = filterItems(marketingTemplate);

  const totalFilteredLength =
    filterArticleTemplate.length +
    filterCommonTemplate.length +
    filterBlogPostTemplate.length +
    filterEconomicsTemplate.length +
    filteredWebsiteTemplate.length +
    filterEmailTemplate.length +
    filterSocialMediaTemplate.length +
    filterMarketingTemplate.length;

  const handleSocialDefault = (item) => {
    console.log("Item clicked:", item);
  };
  return (
    <>
      <div className="scrollable-container-template">
        <Tabs
          defaultActiveKey="All Template"
          id="justify-tab-example"
          className=""
        >
          <Tab eventKey="All Template" title="All Template">
            {renderItems(
              [
                ...filterArticleTemplate,
                ...filterCommonTemplate,
                ...filterBlogPostTemplate,
                ...filterEconomicsTemplate,
                ...filteredWebsiteTemplate,
                ...filterEmailTemplate,
                ...filterSocialMediaTemplate,
                ...filterMarketingTemplate,
              ],
              (item, i) =>
                handleSocialDefault(
                  [
                    ...articleTemplate,
                    ...commonTemplate,
                    ...blogPostTemplate,
                    ...economicsTemplate,
                    ...websiteTemplate,
                    ...emailTemplate,
                    ...socialMediaTemplate,
                    ...marketingTemplate,
                  ],
                  i
                )
            )}

            {totalFilteredLength > 12 && (
              <div className="card-show-hide-button">
                <button onClick={() => setShowAllCards(!showAllCards)}>
                  {showAllCards ? "Show Less" : "See More"}
                </button>
              </div>
            )}
          </Tab>
          <Tab eventKey="article" title="Article & Content">
            {renderItems(filterArticleTemplate, (item, i) =>
              handleSocialDefault(articleTemplate, i)
            )}
            {filterArticleTemplate.length === 0 && (
              <p>No matching items found</p>
            )}
          </Tab>
          <Tab eventKey="marketing" title="Marketing">
            {renderItems(filterMarketingTemplate, (item, i) =>
              handleSocialDefault(marketingTemplate, i)
            )}
            {filterMarketingTemplate.length === 0 && (
              <p>No matching items found</p>
            )}
          </Tab>
          <Tab eventKey="website" title="Website">
            {renderItems(filteredWebsiteTemplate, (item, i) =>
              handleSocialDefault(websiteTemplate, i)
            )}
            {filteredWebsiteTemplate.length === 0 && (
              <p>No matching items found</p>
            )}
          </Tab>
          <Tab eventKey="ecommerce" title="Ecommerce">
            {renderItems(filterEconomicsTemplate, (item, i) =>
              handleSocialDefault(economicsTemplate, i)
            )}
            {filterEconomicsTemplate.length === 0 && (
              <p>No matching items found</p>
            )}
          </Tab>
          <Tab eventKey="social" title="Social Media">
            {renderItems(filterSocialMediaTemplate, (item, i) =>
              handleSocialDefault(socialMediaTemplate, i)
            )}
            {filterSocialMediaTemplate.length === 0 && (
              <p>No matching items found</p>
            )}
          </Tab>
          <Tab eventKey="email" title="Email">
            {renderItems(filterEmailTemplate, (item, i) =>
              handleSocialDefault(emailTemplate, i)
            )}
            {filterEmailTemplate.length === 0 && <p>No matching items found</p>}
          </Tab>
          <Tab eventKey="blog" title="Blog Posts">
            {renderItems(filterBlogPostTemplate, (item, i) =>
              handleSocialDefault(blogPostTemplate, i)
            )}
            {filterBlogPostTemplate.length === 0 && (
              <p>No matching items found</p>
            )}
          </Tab>
          <Tab eventKey="common" title="Common Writing">
            {renderItems(filterCommonTemplate, (item, i) =>
              handleSocialDefault(commonTemplate, i)
            )}
            {filterCommonTemplate.length === 0 && (
              <p>No matching items found</p>
            )}
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default HomeCardPage;
