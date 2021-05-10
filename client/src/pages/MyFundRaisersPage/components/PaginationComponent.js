import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Redirect } from "react-router";
import { calculateFundraisingProgress } from "../../../util/util";
import EditFundCardView from "../components/EditFundCardView";
import kebabCase from "kebab-case";
import { useHistory } from "react-router-dom";

const PaginationComponent = ({ fundraisers }) => {
  //storing each item
  const [pageNumber, setPageNumber] = useState(0);
  const history = useHistory();

  function onCardClick(event) {
    event.preventDefault();
    const fundraiserId = event.currentTarget.id;
    console.log(fundraiserId);
    if (
      event.target.className === "btn edit-btn" ||
      event.target.className === "pencil large icon"
    ) {
      history.push({
        pathname: `/fundraisers/edit-post/${fundraiserId}`,
        state: {id: fundraiserId, status: 2},
      });
    } else {
      console.log("card clicked");
      history.push({
        pathname: `/fundraisers/view/${fundraiserId}`,
      });
    }
  }

  const fundCardPerPage = 12;
  const pagesVisited = pageNumber * fundCardPerPage;
  const pageCount = Math.ceil(fundraisers.length / fundCardPerPage);
  const displayFundCardItem = fundraisers
    .slice(pagesVisited, pagesVisited + fundCardPerPage)
    .map((fundCard) => {
      return (
        <div
          className="col-lg-3 col-md-4 col-6"
          onClick={onCardClick}
          id={fundCard._id}
        >
          <EditFundCardView
            imgURL={fundCard.coverPhoto}
            title={fundCard.title}
            desc={fundCard.story.substring(0, 40) + ".."}
            currentProgress={calculateFundraisingProgress(
              fundCard.fundraisedTotal,
              fundCard.fundraisingGoal
            )}
            currentAmountRaised={fundCard.fundraisedTotal}
            goal={fundCard.fundraisingGoal}
            raw={fundCard}
          />
        </div>
      );
    });

  /**
   * The method to call when a page is clicked.
   * Exposes the current page object as an argument.
   * */
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row row-flex">{displayFundCardItem}</div>
      </div>
      <ReactPaginate
        previousLabel={"<"}
        nextLabel={">"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"ui pagination pointing secondary menu"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
        marginPagesDisplayed={0}
        // pageRangeDisplayed={3}
      />
    </div>
  );
};

export default PaginationComponent;
