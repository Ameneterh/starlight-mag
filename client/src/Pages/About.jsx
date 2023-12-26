import React, { useEffect, useState } from "react";
import AuthorCard from "../Components/AuthorCard";

export default function About() {
  const [authors, setAuthors] = useState(null);
  console.log(authors);

  useEffect(() => {
    const fetchAuthors = async () => {
      return await fetch("/api/user/users")
        .then((res) => res.json())
        .then((data) => setAuthors(data));
    };
    fetchAuthors();
  }, []);

  return (
    <div className="mx-auto py-4 md:py-20 px-4 max-w-5xl">
      <p className="text-slate-700 w-full text-center">About</p>
      <h1 className="flex flex-col items-center w-full mb-4 border-b border-black pb-4">
        <img
          src="./apple-touch-icon.png"
          alt="starlight magazine image"
          className="w-[250px] "
        />
        <p className="uppercase text-3xl -tracking-[-10px]">magazine</p>
        <span className="text-red-500 mt-3">
          shining the light, enriching the soul
        </span>
      </h1>
      <div className="text-justify border-b-2 border-b-black pb-10">
        <p className="mb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
          libero, consectetur fuga beatae vitae officia suscipit ratione
          explicabo iste minima obcaecati cum laborum cumque laudantium deleniti
          animi debitis blanditiis doloremque? Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Dolores tempora consequuntur quaerat
          iure debitis architecto eius corrupti cumque aspernatur ex esse quos
          voluptatum, modi molestias voluptate quas eveniet? Vero, nulla? Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Esse impedit
          quaerat consequatur quisquam praesentium, quam temporibus eaque
          laudantium libero consectetur rerum deserunt vero odit ratione quas,
          excepturi autem! Doloribus, aspernatur!
        </p>
        <p className="mb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
          libero, consectetur fuga beatae vitae officia suscipit ratione
          explicabo iste minima obcaecati cum laborum cumque laudantium deleniti
          animi debitis blanditiis doloremque?
        </p>
        <p className="mb-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
          libero, consectetur fuga beatae vitae officia suscipit ratione
          explicabo iste minima obcaecati cum laborum cumque laudantium deleniti
          animi debitis blanditiis doloremque? Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Ipsam cupiditate sint perferendis eos,
          cumque impedit non libero, sit accusantium veritatis natus mollitia
          ab, maiores cum quos totam nisi placeat aspernatur. Lorem ipsum, dolor
          sit amet consectetur adipisicing elit. Eaque deleniti facilis at
          atque, voluptas quae quia. Facilis, quasi architecto. Provident,
          numquam! Eius odio molestias magnam dignissimos sint, voluptatibus
          dicta assumenda.
        </p>

        <h1 className="text-2xl text-slate-800 font-bold mt-10">Mission</h1>
        <p className="mb-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          numquam velit quia quo ut ducimus distinctio magni tempore. Dolores
          beatae quo, laudantium eos reprehenderit sed alias iusto perspiciatis?
          Fuga, culpa!
        </p>
        <h1 className="text-2xl text-slate-800 font-bold mt-10">Vision</h1>
        <p className="mb-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          numquam velit quia quo ut ducimus distinctio magni tempore. Dolores
          beatae quo, laudantium eos reprehenderit sed alias iusto perspiciatis?
          Fuga, culpa!
        </p>
      </div>
      <div className="w-full">
        <h1 className="text-2xl text-slate-800 font-bold my-10">
          Meet Our Authors
        </h1>
        <div className="w-full flex flex-wrap gap-10">
          {authors &&
            authors.length > 0 &&
            authors.map((author) => (
              <AuthorCard key={author._id} authorList={author} />
            ))}
        </div>
      </div>
    </div>
  );
}
