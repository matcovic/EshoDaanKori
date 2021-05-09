import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { Redirect } from "react-router";
import { calculateFundraisingProgress, getCard } from "../../../util/util";
import EditFundCardView from "../components/EditFundCardView";
import kebabCase from "kebab-case";

const PaginationComponent = ({ fundraisers }) => {
  //storing each item
  const [pageNumber, setPageNumber] = useState(0);
  const [cardClicked, setCardClick] = useState({
    card: undefined,
    redirect: false,
  });

  function onCardClick(event) {
    event.preventDefault();
    console.log("card clicked");
    const fundraiserId = event.currentTarget.id;
    const card = getCard(fundraiserId, fundraisers);
    setCardClick({ card: card, redirect: true });
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
            title={kebabCase(fundCard.title)}
            desc={fundCard.story.substring(0, 40) + ".."}
            currentProgress={calculateFundraisingProgress(
              fundCard.fundraisedTotal,
              fundCard.fundraisingGoal
            )}
            currentAmountRaised={fundCard.fundraisedTotal}
            goal={fundCard.fundraisingGoal}
            raw = {fundCard}
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

  if (cardClicked.redirect) {
    console.log(cardClicked.card);
    return (
      <Redirect
        to={{
          pathname: `/fundraisers/view?/${kebabCase(cardClicked.card.title)}`,
          state: { content: cardClicked.card },
        }}
      />
    );
  }

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
