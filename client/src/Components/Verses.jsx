import React, { useEffect, useState } from "react";

var myverses = [
  {
    citation:
      "Your words were found and I ate them, and Your words became a joy to me and the delight of my heart; for I have been called by Your name, O LORD God of hosts.",
    verse: "Jeremiah 15:16",
    translation: "Amplified",
  },
  {
    citation:
      "For the word of God is alive and powerful. It is sharper than the sharpet two-edged sword, cutting betweeen soul and spirit, between joint and marrow. It exposes our innermost thoughts and desires.",
    verse: "Hebrews 4:12",
    translation: "New Living Translation",
  },
  {
    citation:
      "By your words I can see where I'm going; they throw a beam of light on my dark path.",
    verse: "Psalms 119:105",
    translation: "The Message",
  },
  {
    citation:
      "How can young people keep their lives pure? By obeying your commands.",
    verse: "Psalms 119:9",
    translation: "Good News Bible",
  },
  {
    citation:
      "The grass withers and the flowers fade, but the word of our God stands forever.",
    verse: "Isaiah 40:8",
    translation: "New Living Translation",
  },
  {
    citation:
      "So everyone who hears these words of Mine and acts on them, will be like a wise man [a far-sighted, practical, and sensible man] who builds his house on the rock.",
    verse: "Matthew 7:24",
    translation: "Amplified",
  },
];

const getRandomObject = (array) => {
  const randomObject = array[Math.floor(Math.random() * array.length)];
  return randomObject;
};

export default function Verses() {
  const [randomData, setRandomData] = useState(() => getRandomObject(myverses));

  return (
    <blockquote>
      <h2 className="w-full justify-center mb-2 flex gap-1 text-[20px] font-semibold">
        {randomData.verse}
        <span className="text-sm text-slate-700">{randomData.translation}</span>
      </h2>
      <p className="text-[22px] text-slate-800 text-center">
        {randomData.citation}
      </p>
      {/* {randomData.citation} */}
      {/* <span>{randomData.verse}</span> */}
    </blockquote>
  );
}

{
  /* <h2 className="text-[20px] font-semibold">
            Matthew 7:24{" "}
            <span className="text-sm text-slate-700">Amplified</span>
          </h2>
          <p className="text-[24px] text-slate-800 text-center">
            So everyone who hears these words of Mine and acts on them, will be
            like a wise man [a far-sighted, practical, and sensible man] who
            builds his house on the rock.
          </p> */
}
