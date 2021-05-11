import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import FundCardView from "../../components/FundCardView";
import { calculateFundraisingProgress } from "../../util/util";
import { useHistory } from "react-router-dom";

const PaginationComponent = ({ fundCardItems }) => {
  const history = useHistory();
  const [pageNumber, setPageNumber] = useState(0);

  //items shown per page
  const fundCardPerPage = 12;

  function onCardClick(event) {
    event.preventDefault();
    console.log("card clicked");
    const fundraiserId = event.currentTarget.id;
    history.push({
      pathname: `/fundraisers/view/${fundraiserId}`,
    });
  }

  const pagesVisited = pageNumber * fundCardPerPage;
  const pageCount = Math.ceil(fundCardItems.length / fundCardPerPage);
  const displayFundCardItem = fundCardItems
    .slice(pagesVisited, pagesVisited + fundCardPerPage)
    .map((fundCard) => {
      return (
        <div
          onClick={onCardClick}
          className="col-lg-3 col-md-4 col-6"
          id={fundCard._id}
        >
          <FundCardView
            imgURL={fundCard.coverPhoto}
            title={fundCard.title}
            desc={fundCard.story.substring(0, 70) + "..."}
            currentProgress={calculateFundraisingProgress(
              fundCard.fundraisedTotal,
              fundCard.fundraisingGoal
            )}
            currentAmountRaised={fundCard.fundraisedTotal}
            goal={fundCard.fundraisingGoal}
            eventListener={onCardClick}
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
