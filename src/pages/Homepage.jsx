import React, { useEffect, useState } from "react";
import { getAllProductsApi, testApi } from "../api/Api";
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setsearchQuery] = useState("");

  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery}`);
  };

  return (
    <div className="container">
      {/* paste here */}
      <div
        id="carouselExampleIndicators"
        class="carousel slide mt-4 rounded"
        data-mdb-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-mdb-target="#carouselExampleIndicators"
            data-mdb-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselExampleIndicators"
            data-mdb-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-mdb-target="#carouselExampleIndicators"
            data-mdb-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="https://ichef.bbci.co.uk/news/976/cpsprodpb/B9FF/production/_117751674_satan-shoes1.jpg"
              class="d-block w-100"
              alt="Wild Landscape"
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://media.gq.com/photos/642c5a5e381d8c5e133aa3c9/16:9/w_2580,c_limit/nikes-art.jpg"
              class="d-block w-100"
              alt="Camera"
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://mdbcdn.b-cdn.net/img/new/slides/043.webp"
              class="d-block w-100"
              alt="Exotic Fruits"
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-mdb-target="#carouselExampleIndicators"
          data-mdb-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-mdb-target="#carouselExampleIndicators"
          data-mdb-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>

      <div className="mt-3">
        <div className="d-flex justify-content-between mb-3">
          <h3>Explore our products</h3>
          <form action="">
            <input
              type="text"
              className="form-control "
              placeholder="Search products"
              onChange={(e) => setsearchQuery(e.target.value)}
            />
            <button type="submit" hidden onClick={handleSearch}>
              Search
            </button>
          </form>
        </div>

        <div class="row row-cols-1 row-cols-md-4 g-4">
          {products.map((product) => {
            return (
              <Link to={`/product/details/${product._id}`} class="col">
                <div class="card">
                  <img
                    src={product.productImage}
                    class="card-img-top object-cover"
                    alt="Hollywood Sign on The Hill"
                    width={"100px"}
                    height={"220px"}
                  />
                  <div class="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 class="card-title text-black">
                        {product.productName}
                      </h5>
                      <h5 class="card-title text-black">
                        NPR.{product.productPrice}
                      </h5>
                    </div>
                    <hr />
                    <p className="text-black">
                      {product.productDescription.slice(0, 50)}
                    </p>
                    <button className="btn w-100 btn-outline-black">
                      View more
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
