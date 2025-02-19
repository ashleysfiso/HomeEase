import React from "react";

export default function TableSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md">
      <table className="w-full border-collapse">
        <tbody>
          {[...Array(5)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b border-gray-200">
              {[...Array(4)].map((_, colIndex) => (
                <td key={colIndex} className="px-6 py-4">
                  <div className="h-4 w-full animate-pulse bg-gray-300 rounded"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
