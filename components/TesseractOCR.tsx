"use client";
import { useState, FC } from "react";
import Tesseract from "tesseract.js";

const TesseractOCR: FC = () => {
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("eng");

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setLoading(true);
      const result = await Tesseract.recognize(file, language, {
        logger: (m) => console.log(m),
      });
      setText(result.data.text);
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-4 flex-col">
      <div>
        <label>
          <span>Pick language: </span>
          <select
            className="ml-2 px-3 py-1 bg-gray-700 text-gray-50 cursor-pointer border-1 rounded-lg border-2  bg-transparent"
            name="lang"
            defaultValue={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="hrv">HRV</option>
            <option value="eng">ENG</option>
          </select>
        </label>
      </div>
      <div>
        <input
          className="text-sm text-stone-500 file:rounded-lg
          file:mr-5 file:py-2 file:px-3 file:border-[1px]
          file:text-xs file:font-medium
          file:bg-gray-700 file:text-gray-50
          hover:file:cursor-pointer"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>
      <div>
        {loading && <p>Loading...</p>}
        {text && (
          <div>
            <p className="text-wrap font-mono p-10">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TesseractOCR;
