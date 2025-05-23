import React from "react";
import { archive, IArchiveItem } from "@/lists/HomeContainer/archive";
import ArchiveItem from "./ArchiveItem";

function Archive() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-4 sm:justify-center sm:place-items-center sm:items-center">
      {archive.map((item: IArchiveItem) => (
        <ArchiveItem key={item.name} item={item} />
      ))}
    </div>
  );
}

export default Archive;
