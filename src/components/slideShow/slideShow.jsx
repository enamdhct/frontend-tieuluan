
export default function SlideShow() {
    return (
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src='https://firebasestorage.googleapis.com/v0/b/pc-shop-9d595.appspot.com/o/images%2Fz5756374332580_494fb373acc691042aa11a9a26d464f3.jpg?alt=media&token=4d640d2e-c3fa-40c8-85cf-7ecc0306fbdc'style={{width: '2222px', height: 'auto'}}></img>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="https://firebasestorage.googleapis.com/v0/b/pc-shop-9d595.appspot.com/o/images%2Fz5756377217837_fefef80f9b08ff7e09b0350058a6fb67.jpg?alt=media&token=652cdae5-cc91-42e7-808e-43bc7ba9d1bf" alt="" style={{width: '2222px', height: 'auto'}}/>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="https://firebasestorage.googleapis.com/v0/b/pc-shop-9d595.appspot.com/o/images%2F04_07-995e1c5901e8cdd9a00a3ca215510860.jpg?alt=media&token=69a315a3-d9df-4896-8f2d-939e844f10b6" alt="" style={{width: '2222px', height: 'auto'}}/>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src="https://firebasestorage.googleapis.com/v0/b/pc-shop-9d595.appspot.com/o/images%2FTNC_BACK_TO_SCHOOL_CORSAIR1.jpg?alt=media&token=50faa931-a914-4508-9cd5-a01e81de7014" alt="" style={{width: '2222px', height: 'auto'}}/>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    );
  };