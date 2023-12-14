import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListedArticle from "../Components/ListedArticle";

export default function SearchArticles() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    authorName: "",
    sort: "created_at",
    order: "desc",
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  console.log(listings);

  const fetchUsers = () => {
    return fetch("/api/user/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const authorNameFromUrl = urlParams.get("authorName");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || authorNameFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        authorName: authorNameFromUrl || "",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setShowMore(false);
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (e.target.id === "authorName") {
      setSidebardata({ ...sidebardata, authorName: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";

      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();

    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className=" flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search ..."
              className="border rounded-lg p-3 w-full focus:outline-none focus:border-red-500"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Search by Author:</label>
            <select
              onChange={handleChange}
              defaultValue={"all"}
              id="authorName"
              className="border rounded-lg p-3"
            >
              {user &&
                user.length > 0 &&
                user.map((userObj, index) => (
                  <option key={index} value={userObj.authorName}>
                    {userObj.authorName}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort by:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="authorName_asc">Author [A - Z]</option>
              <option value="authorName_desc">Author [Z - A]</option>
              <option value="createdAt_desc">Newest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold border-b p-3 text-slate-700 mt-5">
          Articles Search Results:
        </h1>
        <div className="p-7 flex flex-wrap gap-8">
          {/* {!loading && listings.length === 0 && (
            <p className="text-xl text-slate-700">No Listing Found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading ...
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => <ListedArticle listing={listing} />)}
          {showMore && (
            <button
              className="text-green-700 hover:underline -7 w-full text-center"
              onClick={() => {
                onShowMoreClick();
              }}
            >
              Show More
            </button>
          )} */}
          <ListedArticle />
        </div>
      </div>
    </div>
  );
}
